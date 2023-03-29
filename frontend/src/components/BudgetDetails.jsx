import { useContext } from 'react';
import { BudgetsContext } from '../context/BudgetContext';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';

const BudgetDetails = ({ budget }) => {
  const { dispatch } = useContext(BudgetsContext);
  const { user } = useContext(AuthContext);
  const  { isLoading, error, data, fetchData } = useFetch();

  // const handleDelete = async () => {
  //   if (!user) {
  //     // setError('Not authorized');
  //     return;
  //   }
  //   try {
  //     const res = await fetch(`/api/workouts/${workout._id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Authorization': `Bearer ${user.token}`
  //       }
  //     });
  //     const data = await res.json();
  //     if (!res.ok) {
  //       throw Error('there is no such workout');      
  //     } else {
  //       dispatch({ type: 'DELETE_WORKOUT', payload: workout._id });
  //     }
  //   } catch(err) {
  //     setError(err.message);
  //   }
  // }

  return (
    <div className="budget-details">
      <h4>{budget.title}</h4>
      <p><strong>Budget: </strong>{budget.budget}</p>
      <p><strong>Spent: </strong>{budget.spent}</p>
      <p>{budget.createdAt}</p>
      {/* <span className="material-symbols-outlined" onClick={handleDelete}>delete</span> */}
      {error && <div className="error">Error: {error}</div>}
    </div>
  )
}

export default BudgetDetails;
