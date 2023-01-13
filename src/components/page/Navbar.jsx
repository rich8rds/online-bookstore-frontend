import '../../styles/navbar.scss'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

import { ShoppingCartOutlined,
  MenuOutlined
 } from '@ant-design/icons'
import useProduct from '../../hooks/useProduct';

const Navbar = () => {
  const { auth }  = useAuth()
  const { dispatch } = useProduct()

  const handleShowNav = () => dispatch({ type: "showNav", value: true })

  return (
    <section className="navbar">

    <div className="display">
      <div className="left" onClick={handleShowNav}> <MenuOutlined /> </div>

      <div className="middle">
        <Link className="nav-link" to="/">HOME</Link>
        <Link className="nav-link remove-border" to="/about">ABOUT US</Link>
        <Link className="nav-link remove-border" to="/about">SHOP</Link>
        <Link className='nav-link home-title' to="/">ATTIC BOOKSTORES</Link>
        { auth?.username ? 
          <Link className="nav-link remove-border" to="/auth/signin">SIGN OUT</Link> :
          <Link className="nav-link remove-border" to="/auth/signin">SIGN IN</Link>
        }
        {
          auth?.username ? <Link className='nav-link' to='/auth/signin'>Profile Pic</Link> : ""
        }
        <Link className="nav-link remove-border" to="/auth/signup">SIGNUP</Link>
        <Link className="nav-link remove-border" to="/auth/signup">CONTACT US</Link>
      </div>

      <div className="right">
        <p>$0.00</p>
        <div className="cart-div">
          <ShoppingCartOutlined />
          <p>0</p>
        </div>
      </div>
    </div>

    </section>
  );
};

export default Navbar;
