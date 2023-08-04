var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
var fs = require('fs');

app.use(cors())

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/home/taro/transfer')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')

app.post('/upload', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    }

    if (err) {
      return res.status(500).json(err)
    }

    return res.status(200).send({
      name: req.file.originalname,
      size: req.file.size,
      path: req.file.path
    })
  });
});

app.use(express.static('/home/taro/transfer'));

app.listen(8000, () => {
  console.log('App running on port 8000');
});
