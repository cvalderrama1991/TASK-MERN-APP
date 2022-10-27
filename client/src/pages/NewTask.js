import { useState } from "react"
import InputControl from "../components/InputControl"
import { useMutation } from "@tanstack/react-query"
import { createTask } from "../api"
import { useNavigate } from "react-router-dom"

const NewTask = () => {
  const [text, setText] = useState("")
  const user = JSON.parse(localStorage.getItem("user"))

  const { isError } = useMutation(createTask)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newTask = {
      text: text,
      completed: false,
    }

    if (text) {
      try {
        await createTask(newTask, user.token)
        navigate("/tasks")
        setText("")
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <section className="bg-slate-900 min-h-screen pt-14 px-2 pb-2 flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2 p-4 w-full max-w-md border border-yellow-300 rounded">
        <h2 className="text-yellow-300 text-center font-bold">New Task</h2>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <InputControl
            label="Task"
            type="text"
            placeholder="Enter Task"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div>
            <button className="bg-yellow-300 py-2 rounded block w-full">
              Submit
            </button>
          </div>
        </form>
        {isError && (
          <p className="text-center text-red-300">Something went wrong!</p>
        )}
      </div>
    </section>
  )
}

export default NewTask
