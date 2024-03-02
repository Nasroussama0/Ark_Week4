const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require("express-session");
const bcrypt = require("bcrypt");
const express = require('express');
const router = require('./routes/postRoutes');
const {log} = require('./middleware/middleware');
const app = express();
app.use(express.json());
app.use(log);

const users = [];
const port = 5000;

app.use(session({
    secret:"secret_key",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

app.post("/register",(req,res)=>{
    const {email,password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({
      email: email,
      password: hashedPassword
    });
    res.send(users);
})
app.post("/login",passport.authenticate('local',{
    successRedirect:"/posts",
    failureRedirect:"/login"
}))

app.use("/posts",isAuthenticated, router)

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},(email,password,done)=>{
    const user = users.find(user=>user.email == email);
    if(user){
        if(bcrypt.compareSync(password,user.password)){
            done(null,user)
        }
    }else{
        done(null,false)
    }
}))
passport.serializeUser((user,done)=>done(null,user))
passport.deserializeUser((user,done)=>done(null,user))

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect("/login")
    }
}

app.listen(port , ()=>
    console.log("Server has started .. ")
)