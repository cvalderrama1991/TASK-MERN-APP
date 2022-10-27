import { useState } from "react"
import InputControl from "../components/InputControl"
import { FaUser } from "react-icons/fa"
import { useMutation } from "@tanstack/react-query"
import { loginUser } from "../api"
import { useNavigate } from "react-router-dom"

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }))
  }

  const { isError, isLoading, error } = useMutation(loginUser)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const existingUser = {
      email: formData.email,
      password: formData.password,
    }

    if (formData.email && formData.password) {
      try {
        const payload = await loginUser(existingUser)
        setFormData((prevFormData) => ({
          ...prevFormData,
          email: "",
          password: "",
        }))
        localStorage.setItem("user", JSON.stringify(payload))
        setIsLoggedIn(true)
        navigate("/")
      } catch (err) {
        console.log(err)
        console.log(error)
      }
    }
  }

  return (
    <section className="bg-slate-900 min-h-screen pt-14 px-2 pb-2 flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2 p-4 w-full max-w-md border border-yellow-300 rounded">
        <h2 className="font-bold text-xl flex items-center justify-center gap-2 text-yellow-300 max-w-max px-2 py-1 mx-auto">
          LOGIN <FaUser />
        </h2>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <InputControl
            label="Email"
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputControl
            label="Password"
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div>
            <button className="bg-yellow-300 py-2 rounded block w-full">
              Submit
            </button>
          </div>
        </form>
        {isLoading && <p className="text-center text-white">Loading...</p>}
        {isError && (
          // <p className="text-center text-red-300">Something went wrong!</p>
          <p className="text-center text-red-300">{JSON.stringify(error)}</p>
        )}
      </div>
    </section>
  )
}

export default Login
