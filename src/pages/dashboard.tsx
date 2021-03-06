import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../services/auth-service';
import { AuthContext, LOGOUT } from '../state/context/auth-context';

export const DashboardPage = () => {
  const [, dispatch] = useContext(AuthContext);
  const history = useHistory();
  const onLogoutHandler = (e: any) => {
    authService
      .logout()
      .then(() => {
        dispatch({
          type: LOGOUT,
        });
        history.push('/');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h4>Dashboard Page</h4>
      <button onClick={onLogoutHandler}>logout</button>
    </div>
  );
};
