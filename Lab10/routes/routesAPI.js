//require express, express router and bcrypt as shown in lecture code
const express= require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const users = require("../data/users");

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    if(req.session.user) { // if user is authenticated
      res.redirect("/protected");
    } else{ //  not authenticated
      return res.status(403).render('userLogin', {title: "Login"})
    }
  })

router
  .route('/register')
  .get(async (req, res) => {
    if (req.session.user) { // if user is authenticated
      res.redirect("/protected");
    }else{ //  not authenticated
      return res.status(403).render('userRegister', {title: "Sign-Up"})
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let username = req.body.usernameInput;
    let password = req.body.passwordInput;
    try {
      //Input Checking
      if((!username) || (!password)){
        return res.status(400).render('forbiddenAccess')
      }
      username= username.trim();
      if(username.trim().length === 0){
        return res.status(400).render('forbiddenAccess', 
        {class: "empty-spaces",
         error: "USERNAME CAN'T HAVE EMPTY SPACES"});
      }
      if (username.trim().length < 4){
        return res.status(400).render('forbiddenAccess', 
        {   class: "characters",
            error: "USERNAME MUST HAVE 4 OR MORE CHARACTERS"})
      }
      if (password.trim().length === 0){
        return res.status(400).render('forbiddenAccess', 
        {   class: "empty-spaces",
            error: "PASSWORD CAN'T HAVE EMPTY SPACES"})
      }
      if (password.trim().length < 6){
        return res.status(400).render('forbiddenAccess', 
        {   class: "characters",
            error: "PASSWORD MUST HAVE 6 OR MORE CHARACTERS"})
      } 
      let reUser = /^[a-zA-Z0-9]{4,}$/; // I did up to unlimited characters
      if(reUser.test(username) === false) {
        return res.status(400).render({error: "MUST BE A VALID USERNAME!"})
      }
      let rePass = /^[ A-Za-z0-9_@.\#&+-]{6,}$/;
      if(rePass.test(password) === false) {
        return res.status(400).render({error:"MUST BE A VALID PASSWORD!"})
      }
      const postUser = await users.createUser(username, password);
      if(postUser.insertedUser === true){
        res.redirect('/');
      }else {
        return res.status(500).render('forbiddenAccess', {error: "Internal Server Error"});
      }
    }catch(e){
      return res.status(400).render('forbiddenAccess', {error: e});
    }
  })
 
router
  .route('/login')
  .post(async (req, res) => {
    //code here for POST
  let username = req.body.usernameInput;
  let password = req.body.passwordInput;
  try {
    //Input Checking 
    if ((!username) || (!password)){
      return res.status(400).render('forbiddenAccess', {class: "invalid"});
    }
    username= username.trim();
    if(username.trim().length === 0){
      return res.status(400).render('forbiddenAccess', 
      {class: "invalid",
      error: "USERNAME CAN'T HAVE EMPTY SPACES"});
    }
    if (username.trim().length < 4){
      return res.status(400).render('forbiddenAccess', 
      {   class: "invalid",
          error: "USERNAME MUST HAVE 4 OR MORE CHARACTERS"});
    }
    if (password.trim().length < 6){
      return res.status(400).render('forbiddenAccess', 
      {   class: "invalid",
        error: "PASSWORD MUST HAVE 6 OR MORE CHARACTERS"});
    }
    let reUser = /^[a-zA-Z0-9]{4,}$/; // I did up to unlimited characters
    if (reUser.test(username) === false) {
      return res.status(400).render('forbiddenAccess', 
      {   class: "invalid",
          error: "INVALID USERNAME"});
    }
    let rePass = /^[a-zA-Z0-9.\-_$#&@*!]{6,}$/; // I did up to unlimited characters
    if (rePass.test(password) === false) {
      return res.status(400).render('forbiddenAccess', 
      {   class: "invalid",
          error: "INVALID PASSWORD"});
    }
    const checkLogin = await users.checkUser(username, password);
    for (let i=0; i<users.length; i++){
      if (users[i].username === username && users[i].password === password) {
        return res.status(400).render('userLogin', {
          error: "duplicate user found"})
      }
    }
    if (checkLogin.authenticatedUser === true) {
      req.session.user = username;
      return res.redirect('/protected');
    } else {
      return res.status(400).render('userLogin', {
        error: "Username and/or password entered incorrectly"})
    }
  }catch (e) {
    return res.status(400).render('userLogin',{error: "Username and/or password not valid"})
  }
})

router
  .route('/protected')
  .get(async (req, res) => {
    //code here for GET
    let username = req.session.user;
    return res.render('private', {username: username, time : new Date().toString()});
    // res.json({route: '/private', method: req.method});
});

router
  .route('/logout')
  .get(async (req, res) => {
    //code here for GET
    req.session.destroy();
    res.render('logout', {});
});

module.exports = router;