import { Link } from "react-router-dom"

const Header = ({ logIn, isLogged }) => {
  const onLogout = () => {
    localStorage.clear()
    window.location.reload()
  }

  if (isLogged) {
    logIn()
  }
  return (
    <header className="h-12 w-full bg-slate-900 fixed z-20 top-0 left-0 right-0 px-2 border-b border-white">
      <div className="h-full container mx-auto flex items-center justify-between">
        <div>
          <Link to="/" className="text-yellow-300 font-bold text-xl">
            TASK MANAGER
          </Link>
        </div>
        {JSON.parse(localStorage.getItem("user")) !== null ? (
          <div>
            <button
              className="bg-yellow-300 block py-1 px-2 rounded"
              onClick={() => onLogout()}
            >
              LOGOUT
            </button>
          </div>
        ) : (
          <nav>
            <ul className="flex gap-2">
              <li>
                <Link to="/login" className="text-white block p-1">
                  LOGIN
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-white block p-1">
                  REGISTER
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
