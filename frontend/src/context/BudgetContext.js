import { createContext, useReducer } from 'react';

export const BudgetsContext = createContext();


export const budgetsReducer = (state, action) => {
  switch (action.type) {
    case 'GET_BUDGETS':
      return {
        budgets: action.payload
      }
    case 'CREATE_BUDGET':
      return {
        budgets: [ action.payload, ...state.budgets ]
      }
    case 'DELETE_BUDGET':
      const newState = state.budgets.filter(budget => budget._id !== action.payload)
      return {
        budgets: newState,
      }
    // case 'UPDATE_BUDGET':
    //   const newState = state.budgets;
    //   newState.find(budget => {

    //   })
    //  return {}
    default:
      return state
  }
}


export const BudgetsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(budgetsReducer, {
    budgets: [],
  });

  return (
    <BudgetsContext.Provider value={{ state, dispatch }}>
      { children }
    </BudgetsContext.Provider>
  )
}
