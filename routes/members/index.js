var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
  res.render('members/home',{title:'Members Home'});
});

module.exports = router;
