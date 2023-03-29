import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';

const Auth = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLogin, setIsLogin] = useState(true);
  const { dispatch } = useContext(AuthContext);
  const { data, error, setError, isLoading, executeFetch } = useFetch(
    `http://localhost:8000/api/user/${isLogin ? 'login' : 'signup'}`
  );

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    await executeFetch({
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (data)
      dispatch({ type: `${isLogin ? 'LOGIN' : 'SIGNUP'}`, payload: data });
  };

  const handleSwitchForm = (e) => {
    e.preventDefault();
    setError(null);
    setIsLogin((pre) => !pre);
  };

  return (
    <div className="intro">
      <div>
        <h1>
          Take control of <span>Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your
          journey today.
        </p>
      </div>
      <form className="auth-form" onSubmit={handleAuthSubmit}>
        <h3>{isLogin ? 'Log in' : 'Sign up'}</h3>
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label>Password:</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <div>
          <button disabled={isLoading} className="btn">{isLogin ? 'Log in' : 'Sign Up'}</button>
          <button onClick={handleSwitchForm}>
            {isLogin ? 'click to sign up' : 'click to login'}
          </button>
        </div>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Auth;
