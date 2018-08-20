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

router.get('/modify/:id',(req,res,next)=>{
  User.findById(req.params.id,(err,rtn)=>{
    if(err) throw err;
    if(rtn.length == 0) next(new Error('User data not found!!'))
    console.log('do',rtn.length);
    res.render('admin/users/user-modify',{title: 'Users Lists', user: rtn[0]});
  });

});
router.post('/modify',(req,res,next)=>{
  var params = [req.body.name,req.body.role,req.body.uid];
  User.findById(req.body.uid,(err,rtn)=>{
    if(err) throw err;
    if(rtn.length == 0) next(new Error('User data not found!!'))
    console.log('do',rtn.length);
    User.update(params,(uerr,urtn)=>{
      if(uerr) throw uerr;
      console.log('asaaaa',urtn);
      req.flash('info', 'Success!!');
      res.redirect('/admin/users/view/'+ rtn[0].uid);
    })
  });

});

router.post('/remove',(req,res,next)=>{
  console.log('remove',req.body.uid);
  User.remove(req.body.uid,(err,rtn)=>{
    if(err) throw err;
    req.flash('info', 'Successfully Deleted!!');
    res.redirect('/admin/users/list');
  })
})

module.exports = router;
