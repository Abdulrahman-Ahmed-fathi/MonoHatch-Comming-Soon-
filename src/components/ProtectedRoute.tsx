import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  if (typeof window === "undefined") return <Navigate to="/login" replace />;
  const authenticated = localStorage.getItem("mono-hatch-authenticated") === "true";
  if (!authenticated) return <Navigate to="/login" replace />;

  return children;
}
