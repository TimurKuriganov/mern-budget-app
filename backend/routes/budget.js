const express = require('express');
const { 
  getBudgets,
  getSingleBudget,
  createBudget,
  deleteBudget,
  updateBudget
} = require('../controllers/budgetController');

const { createExpense, deleteExpense } = require('../controllers/expenseController');

const { requireAuth, isBudgetAuthor, isExpenseAuthor } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(requireAuth);

router.get('/', getBudgets);
router.post('/', createBudget);

router.get('/:id', isBudgetAuthor, getSingleBudget);
router.delete('/:id', isBudgetAuthor, isBudgetAuthor, deleteBudget);
router.patch('/:id', isBudgetAuthor, isBudgetAuthor, updateBudget);

router.post('/:id/expenses', createExpense);
router.delete('/:id/expenses/:expenseId', isExpenseAuthor, deleteExpense);


module.exports = router;
