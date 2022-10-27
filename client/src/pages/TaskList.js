import { useQuery } from "@tanstack/react-query"
import { FaSpinner } from "react-icons/fa"
import TaskItem from "./TaskItem"
import { getTasks } from "../api"

const TaskList = () => {
  const user = JSON.parse(localStorage.getItem("user"))

  const {
    data: tasks = [],
    isLoading,
    isError,
    isSuccess,
  } = useQuery(["Tasks"], () => getTasks(user.token))

  let content

  if (isLoading) {
    content = (
      <div className="mx-auto">
        <FaSpinner size={48} className="animate-spin text-green-300" />
      </div>
    )
  }

  if (isError) {
    content = (
      <div>
        <p className="w-full text-center text-red-300">Something went wrong</p>
      </div>
    )
  }

  if (isSuccess) {
    content =
      tasks.length > 0 ? (
        <ul className="grid gap-2 w-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </ul>
      ) : (
        <p className="text-white text-center">No Tasks</p>
      )
  }

  return (
    <section className="bg-slate-900 min-h-screen pt-14 px-2 pb-2">
      <div className="flex flex-col">
        <h2 className="text-center text-yellow-300 font-bold text-2xl mb-4">
          {user && user.name} Tasks
        </h2>
        {content}
      </div>
    </section>
  )
}

export default TaskList
