import Customer from './components/Customer';
import './App.css';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react'; // Hook 임포트

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
  overflowX: "auto",
}));

const StyledTable = styled(Table)({
  minWidth: 1080,
});

function App() {
  // 1. state 선언 (함수형에서는 useState 사용)
  const [customers, setCustomers] = useState(null);

  // 2. API 호출 함수
  const callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  };

  // 3. 생명주기 관리 (componentDidMount 대신 useEffect 사용)
  useEffect(() => {
    callApi()
      .then(res => setCustomers(res))
      .catch(err => console.log(err));
  }, []); // 빈 배열[]은 컴포넌트가 처음 나타날 때만 실행됨을 의미

  return (
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
          {
            // 4. this.state.customers 대신 customers 사용
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
              // 데이터를 불러오는 중일 때 표시할 내용
              <TableRow>
                <TableCell colSpan="6" align="center">데이터를 불러오는 중입니다...</TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </StyledTable>
    </StyledPaper>
  );
}

export default App;
