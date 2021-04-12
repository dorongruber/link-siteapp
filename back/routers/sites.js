const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const router = express.Router();

const Site = require('../models/Sites');
const filename = path.join(__dirname,'category_id_url.csv');

router.post('/setstream', (req,res) => {
  fs.createReadStream(filename).pipe(csv()).on('data', (data) => {
    const sitepost = new Site({
      url: data.url,
      cat: data.main_category
    });
    sitepost.save()
    .catch(err => console.log('error -> ', err));
  })
  .on('end', (req,res) => {
    console.log('finished stream')
  })
})

router.get('/samecategory/:category', async (req,res) => {
  try {
    const sites = await Site.find({cat: req.params.category});
    let content = [];
    sites.forEach(site => {
      content.push({
        url: site.get('url'),
        id: site.get('id')
      });
    });
    res.json({content});
  }catch(err) {
    res.json({message: err});
  }
})

router.get('/allcategorys', async (req,res) => {
  try{
    // console.log('allcategorys');
    const categorys = Site.aggregate([{
    $group: {
      _id: "$cat",
      count: { $sum: 1 }
    }
  }]);
  let dictonary = [];
  // console.log('allcategorys -> ', (await categorys).length);
  (await categorys).forEach(category => {
    // console.log('category -> ', category);
    dictonary.push({
      key: category._id,
      value: category.count
    });
  });

  res.json({dictonary});
  }catch(err) {
    res.status(500).json(err);
  }
})


module.exports = router;
