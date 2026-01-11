import Customer from './components/Customer';
import './App.css';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';

/* 레이아웃 및 컴포넌트 스타일 정의 */
const RootContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '100%',
  minHeight: '100vh',
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '90%',
  maxWidth: '1200px',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  overflowX: "auto",
}));

const StyledTable = styled(Table)({
  minWidth: 1080,
});

const ProgressWrapper = styled(TableCell)({
  textAlign: 'center',
  padding: '50px 0'
});

function App() {
  /* 상태 관리 변수 정의 */
  const [customers, setCustomers] = useState(null);

  /* 서버 API 데이터 호출 함수 */
  const callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  };

  /* 컴포넌트 마운트 시 데이터 로드 실행 */
  useEffect(() => {
    callApi()
      .then(res => setCustomers(res))
      .catch(err => console.log(err));
  }, []);

  return (
    /* 전체 화면 레이아웃 구성 */
    <RootContainer>
      <StyledPaper>
        <StyledTable>
          {/* 테이블 헤더 영역 */}
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          {/* 테이블 바디 및 데이터 로딩 처리 영역 */}
          <TableBody>
            {
              customers ? customers.map(c => (
                <Customer 
                  key={c.id} 
                  id={c.id} 
                  image={c.image} 
                  name={c.name} 
                  birthday={c.birthday} 
                  gender={c.gender} 
                  job={c.job} 
                />
              )) : (
                <TableRow>
                  <ProgressWrapper colSpan="6">
                    <CircularProgress color="primary" />
                  </ProgressWrapper>
                </TableRow>
              )
            }
          </TableBody>
        </StyledTable>
      </StyledPaper>
    </RootContainer>
  );
}

export default App;

