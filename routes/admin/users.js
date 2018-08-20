var express = require('express');
var router = express.Router();
var User = require('../../models/User');

router.all('/list',(req,res)=>{
  console.log('call');
  var params = [req.body.keyword||'',req.body.keyword||'',req.body.role||''];
  User.find(params,(err,rtn)=>{
    if(err) throw err;
    console.log('do',rtn);
    res.render('admin/users/user-list',{title: 'Users Lists',users:rtn,search:{keyword:req.body.keyword, role:req.body.role}});
  });

});

module.exports = router;
