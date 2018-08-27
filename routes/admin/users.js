var express = require('express');
var router = express.Router();
var User = require('../../models/User');

router.all('/list',(req,res)=>{
  console.log('call');
  var params = [req.body.keyword||'',req.body.keyword||'',req.body.role||''];
  var orderby = [req.body.sortField||'updated',req.body.sortOrder||'DESC'];
  User.find(params,orderby,(err,rtn)=>{
    if(err) throw err;
    console.log('do',rtn);
    res.render('admin/users/user-list',{title: 'Users Lists',users:rtn,search:{keyword:req.body.keyword, role:req.body.role},order:orderby});
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
    });
  });

});

router.post('/remove',(req,res,next)=>{
  console.log('remove',req.body.uid);
  User.remove(req.body.uid,(err,rtn)=>{
    if(err) throw err;
    req.flash('info', 'Successfully Deleted!!');
    res.redirect('/admin/users/list');
  });
});

router.get('/add',(req,res,next)=>{
  res.render('admin/users/user-add',{title: 'Users Add'});
});

router.post('/add',(req,res,next)=>{
  var params = [req.body.name,req.body.email,req.body.password,req.body.role];
  console.log(params);
  User.findByEmail(req.body.email, function (err,rows) {
    if(err) throw err;
    if(rows.length > 0){
      console.log('length');
      req.flash('warning', 'Duplicated email!!');
      res.redirect('/admin/users/add');
    }else {
      console.log('save');
      User.add(params, function (err2,result) {
        if(err2) throw err2;
        console.log(result);
        res.redirect('/admin/users/view/'+result.insertId);
      });
    }
  });
})

module.exports = router;
