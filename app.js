// expressモジュールをロードし、インスタンス化してappに代入。
var express = require("express");
const path = require("path");
var cors = require('cors');
var app = express();

//body-parserモジュールを読み込み初期化する
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
//HTTPリクエストのボディをjsonで扱えるようになる
app.use(bodyParser.json());

/* アプリケーション固有の処理 */

app.use(cors());


// 状態記憶JSONを読み込んで返すAPI
app.get("/test1", function(req, res, next){
  try {

    // json読み込み
    const jsonData= require('./squares.json'); 
    // キャッシュ消す
    delete require.cache[require.resolve('./squares.json')]
    res.json(jsonData);

    console.log('GETリクエストを受け取りました');
    res.status(201).send('ok')

  } catch (error) {
      console.error(error)
  }
});


const fs = require('fs')

// 送られてきた配列を状態記憶JSONにして保存する
app.post('/test2', function(req, res) {

  try {

    var data = req.body;
    // console.log(data);

  const createFile = (pathName, source) => {
    const toJSON = JSON.stringify(source);
    fs.writeFile(pathName, toJSON, (err) => {
      if (err) rej(err);
      if (!err) {
        console.log('JSONファイルを生成しました');
      }
    });
  };
  
  createFile('squares.json', data);

  res.send("POSTリクエストを受け取りました");

  } catch (error) {
      console.error(error)
  }

});



//ミドルウエアでstaticパスを追加（ただ、これだけだと直アクセスや無いpathだと動かない）
// app.use(express.static(path.join(__dirname, "build")));


//これを追加（全てをindex.htmlにリダイレクト。いわゆるrewrite設定）
// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// listen()メソッドを実行して3000番ポートで待ち受け
// コンソールにポート表示しておく
var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});


