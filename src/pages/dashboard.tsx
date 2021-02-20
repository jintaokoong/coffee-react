import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LOGOUT } from '../constants/redux-types';

export const DashboardPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogoutHandler = (e: any) => {
    localStorage.clear();
    dispatch({
      type: LOGOUT,
    });
    history.push('/');
  };

  return (
    <div>
      <h4>Dashboard Page</h4>
      <button onClick={onLogoutHandler}>logout</button>
    </div>
  );
};
