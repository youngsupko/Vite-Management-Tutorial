import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Table, TableHead, TableBody, TableRow, TableCell, 
  Paper, CircularProgress 
} from '@mui/material';

import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import './App.css';

/** [스타일 정의] 레이아웃 및 테이블 시각적 요소 설정 */
const RootContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  minHeight: '100vh',
  paddingBottom: '50px'
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
  /** [상태 관리] 고객 데이터 저장 (초기값 null) */
  const [customers, setCustomers] = useState(null);

  /** [데이터 통신] 백엔드로부터 고객 목록 데이터를 비동기 호출 */
  const callApi = async () => {
    const response = await fetch('/api/customers');
    if (!response.ok) throw new Error('서버 응답 오류');
    const body = await response.json();
    return body;
  };

  /** [화면 갱신] 리스트를 새로고침하고 로딩 상태를 관리 */
  const stateRefresh = () => {
    setCustomers(null); 
    callApi()
      .then(res => {
        // 서버 응답이 배열인지 최종 확인 후 상태 업데이트
        setCustomers(Array.isArray(res) ? res : []);
      })
      .catch(err => {
        console.error("데이터 로드 실패:", err);
        setCustomers([]); // 에러 발생 시 빈 배열로 설정하여 .map 오류 방지
      });
  };

  /** [생명주기] 마운트 시 최초 데이터 호출 */
  useEffect(() => {
    stateRefresh();
  }, []);

  return (
    <RootContainer>
      {/* [데이터 출력 영역] */}
      <StyledPaper>
        <StyledTable>
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
          <TableBody>
            {/* 데이터가 존재하고 배열인 경우에만 출력 (방어적 프로그래밍) */}
            {Array.isArray(customers) ? (
              customers.map(c => (
                <Customer 
                  key={c.id} 
                  id={c.id} 
                  image={c.image} 
                  name={c.name} 
                  birthday={c.birthday} 
                  gender={c.gender} 
                  job={c.job} 
                />
              ))
            ) : (
              <TableRow>
                <ProgressWrapper colSpan="6">
                  <CircularProgress color="primary" />
                </ProgressWrapper>
              </TableRow>
            )}
          </TableBody>
        </StyledTable>
      </StyledPaper>

      {/* [데이터 입력 영역] */}
      <CustomerAdd stateRefresh={stateRefresh} />
    </RootContainer>
  );
}

export default App;
