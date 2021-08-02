const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { auth } = require('./middleware/auth')
const { User } = require('./models/User')
const config = require('./config/key')

//application/x-www-form-urlencoded 형태의 데이터를 분석하여 가져오는 것을 도와줌
app.use(bodyParser.urlencoded({extended: true}))

//application/json 형태의 데이터 다루기
app.use(bodyParser.json())

app.use(cookieParser())


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('반가워요')
})

app.get('/api/hello', (req, res) => {
  res.send("안녕하세요 백엔드 API")
})

app.post('/api/users/register', (req, res) => {
  //회원가입 시 필요한 정보들을 client에서 가져오면 그것들을 DB에 넣어준다.
  const user = new User(req.body)

  //비밀번호 암호화


  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, error: err })
    return res.status(200).json({
      registSuccess: true
    })
  })
})

app.post('/api/users/login', (req, res) => {
  //요청된 이메일을 DB에서 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user){
      return res.json({ loginSuccess: false, message: "존재하지 않는 유저 정보입니다."})
    }

    //요청된 이메일이 졵하면 비밀번호 비교
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) return res.json({ logicSuccess: false, message: "옳지 않은 비밀번호"}) //not match
    
      //비밀번호 일치시 토큰 생성
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err) //토큰 생성 에러
        
        //쿠키에 토큰 저장
        res.cookie("x_auth", user.token).status(200).json({ loginSuccess: true, userId: user._id })
      })
    })
  })
  
})


app.get('/api/users/auth', auth/*middle ware*/, (req, res) => {
  //미들웨어를 통과하여 옴 = Authentication이 true
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, //0이 아닌 유저의 경우 admin
    isAuth: true,
    email: req.user.email,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).send({ success: true })
  })
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})