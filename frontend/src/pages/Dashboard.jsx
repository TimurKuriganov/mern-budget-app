import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AddBudgetForm from '../components/AddBudgetForm';
import { AuthContext } from '../context/AuthContext';
import { BudgetsContext } from '../context/BudgetContext';
import BudgetLayout from '../layouts/BudgetLayout';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { state } = useContext(BudgetsContext);
  console.log('budgets', state);

  return (
    <>
      {user ? (
        <div className="dashboard">
          <h1>Welcome back</h1>
          {!state && <p></p>}
          <AddBudgetForm />
          {/* <div><BudgetLayout /></div> */}
        </div>
      ) : <Navigate to="/auth" />}
    </>
  )
}

export default Dashboard;
