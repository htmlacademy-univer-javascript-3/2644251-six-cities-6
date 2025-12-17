import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

export default function PrivateRoute({
  authorizationStatus,
  children,
}: PrivateRouteProps) {
  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return <Navigate to="/login" />;
  }

  return children;
}
