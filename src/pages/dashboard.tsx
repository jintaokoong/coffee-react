import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LOGOUT } from '../constants/redux-types';
import * as authService from '../services/auth-service';

export const DashboardPage = () => {
  const dispatch = useDispatch();
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
