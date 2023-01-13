import { Outlet } from 'react-router-dom'
import useProduct from '../../hooks/useProduct'
import Navbar from './Navbar'
import SideNav from './SideNav'


const SharedLayout = () => {
  const { dispatch } = useProduct()
  const handleShowNav = () => dispatch({ type: "showNav", value: false })
  
  return (
    <section className="shared-layout">
    <Navbar />
    <SideNav />
    {/* <img src="https://media.istockphoto.com/id/1386193712/photo/knowledge.jpg?s=612x612&w=is&k=20&c=hixQ1A9rWbmXwmbUqAmq81MXY7z3ZFm3ZWELreeuXx8=" /> */}
    <div className="div"  onClick={handleShowNav}>
      <Outlet />
    </div>
    </section>
  )
}

export default SharedLayout