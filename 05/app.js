const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.listen(8000);

app.use(express.static('./'));

let jsonParser = bodyParser.json({limit:'50mb'});
let urlJsonParser = bodyParser.urlencoded({limit:'50mb', extended: false});

//1.连接数据库
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    post: 3306,
    password: '123456',
    database: 'summer_05'
});

//2.查询数据库
db.query("SELECT * FROM `imgs`;", (erro, data) => {
    if (erro) {
        console.log(erro);
    }
    else {
        console.log("数据库连接成功！");
    }
});

//获取首页
app.use("/index", (req, res) => {
    fs.readFile("index.html", "utf-8", function (erro, data) {
        if (erro) {
            console.log(erro);
        } else {
            res.send(data);
            res.end();
        }
    })
});

//插入img信息
app.post("/img", jsonParser, (req, res) => {
    if (req.body.id == 1) {
        let Data = {name: req.body.name, data: req.body.data};
        db.query("insert into imgs set ?", Data, (erro, data) => {
            if (erro) {
                console.log(erro);
            }
            else {
                console.log("插入img地址成功" + req.body.id);
            }
        });
    } else {
        let updata = req.body.data,
            upname = req.body.name;
        db.query("select concat(data, 'updata') from imgs where name = 'upname'", (erro, data) => {
            if (erro) {
                console.log(erro);
            }
            else {
                console.log("插入img地址成功" + req.body.id);
            }
        });
    }
    let num = req.body.id;
    res.send({
        n: num
    });
});