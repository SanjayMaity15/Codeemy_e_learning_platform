import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
    const { token } = useSelector((state) => state.auth);
    console.log(token);

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
}
