const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../users/user-model')
const md = require('./auth-middleware')
const db = require('../../database/db-config')

const {JWT_SECRET, BCRYPT_ROUNDS} = require('../../config/index')
router.post('/register', md.checkPasswordLength, md.checkUsernameFree, md.checkEmailExists, async (req, res, next) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS);
    user.password = hash;
    try {
      
        const createdUser = await User.addUser(user);
        
        await User.addUserWeight(createdUser);
        res.json(createdUser);
    } catch (error) {
        next(error);
    }
});

router.post('/login', md.checkUsernameExists, (req,res,next) => {
let {username, password} = req.body

    User.findBy({username})
    .then(([user]) =>{

        if(user && bcrypt.compareSync(password, user.password)) {
            const token = buildToken(user)
            res.status(200).json({user,token})
           
            
        } else {

            res.status(401).json({message: 'Invalid Credentials'})
        }
    })
    .catch(next)
})


function buildToken(user) {
    const payload = {
        subject: user.user_id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name
    }
    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, JWT_SECRET, options)

}












module.exports = router