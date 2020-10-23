const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/Users');
const Table = require('../models/Tables');

router.post('/login', (req,res) => {
  console.log('login user -> ', req.body);
  User.findOne({email: req.body.email})
  .then(user => {
    if (user === null) {
      res.json({userid: 'error'});
    } else {
      bcrypt.compare(req.body.password, user.password).then(response => {
        if (response) {
          res.json({userid: user._id})
        } else {
          res.json({userid: 'error'});
        }
      })
    }

    // console.log('back user -> ', user);
  })

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
  console.log('uid => ', uid);
  const user = await User.findOne({_id: uid})
  const temp = ({
    name: user.name
  });
  res.json(temp);
})


module.exports = router;
