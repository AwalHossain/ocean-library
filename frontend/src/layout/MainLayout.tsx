import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'

const MainLayout= () => {
  return (
    <div>
        <Navbar />
        <div className="pt-16">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
