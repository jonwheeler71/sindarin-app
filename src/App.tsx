import { Routes, Route, NavLink, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import Lesson from './pages/Lesson'
import Profile from './pages/Profile'
import TopBar from './components/TopBar'

function BottomNav() {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex-1 py-3 text-center text-sm font-semibold ${isActive ? 'text-forest-700' : 'text-forest-400'}`
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-forest-100 flex max-w-lg mx-auto">
      <NavLink to="/" end className={linkClasses}>
        🌳 Path
      </NavLink>
      <NavLink to="/profile" className={linkClasses}>
        🍃 Profile
      </NavLink>
    </nav>
  )
}

function MainLayout() {
  return (
    <>
      <TopBar />
      <div className="pb-14">
        <Outlet />
      </div>
      <BottomNav />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/unit/:unitId/level/:level" element={<Lesson />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}
