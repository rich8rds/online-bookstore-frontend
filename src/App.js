import { Route, Routes } from 'react-router-dom';
import ChangePassword from './components/auth/ChangePassword';
import Login from './components/auth/Login';
import ResetPassword from './components/auth/ResetPassword';
import Signup from './components/auth/Signup';
import VerifySignup from './components/auth/VerifySignup';
import AdminDashboard from './components/page/AdminDashboard';
import Home from './components/page/Home';
import SharedLayout from './components/page/SharedLayout';
import UsersPage from './components/page/UsersPage';
import RequireAuth from './endpoints/RequireAuth';



function App() {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="auth/">
            <Route path="signin" element={<Login />} />
            <Route path="verify-registration" element={<VerifySignup />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ResetPassword />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>

          <Route element={ <RequireAuth /> } >
            <Route path="user/">
              <Route path="random" element={ <UsersPage /> }/>   
            </Route>
            <Route path="admin/">
              <Route path="random" element={ <AdminDashboard /> }/>   
            </Route>
          </Route>
        </Route>
      
      </Routes>
    </main>
  );
}

export default App;