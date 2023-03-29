import { useEffect, useContext } from "react";
import { BudgetsContext } from "../context/BudgetContext";
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import BudgetDetails from '../components/BudgetDetails'

export default function BudgetLayout() {
  const { state: { budgets }, dispatch } = useContext(BudgetsContext);
  const { user } = useContext(AuthContext);
  const { error, setError, data, executeFetch } = useFetch('http://localhost:8000/api/budgets');
  
  useEffect(() => {
    if (!user) {
      setError('Not Authorized');
      return;
    }
    const getBudgets = async () => {
      await executeFetch({
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (data) dispatch({ type: 'GET_BUDGETS', payload: data });
    }
    getBudgets();
  }, [dispatch, user, data, executeFetch, setError]);

  return (
    <div className="budget-layout">
      <div className="budgets">
        
        {error && <h5>{error}</h5>}
        {budgets && budgets.map((budget) => (
          <BudgetDetails key={budget._id} budget={budget} />
        ))}
      </div>
      
    </div>
  )
}
