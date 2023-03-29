const User = require('../models/User');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiErrorClass = require('../error/ApiError');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' });
}

const signupUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw new ApiErrorClass(400, 'All fields must be filled');
    if (!validator.isEmail(email)) throw new ApiErrorClass(400, 'Email is not valid');

    const exists = await User.findOne({ email });
    if (exists) throw new ApiErrorClass(400, 'Email already in use');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hash });

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch(err) {
    next(err);
  }
}

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  console.log('req.body', req.body);
  try {
    if (!email || !password) throw new ApiErrorClass(400, 'All fields must be filled');
    const user = await User.findOne({ email });
    if (!user) throw new ApiErrorClass(400, 'Incorrect email');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new ApiErrorClass(400, 'Invalid credentials');
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch(err) {
    next(err);
  }
}

module.exports = { loginUser, signupUser }
