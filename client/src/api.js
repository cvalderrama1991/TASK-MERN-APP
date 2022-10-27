export const loginUser = async (existingUser) => {
  const response = await fetch(`http://localhost:5000/api/users/login/`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(existingUser),
  })

  if (!response.ok) {
    throw new Error(response.json().message)
  }

  return response.json()
}

export const registerUser = async (newUser) => {
  const response = await fetch("http://localhost:5000/api/users/register/", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(newUser),
  })

  if (!response.ok) {
    throw new Error(response.json().message)
  }

  return response.json()
}

export const getTasks = async (token) => {
  const response = await fetch("http://localhost:5000/api/tasks/", {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    method: "GET",
  })

  if (!response.ok) {
    throw new Error(response.json())
  }

  return response.json()
}

export const createTask = async (newTask, token) => {
  const response = await fetch("http://localhost:5000/api/tasks/", {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(newTask),
  })

  if (!response.ok) {
    throw new Error(response.json())
  }

  return await response.json()
}

export const updateTask = async (task, token) => {
  const response = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify(task),
  })

  if (!response.ok) {
    throw new Error(response.json())
  }

  return response.json()
}

export const deleteTask = async (id, token) => {
  const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(response.json())
  }

  return await response.json()
}
