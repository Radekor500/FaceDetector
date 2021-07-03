
const express = require('express');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const image = require('./controllers/image');
const multer = require('multer');
const session = require('express-session');
const avatar = require('./controllers/avatar');
const history = require('./controllers/history');
const cors = require('cors');
const signinSession = require('./controllers/signinSession');
var bcrypt = require('bcryptjs');
const profile = require('./controllers/profile');
const remove = require('./controllers/remove');

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '',
      database : 'face_app'
    }
  });

  


const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const upload = multer({ storage: storage})

const app = express();

app.use(express.json());



app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      // maxAge: 60 * 60 * 24
      maxAge: null
    }
  })
)

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}))

app.get('/signout', (req,res, next) => {
  console.log(req.session.authenticated)
  if (req.session.authenticated) {
    req.session.destroy();
    
  } else {
    res.send("Can't kill session");

  }
  next()
  

})

app.get('/signin', (req,res) => {signinSession.handleSession(req,res)});



app.post('/signin', (req,res) => {signin.handleSignIn(req,res,knex,bcrypt)});



app.use('/uploads', express.static('uploads'));



app.post('/register', (req,res) => {register.handleRegister(req,res,knex,bcrypt)});

app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,knex)});

app.post('/image', (req,res) => {image.handleImage(req,res,knex)});

app.post('/imageurl', (req,res) => {image.handleApi(req,res)});

app.post('/delete', (req,res) => {remove.handleRemove(req,res,knex,bcrypt)});

app.post('/upload', upload.single('avatar'), (req,res) => {avatar.handleUpload(req,res,knex)});

app.post('/history', (req,res) => {history.handleHistory(req,res,knex)});

app.get('/', (req,res) => {
  res.send("success");
  console.log(req.session.UserID)
})

const PORT = process.env.PORT
app.listen(2000, () => {
    console.log(`Runnig on port 2000`);
})


    






