import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  checkingSession: boolean;
  loggedUser: unknown | null;
  children: React.ReactNode;
}

function ProtectedRoute({ checkingSession, loggedUser, children }: ProtectedRouteProps) {
  if (checkingSession) {
    return null;
  }

  if (!loggedUser) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}

export default ProtectedRoute;