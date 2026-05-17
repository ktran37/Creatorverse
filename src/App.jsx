import { useRoutes, Link, useLocation } from 'react-router-dom'
import ShowCreators from './pages/ShowCreators.jsx'
import ViewCreator from './pages/ViewCreator.jsx'
import AddCreator from './pages/AddCreator.jsx'
import EditCreator from './pages/EditCreator.jsx'
import './App.css'

function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const element = useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: '/creator/:id', element: <ViewCreator /> },
    { path: '/add', element: <AddCreator /> },
    { path: '/edit/:id', element: <EditCreator /> },
  ])

  return (
    <>
      {isHome ? (
        <header className="hero-header">
          <div className="hero-header-inner">
            <h1>CREATORVERSE</h1>
            <div className="hero-actions">
              <a href="#all-creators" role="button">
                VIEW ALL CREATORS
              </a>
              <Link to="/add" role="button">
                ADD A CREATOR
              </Link>
            </div>
          </div>
        </header>
      ) : (
        <header className="mini-header">
          <div className="mini-header-inner">
            <Link to="/" className="brand">
              ✨ CREATORVERSE
            </Link>
          </div>
        </header>
      )}

      <main>{element}</main>

      <footer className="app-footer">
        <small>Built with React, Vite & Supabase · CodePath WEB103</small>
      </footer>
    </>
  )
}

export default App
