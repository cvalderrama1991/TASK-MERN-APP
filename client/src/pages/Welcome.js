import { Link } from "react-router-dom"

const Welcome = () => {
  return (
    <section className="bg-slate-900 min-h-screen pt-14 px-2 pb-2 flex flex-col items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-2">
        <h1 className="text-yellow-300 text-center font-bold text-xl">
          Welcome to Task Manager!
        </h1>
        <div className="flex flex-col gap-2">
          <Link
            to="/new-task"
            className="bg-yellow-300 block py-2 rounded text-center font-bold"
          >
            New Task
          </Link>
          <Link
            to="/tasks"
            className="bg-yellow-300 block py-2 rounded  text-center font-bold"
          >
            Tasks
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Welcome
