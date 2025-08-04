import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactElement;
}) {
  const { user } = useContext(AuthContext);
   // if (user?.authToken) return <p>Loading...</p>;
  if (!user?.authToken) return <Navigate to="/" />;
  return children;
}
