const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// 連線到 MySQL 容器中的 classicmodels 資料庫
const db = mysql.createConnection({
  host: 'host.docker.internal',  // Docker container 內連 host 的方式
  user: 'root',
  password: '1234',
  port:3307,
  database: 'classicmodels'       // ← 要改成你看到的資料庫名稱
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection failed:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// 查詢所有 customers
app.get('/customers', (req, res) => {
  db.query('SELECT * FROM customers limit 2', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});