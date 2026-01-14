import React, { useState } from 'react';
import axios from 'axios';

const CustomerAdd = ({ stateRefresh }) => {
  /** [상태 관리] 입력 폼의 각 항목에 대한 데이터 상태 정의 */
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [userName, setUserName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [job, setJob] = useState('');

  /** [데이터 전송] 입력받은 데이터를 FormData로 구성하여 서버로 전송 */
  const addCustomer = () => {
    const url = '/api/customers';
    const formData = new FormData();
    
    formData.append('image', file);
    formData.append('name', userName);
    formData.append('birthday', birthday);
    formData.append('gender', gender);
    formData.append('job', job);

    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    };

    return axios.post(url, formData, config);
  };

  /** [이벤트 핸들러] 폼 제출 버튼 클릭 시 실행되는 등록 및 초기화 로직 */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    addCustomer()
      .then((response) => {
        console.log("서버 응답:", response.data);
        stateRefresh(); // 부모 컴포넌트의 목록 새로고침 실행
      })
      .catch((error) => {
        console.error("등록 실패:", error);
      });

    // 등록 후 입력 필드 비우기
    setFile(null);
    setFileName('');
    setUserName('');
    setBirthday('');
    setGender('');
    setJob('');
  };

  /** [화면 구성] 사용자 입력을 받기 위한 고객 추가 폼 UI */
  return (
    <form onSubmit={handleFormSubmit}>
      <h1>고객 추가</h1>
      프로필 이미지: 
      <input 
        type="file" 
        name="file" 
        value={fileName} 
        onChange={(e) => {
          setFile(e.target.files[0]); // 파일 객체 저장
          setFileName(e.target.value); // 파일 경로명 저장
        }} 
      /><br/>
      이름: <input type="text" name="userName" value={userName} onChange={(e) => setUserName(e.target.value)} /><br/>
      생년월일: <input type="text" name="birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} /><br/>
      성별: <input type="text" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} /><br/>
      직업: <input type="text" name="job" value={job} onChange={(e) => setJob(e.target.value)} /><br/>
      <button type="submit">추가하기</button>
    </form>
  );
};

export default CustomerAdd;
