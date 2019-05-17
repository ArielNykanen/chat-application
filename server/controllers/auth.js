const bcrypt = require('bcryptjs');
const User = require('../models/user');


module.exports.postRegister = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const exists = await User.findOne({ username: username });
  
  if (exists) {
    const error = new Error('Username is already taken try another one.');
    error.statusCode = 401;
    throw error;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username: username,
      password: hashedPassword,
    });
    const result = user.save();
    res.status(201).json({ message: 'User created!', userId: result._id })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

module.exports.postLogin = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;


  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error('A user with this email could not be found.');
      errir, statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({
      email: loadedUser.email,
      userId: loadedUser._id.toString()
    }, 'secret', { expiresIn: '1h' });
    res.status(200).json({ token: token, userId: loadedUser._id.toString() })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}