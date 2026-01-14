const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

/** [미들웨어 설정] 데이터 파싱 및 정적 파일 경로 지정 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/image', express.static('./upload'));

/** [데이터베이스 설정] 환경 변수를 이용한 MySQL 연결 */
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect(err => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
    return;
  }
  console.log('MySQL 연결 성공!');
});

/** [파일 업로드 설정] Multer를 이용한 이미지 저장 경로 지정 */
const upload = multer({ dest: './upload' });

/** [API - 조회] 데이터베이스에서 고객 전체 목록 호출 */
app.get('/api/customers', (req, res) => {
  const sql = "SELECT * FROM CUSTOMER"; // 삭제되지 않은 데이터만 조회 권장
  connection.query(sql, (err, rows) => {
    if (err) {
        console.error(err);
      res.status(500).send({ error: '데이터 불러오기 실패' });
    } else {
      res.send(rows);
    }
  });
});

/** [API - 등록] 신규 고객 정보 및 프로필 이미지 저장 */
app.post('/api/customers', upload.single('image'), (req, res) => {
  const sql = 'INSERT INTO CUSTOMER (image, name, birthday, gender, job) VALUES (?, ?, ?, ?, ?)';
  
  // 파일 정보 및 텍스트 데이터 추출
  const image = '/image/' + req.file.filename;
  const { name, birthday, gender, job } = req.body;
  const params = [image, name, birthday, gender, job];

  connection.query(sql, params, (err, rows) => {
    if (err) {
        console.error(err);
      res.status(500).send(err);
    } else {
      res.send(rows);
    }
  });
});

/** [서버 실행] 설정된 포트에서 서버 대기 */
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 활성화되었습니다.`);
});
