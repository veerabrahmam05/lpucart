const { userService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const getUser = catchAsync(async(req, res)=> {
    let data = await userService.getUserById(req.params.userId);
    if(!data) {
        return res.status(404).send({message: "User not found"})
    }
    if(data.email !== req.user.email) {
        return res.status(401).send({message: "Unauthorized"})
    }
    return res.send(data);
})
const setAddress = catchAsync(async(req, res)=> {
    const user = await userService.getUserById(req.params.userId);
    if(!user) {
        return res.status(404).send({message: "User not found"})
    }
    if(user.email !== req.user.email) {
        return res.status(400).send({message: "User not allowed to access the resource"})
    }
    const address = await userService.setAddress(user, req.body.address);
    return res.send(address);
})

module.exports = {getUser, setAddress};