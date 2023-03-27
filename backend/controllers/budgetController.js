const Budget = require('../models/Budget');
const ApiErrorClass = require('../error/ApiError');

const getBudgets = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const budgets = await Budget.find({ userId: _id }).sort({ createdAt: -1 });
    res.status(200).json(budgets);
  } catch(err) {
    return next(err);
  }
}

const createBudget = async (req, res, next) => {
  const { title, budget } = req.body;
  try {
    const newBudget = await Budget.create({
      title,
      budget,
      userId: req.user._id
    });
    res.status(201).json(newBudget);
  } catch(err) {
    return next(err);
  }
}

const getSingleBudget = async (req, res, next) => {
  try {
    const budget = await Budget.findById(req.params.id).populate('expenses');
    if (!req.user._id.equals(budget.userId)) {
      throw new ApiErrorClass(401, 'Not Authorized');
    }
    res.status(200).json(budget);
  } catch(err) {
    return next(err);
  }
}

const deleteBudget = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Budget.findByIdAndDelete(id);
    res.status(200).json({ message: 'success' });
  } catch(err) {
    next(err);
  }
}

const updateBudget= async (req, res, next) => {
  const { id } = req.params;
  const { title, budget } = req.body;
  try {
    const currentBudget = await Budget.findById(id);
    currentBudget.title = title;
    currentBudget.budget = budget;
    await currentBudget.save();
    res.status(200).json(currentBudget);
  } catch(err) {
    next(err);
  }
}

module.exports = {
  getBudgets, createBudget, getSingleBudget, deleteBudget, updateBudget
}

