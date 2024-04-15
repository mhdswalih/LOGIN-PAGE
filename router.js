const express = require('express');
const router = express.Router();

const credential={
    email:"admin@gmail.com",password:'1234',
    // email:"swalih@gmail.com",password:"1234",
}


//login user
router.post('/login', (req, res) => {
    // console.log(req.body.email, req.body.password)
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        // res.redirect("/dashboard")
        res.redirect('/route/home');
    } else {
        res.render('base',{msg:"Invalid username or password"});
    }
});


//dashboard
router.get('/home', (req, res) => {
    if(req.session.user){
        res.render('home');
    }
    else{
        res.redirect('/');
    }
})

//logout router

router.get('/logout',(req,res)=>{
    // let email = req.session.user.slice(0,3)
    // console.log(email);
    req.session.destroy()
    res.redirect('/')
    })

module.exports = router;

