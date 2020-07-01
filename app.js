/*
 * 微型服务器
 */

let express = require('express');
let ejs = require('ejs');
let bodyParser = require('body-parser');
let path = require('path');
let fs = require('fs');
let app = express();
//app.use('/static', express.static(__dirname + '/dist')); // static 虚拟的静态目录
app.use(express.static(__dirname + '/dist'));

const doMode = process.env.NODE_ENV !== 'production' ? 'development' : 'production';
const doDev = process.env.NODE_ENV !== 'production';

const jsonParser = bodyParser.json();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.set('views', __dirname + '/dist'); // 设置模板的目录

//let data = require('./analogdata');

app.get('/', (req, res) => {
    res.render('./index', {
        title: '主页'
    });
});
app.post('/AuthoritativeGeneralHospital',jsonParser,(req, res) => {
    let analogdata = require('./analogdata/index/AuthoritativeGeneralHospital');
    res.send(JSON.stringify(analogdata));
});
app.post('/ChildrensHospital',jsonParser,(req, res) => {
    let analogdata = require('./analogdata/index/ChildrensHospital');
    res.send(JSON.stringify(analogdata));
});
app.post('/CardiovascularHospital',jsonParser,(req, res) => {
    let analogdata = require('./analogdata/index/CardiovascularHospital');
    res.send(JSON.stringify(analogdata));
});
app.post('/CancerHospital',jsonParser,(req, res) => {
    let analogdata = require('./analogdata/index/CancerHospital');
    res.send(JSON.stringify(analogdata));
});
app.post('/Cuttingedgeinformation',jsonParser,(req, res) => {
    let analogdata = require('./analogdata/index/Cuttingedgeinformation');
    res.send(JSON.stringify(analogdata));
});
app.post('/Cuttingedgeinformation2',jsonParser,(req, res) => {
    let analogdata = require('./analogdata/index/Cuttingedgeinformation2');
    res.send(JSON.stringify(analogdata));
});
app.get('/info', (req, res) => {
    res.render('./info', {
        title: '主页'
    });
});
app.post('/Recommendedhospitallymphomatreatment',jsonParser,(req, res) => {
    let analogdata = require('./analogdata/info/Recommendedhospitallymphomatreatment');
    res.send(JSON.stringify(analogdata));
});
app.post('/allCountry',jsonParser,(req, res) => {
    let analogdata = require('./analogdata/info/country');
    res.send(JSON.stringify(analogdata));
});
app.post('/articleInfo',jsonParser,(req, res) => {
    let analogdata = require('./analogdata/info/articleInfo');
    res.send(JSON.stringify(analogdata));
});
app.get('/list', (req, res) => {
    res.render('./list', {
        title: '主页'
    });
});
app.post('/allDepartment',jsonParser,(req, res) => {
    let analogdata = require('./analogdata/info/department');
    res.send(JSON.stringify(analogdata));
});
app.post('/articleList',jsonParser,(req, res) => {
    let analogdata = require('./analogdata/list/articleList');
    res.send(JSON.stringify(analogdata));
});
app.post('/FriendLinks',jsonParser,(req, res) => {
    let analogdata = require('./analogdata/list/friendshiplinks');
    res.send(JSON.stringify(analogdata));
});
app.post('/NewJoinDoctor',jsonParser,(req, res) => {
    let analogdata = require('./analogdata/list/newJoinDoctor');
    res.send(JSON.stringify(analogdata));
});
app.post('/NewJoinHospital',jsonParser,(req, res) => {
    let analogdata = require('./analogdata/list/newJoinHospital');
    res.send(JSON.stringify(analogdata));
});

app.listen(3000); // 监听3000端口