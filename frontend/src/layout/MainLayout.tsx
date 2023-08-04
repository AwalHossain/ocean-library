import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/navbar'

const MainLayout= () => {
  return (
    <div>
        <Navbar />
        <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
