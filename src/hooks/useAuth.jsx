import { useContext } from "react"
import { AuthContext } from "../context/useAuth"

 const useAuth = () => useContext(AuthContext)

 export default useAuth