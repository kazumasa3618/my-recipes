const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3001

//mysqlと接続するための設定
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'N5kBQzp4',
    database: 'recipe_note',
    port: '3306'
});

app.get('/', (req: any,res: { send: (arg0: string) => void; }) => {
    res.send('Hello World');
})

app.get('/api', (req: any, res: { json: (arg0: { message: any; }) => void; }) => {
    // /apiにアクセスした際に、MySQLに対して行う処理
    connection.query(
        //usersテーブルからデータを取得する処理
        'SELECT * FROM users',
        function(err: any, results: { name: any; }[], fields: any){
            if(err){
                console.log('接続エラー');
                throw err;
            }
            res.json({message: results[0].name});
        }
    )
});

app.listen(port, () => {
    console.log(`listening on *:${port}`);
})