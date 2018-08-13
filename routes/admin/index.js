var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
  res.render('members/home',{title:'Member Home'});
});

module.exports = router;
