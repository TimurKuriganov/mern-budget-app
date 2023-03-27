const mongoose = require('mongoose');
const Expense = require('./Expense');
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  spent: {
    type: Number,
    default: 0,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  expenses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Expense'
    }
  ]
}, { timestamps: true });

budgetSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Expense.deleteMany({
      _id: {
        $in: doc.expenses
      }
    })
  }
})

module.exports = mongoose.model('Budget', budgetSchema);
