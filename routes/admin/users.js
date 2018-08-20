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

router.get('/view/:id',(req,res,next)=>{
  User.findById(req.params.id,(err,rtn)=>{
    if(err) throw err;
    if(rtn.length == 0) next(new Error('User data not found!!'))
    console.log('do',rtn.length);
    res.render('admin/users/user-view',{title: 'Users Lists', user: rtn[0]});
  });

});

module.exports = router;
