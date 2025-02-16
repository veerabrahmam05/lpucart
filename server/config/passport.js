const {Strategy : JwtStrategy, ExtractJwt} = require('passport-jwt');
const {User} = require('../models/index.js');
const config = require("./config.js")

const jwtOptions = {
    secretOrKey : config.jwt.secret,
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
}
const JwtVerify = async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);
        if(!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}

const jwtStrategy = new JwtStrategy(jwtOptions, JwtVerify);
module.exports = jwtStrategy;