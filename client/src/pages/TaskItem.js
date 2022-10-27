import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateTask, deleteTask } from "../api"
import { FaTrash } from "react-icons/fa"

const TaskItem = ({ task }) => {
  let queryClient = useQueryClient()

  const user = JSON.parse(localStorage.getItem("user"))

  const updateMutation = useMutation(
    () => updateTask({ ...task, completed: !task.completed }, user.token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["Tasks"])
      },
    }
  )
  const deleteMutation = useMutation(() => deleteTask(task._id, user.token), {
    onSuccess: () => {
      queryClient.invalidateQueries(["Tasks"])
    },
  })

  return (
    <li className="flex flex-col gap-2 p-4 rounded shadow shadow-slate-500 relative overflow-hidden">
      {updateMutation.isLoading && (
        <div className="bg-yellow-300 h-1 w-full absolute top-0 left-0"></div>
      )}
      <div className="flex items-center justify-between">
        <input
          type="checkbox"
          value={task.completed}
          onChange={() =>
            updateMutation.mutateAsync(
              { ...task, completed: !task.completed },
              user.token
            )
          }
          checked={task.completed}
          className="h-4 w-4"
        />
        <h4
          className={`text-yellow-300 font-bold text-xl ${
            task.completed === true && "line-through text-yellow-100"
          }`}
        >
          {task.text}
        </h4>
        <button
          className="text-red-500 flex"
          onClick={() => deleteMutation.mutateAsync(task._id, user.token)}
        >
          <FaTrash size={20} />
        </button>
      </div>
      <div className="flex gap-2 justify-between">
        <small className="text-neutral-400 text-center">
          Created: {new Date(task.createdAt).toLocaleDateString("en-US")}
        </small>
        <small className="text-neutral-400 text-center">
          Updated: {new Date(task.updatedAt).toLocaleDateString("en-US")}
        </small>
      </div>
    </li>
  )
}

export default TaskItem
