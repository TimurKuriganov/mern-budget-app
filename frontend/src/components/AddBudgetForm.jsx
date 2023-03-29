import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'
import { BudgetsContext } from '../context/BudgetContext';
import useFetch from '../hooks/useFetch';

const AddBudgetForm = () => {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(BudgetsContext);
  const [formData, setFormData] = useState({
    title: '',
    budget: '',
  });
  const { data, error, executeFetch } = useFetch('http://localhost:8000/api/budgets');

  const handleBudgetSubmit = async (e) => {
    e.preventDefault();
    await executeFetch({
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    console.log('data', data);
    if (data) dispatch({ type: 'CREATE_BUDGET', payload: data });
  }

  return (
    <form className="budget-form" onSubmit={handleBudgetSubmit}>
      <h3>Create Budget</h3>

      <label>Title:</label>
      <input
        type="string"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="e.g., Groceries"
        required
      />
      
      <label>Budget:</label>
      <input
        type="number"
        value={formData.number}
        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
        placeholder="e.g., $200"
        required
        inputMode="decimal"
        step=".01"
      />
      <div>
      <button type='submit' className='btn'>
        Add Budget
      </button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AddBudgetForm;
