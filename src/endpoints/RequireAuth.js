import { Navigate, Outlet, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RequireAuth = () => {
  const { auth } = useAuth()
  const location = useLocation()

  console.log(`requireAuth: ${auth?.username}`)
  return (
    auth?.username ? <Outlet /> : <Navigate to="/auth/signin" state={ { from: location } } />
  )
}

export default RequireAuth