import '../../styles/navbar.scss'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { auth }  = useAuth()

  return (
    <section className="navbar">

    <div className="display">
      <div className="left"> Attic Bookstores </div>
      <div className="div">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/about">About</Link>
        { auth?.username ? 
          <Link className="nav-link" to="/auth/signin">Sign out</Link> :
          <Link className="nav-link" to="/auth/signin">Sign in</Link>
        }
        {
          auth?.username ? <Link className='nav-link' to='/auth/signin'>Profile Pic</Link> : ""
        }
        <Link className="nav-link" to="/auth/signup">Register</Link>
      </div>
    </div>

    </section>
  );
};

export default Navbar;
