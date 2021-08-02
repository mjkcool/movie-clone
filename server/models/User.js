const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10 //salt 자릿수
const jwt = require('jsonwebtoken');
        
//es5

const userSchema = mongoose.Schema({
    name: { type: String, maxlength: 50 },
    email: { type: String, trim: true, unique: true },
    password: { type: String, minlength: 8 },
    lastname: { type: String, maxlength: 50 },
    role: { type: Number, default: 0 },
    image: String,
    token: { type: String },
    tokenExp: { //토큰의 유효기간
        type: Number
    }
})

userSchema.pre('save', function(next) {
    var user = this //userSchema

    if(user.isModified('password')){
        //비밀번호를 암호화하기
        bcrypt.genSalt(saltRounds, function(err, salt) { //salt 생성
            if(err) return next(err)
            
            bcrypt.hash(user.password/*Plain PW*/, salt, function(err, hash) {
                //Store hash in your password DB.
                if(err) return next(err)
                user.password = hash
                next() //to save
            })
        })
    } else {
         next()
    }
})

userSchema.methods.comparePassword = function(plainPW, callback_func){
    bcrypt.compare(plainPW, this.password, function(err, isMatch){
        if(err) return callback_func(err)
        callback_func(null, isMatch)
    })
}

userSchema.methods.generateToken = function(callback_func){
    var user = this
    var token = jwt.sign(user._id.toHexString(), "secretToken")
    user.token = token
    user.save(function(err, user){
        if(err) return callback_func(err)
        callback_func(null, user)
    })
}

userSchema.statics.findByToken = function(token, callback_func){
    var user = this
    
    //토큰 decode
    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({ "_id": decoded, "token": token }, function(err, user){
            if(err) return callback_func(err)
            callback_func(null, user)
        })
    })

}

const User = mongoose.model('User', userSchema)

module.exports = { User }