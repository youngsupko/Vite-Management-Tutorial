const express = require('express');
// const bodyParser = require('body-parser'); // 이제 필요 없습니다.
const app = express();
const port = process.env.PORT || 5000;

// express 내장 미들웨어 사용 (오타 jason -> json 수정)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/customers', (req, res) => {
    res.send([
        {
        'id': 1,
        'image': 'https://placehold.co/64/64/red',
        'name': '홍길동',
        'birthday': '961222',
        'gender': '남자',
        'job': '대학생'
        },
        {
        'id': 2,
        'image': 'https://placehold.co/64/64/blue',
        'name': '이몽룡', // 예시 이름 수정
        'birthday': '201213',
        'gender': '남자',
        'job': '취준생'
        },
        {
        'id': 3,
        'image': 'https://placehold.co/64/64/black',
        'name': '이정재',
        'birthday': '991230',
        'gender': '남자',
        'job': '배우'
        }
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));