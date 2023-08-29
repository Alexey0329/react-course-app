import { useSelector } from 'react-redux';
import { getUser } from './store/selectors';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
	const user = useSelector(getUser);

	const isAdmin = user?.role?.toLowerCase() === 'admin';
	return isAdmin ? children : <Navigate to='/courses' />;
};

export default PrivateRoute;
