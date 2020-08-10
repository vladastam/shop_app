const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product')
const { auth } = require("../middleware/auth");

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_$(file.originalname}`)
  }
})

var upload = multer({ storage: storage }).single("file")


router.post('/image', auth ,(req, res) => {
    //가져온 이미지를 저장을 해주면 된다.
    upload(req, res, err => {
        if (err) {
            return req.json({ success: false, err })
        }

        return res.json({ success:true, filePath:res.req.file.path , fileName: res.req.file.filename })
    })

})


router.post('/', auth ,(req, res) => {
    //받아온 정보들을 DB에 넣어준다

    const product = new Product(req.body)

    product.save((err) => {
        if(err) return res.status(400).json({ success: false, err})
        return res.status(200).json({ success: true })
    })

})

router.post('/products', (req, res) => {

    // product collection에 들어 있는 모든 상품 정보를 가져오기

    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    let findArgs = {};
    let term = req.body.searchTerm;

    for(let key in req.body.filters) {
      if(req.body.filters[key].length > 0){

          if(key === "price"){
            findArgs[key] = {
              // Greater than equal
              $gte: req.body.filters[key][0],
              // Less than equal
              $lte: req.body.filters[key][1]
            }
          } else {
            findArgs[key] = req.body.filters[key];
          }
      }
    }

    console.log('findArgs', findArgs)

    if(term){
      Product.find(findArgs)
        .find({ $text: { $search: term } })
        .populate("writer")
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
          if (err) return res.status(400).json({ success: false, err })
          return res.status(200).json({
            success: true, productInfo,
            postSize: productInfo.length
          })
        })

    } else{
      Product.find(findArgs)
        .populate("writer")
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
          if (err) return res.status(400).json({ success: false, err })
          return res.status(200).json({
            success: true, productInfo,
            postSize: productInfo.length
          })
        })

    }
})

router.get('/products_by_id', (req, res) => {

  let type = req.query.type
  let productIds = req.query.id
  //productId를 이용해서 DB에서  ProductId와 같은상품의 정보를 가져온다.
  console.log("req.query.id", req.query.id)
  if(type === "array") {
    // id = 12312312412,123124213123,143512321 이거를
    // productIds = [ '12312312412' , '123124213123', '143512321'] 이런식으로 바꿔주기
    let ids = req.query.id.split(',');
    productIds = [];
    productIds = ids.map(item => {
      return item
    })
  }
  console.log("productIds", productIds)

  Product.find({ _id: { $in: productIds } })
    .populate('writer')
    .exec((err, product) => {
      if (err) return res.status(400).send(err)
      return res.status(200).send(product)
    })
});




module.exports = router;