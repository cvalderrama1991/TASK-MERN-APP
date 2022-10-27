import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Welcome from "./pages/Welcome"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NewTask from "./pages/NewTask"
import TaskList from "./pages/TaskList"
import PrivateRoute from "./components/PrivateRoute"
import { useState } from "react"

const queryClient = new QueryClient()

const App = () => {
  const [isLogged, setIsLoggedIn] = useState(false)

  const logIn = () => {
    window.location.reload()
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Header logIn={logIn} isLogged={isLogged} />
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/register"
            element={<Register setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/new-task"
            element={
              <PrivateRoute>
                <NewTask />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TaskList />
              </PrivateRoute>
            }
          />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </main>
    </QueryClientProvider>
  )
}

export default App
