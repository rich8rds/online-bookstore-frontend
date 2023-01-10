import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const SharedLayout = () => {
  return (
    <section className="shared-layout">
    <Navbar />
    <Outlet />
    </section>
  )
}

export default SharedLayout