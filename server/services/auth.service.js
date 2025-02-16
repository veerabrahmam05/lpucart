const { userService } = require(".")
const bcrypt = require("bcrypt")

const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new Error("Invalid credentials")
    }
    // const isMatch = await bcrypt.compare(password, user.password);
    // if(!isMatch) {
    //     throw new Error("Password Incorrect")
    // }
    return user;
}
module.exports = {
    loginUserWithEmailAndPassword
}