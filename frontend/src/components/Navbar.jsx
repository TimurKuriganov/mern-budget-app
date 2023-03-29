import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { GrMoney, GrLogin } from 'react-icons/gr';

function Navbar() {
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <nav>
      <Link to="/">
        <GrMoney />
        <span>BudgetTracker</span>
      </Link>
      {user && (
        <div>
          <span>{user.email}</span>
          <button onClick={handleLogout} className="btn btn-error">Log out</button>
        </div>
      )}
      {!user && (
        <Link to="/auth">
          <button className="btn"><span>Login</span><GrLogin/></button>
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
