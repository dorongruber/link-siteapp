const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/Users');
const Table = require('../models/Tables');


router.post('/login', (req,res) => {
  try{
    console.log('login user -> ', req.body);
    User.findOne({email: req.body.email})
    .then(user => {
      console.log('found user => ', user);
      if (!user) {
        res.json({userid: 'error'});
      } else {
        bcrypt.compare(req.body.password, user.password).then(response => {
          if (response) {
            console.log('response => ', response, user.id);
            res.json({userid: user.id})
          } else {
            res.json({userid: 'error'});
          }
        });
      }
    });
  }catch(err) {
    res.status(404),json(err);
  }
})

router.post('/registration', async (req,res) => {
  // console.log('registration -> ');
  const usertocheck = req.body.pop();
  const by_username = await User.findOne({email: usertocheck.email});
  bcrypt.hash(usertocheck.password, 10).then(hash => {
    const by_password = User.findOne({password: hash});
    if (!by_username || !by_password) {
      const newuser =  new User ({
        name: usertocheck.name,
        phone: usertocheck.phone,
        email: usertocheck.email,
        password: hash
      });
      const newusertable = new Table({
        userId: newuser._id,
        categorys: [
        { catid: 'temp',
          sites: [
            {
              siteid: 'temp',
              url: 'temp'
            }]
        }]
      });
      try {
        console.log('before save');
        const tsave = newusertable.save();
        const usaved =  newuser.save();
        res.json({message: true});
      } catch(err) {
        console.log('registration error -> ', err);
      }
  } else {
    res.json({message: false});
  }
  })
})


router.post('/addcontent', async (req,res) => {
  const {uid,cid,sid, url} = req.body;
  try {
    const userTable = await Table.findOne({userId: uid});
    const cIndex = userTable.categorys.findIndex(cat => cat.catid === cid);
    // console.log('cIndex -> ', cIndex);
    if (cIndex > -1) {
      // console.log('found category');
      const sIndex = userTable.categorys[cIndex].sites.findIndex(site => site.siteid === sid);
      if (sIndex > -1) {
        // side in table db return notifaction
        res.status(302).json({message: 'found site in db', state: false});
      } else {
        // console.log('add site to category');
        userTable.categorys[cIndex].sites.push({
          siteid: sid,
          url: url
        });
        const save = await userTable.save();
        res.status(201).json({message: `add site ${url} to category ${sid} successfully`, state: true});
      }
    } else {
      if (userTable.categorys[0].catid === 'temp') {
        // console.log('replace temp object');
        userTable.categorys[0].catid = cid;
        userTable.categorys[0].sites[0].siteid = sid;
        userTable.categorys[0].sites[0].url = url;
      } else {
        // console.log('create new category');
        userTable.categorys.push({
          catid: cid,
          sites: [
            {
              siteid: sid,
              url: url
            }
          ]
        });
      }
      const save = await userTable.save();
      res.status(201).json({message: `create category ${cid} with site ${sid} `,state: true});
    }
  }catch(err) {
    console.log(err);
  }
})

router.get('/usertable/:uid', async (req,res) => {
  try {
    const userTable = await Table.findOne({userId: req.params.uid});
    // console.log('userTable -> ', userTable);
    res.status(200).json({categorys: userTable.categorys});
  }catch(err) {
    res.status(500).json({error: err});
  }
})

router.get('/currentuser/:uid', async (req,res) => {
  const uid = req.params.uid;
  // console.log('uid => ', uid);
  const user = await User.findOne({_id: uid})
  const temp = ({
    name: user.name
  });
  res.json(temp);
})

router.delete('/link/:cid/:sid/:uid', async (req,res) => {
  const {cid, sid, uid} = req.params;
  try {
    Table.findOneAndUpdate(
      {"userId": uid, "categorys.catid": cid},
      {$pull: {"categorys.$.sites": {siteid: sid}}},
       (error, response) => {
        if (error) { res.status(400).json({url: 'user.delete.link' , message: error})}
        // console.log('response -> ', response);
        res.status(201).json({message: 'succesfully deleted site', result: true});
      });
    console.log('DeleteLink user router');
    // console.log('req.params -> ', cid, sid, uid);
  }catch(err) {
    res.status(400).json({message: err, src: 'user.js/link'});
  }

})

router.delete('/category/:uid/:cid', (req,res) => {
  const {uid, cid} = req.params;
  console.log('delete(/category/:uid/:cid');
  Table.findOneAndUpdate(
    {"userId": uid},
    {$pull: {"categorys": {catid: cid, sites: {$size: 0}}}}
    , (error, response) => {
    if (error) { res.status(400).json({url: 'user.delete.category' , message: error})}
    res.status(201).json({message: 'succesfully deleted category', result: true});
  });
})

module.exports = router;
