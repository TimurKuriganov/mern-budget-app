const Budget = require('../models/Budget');
const Expense = require('../models/Expense');
const ApiErrorClass = require('../error/ApiError');

const createExpense = async (req, res, next) => {
  const { _id } = req.user;
  const { name, amount } = req.body;
  const { id } = req.params;
  try {
    const budget = await Budget.findById(id);
    if (!budget.userId.equals(_id)) throw new ApiErrorClass(401, 'Not Authorized to add an expense');
    else {
      const expense = await Expense.create({ name, amount, userId: _id });
      budget.expenses.push(expense._id);
      budget.spent += parseInt(amount);
      await budget.save();
      res.status(201).json(await budget.populate('expenses'));
    }
  } catch(err) {
    return next(err);
  }
}

const deleteExpense = async (req, res, next) => {
  const { id, expenseId } = req.params;
  try {
    const budget = await Budget.findByIdAndUpdate(id, { $pull: { expenses: expenseId } });
    const expenseToDelete = await Expense.findByIdAndDelete(expenseId);
    budget.spent -= expenseToDelete.amount;
    await budget.save();
    res.status(200).json({ message: 'success'});
  } catch(err) {
    return next(err);
  }
}

module.exports = { createExpense, deleteExpense };
