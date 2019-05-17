

module.exports.getUsers = async (req, res, next) => {
  const User = require('../models/user');
  // const faker = require('faker');
  // const user = await User.create({
  //   userName: faker.name.findName(),
  //   password: 1212
  // })
  // await user.save();
  console.log(23);

  const users = await User.find();
  return res.json({ users: users })

}
module.exports.sendMsg = (req, res, next) => {
  console.log(2323);
  console.log(req.body.msg);

}

