const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Budget = require('../models/Budget');
const Expense = require('../models/Expense');
const ApiErrorClass = require('../error/ApiError');

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      throw new ApiErrorClass(401, 'Not Authoried, no token');
    }

    const token = authorization.split(' ')[1];
    
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select('_id');

    next();
  } catch(err) {
    return next(err);
  }
}

const isBudgetAuthor = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  try {
    const budget = await Budget.findById(id);
    if (!budget.userId.equals(req.user._id)) {
      throw new ApiErrorClass(401, 'Not Authorized');
    } else {
      next();
    }
  } catch(err) {
    next(err);
  }
}
const isExpenseAuthor = async (req, res, next) => {
  const { expenseId } = req.params;
  const { _id } = req.user;
  try {
    const expense = await Expense.findById(expenseId);
    if (!expense.userId.equals(_id)) {
      throw new ApiErrorClass(401, 'Not Authorized');
    } else {
      next();
    }
  } catch(err) {
    next(err);
  }
}

module.exports = { requireAuth, isBudgetAuthor, isExpenseAuthor };
