import { useState, useEffect } from "react";
import { db } from "./firebase.config";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
function App() {
  //===== Array of todos ====//
  const [todos, setTodos] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [show, setShow] = useState(false);

  const [todoName, setTodoname] = useState("");
  const [dateName, setDateName] = useState("");
  const [id, setId] = useState("");

  //=== referencing to particular collection in firestore
  const usersCollectionRef = collection(db, "todos");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    setIsLoading(true);
    const data = await getDocs(usersCollectionRef);
    setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setIsLoading(false);
    console.log(data);
  };

  //========== Create Handler =============//
  const createTodo = async (e) => {
    e.preventDefault();
    setButtonLoader(true);
    await addDoc(usersCollectionRef, {
      todo: todoName,
      date: dateName,
    });
    setButtonLoader(false);
    //
    getTodos();
    setTodoname("");
    setDateName("");
  };

  //========== Edit Handler =============//
  const handleEdit = async (id, todo, date) => {
    setTodoname(todo);
    setDateName(date);
    setId(id);
    setShow(true);
  };

  //===== Update Handler ==========//
  const handleUpdate = async () => {
    const updateData = doc(db, "todos", id);
    await updateDoc(updateData, { todo: todoName, date: dateName });
    getTodos();
    setTodoname("");
    setDateName("");
    setShow(false);
  };

  //UI
  return (
    <div>
      <div className="shadow-lg w-[500px] p-4 mx-auto">
        <p className="mb-3">Todo List</p>
        <form onSubmit={createTodo}>
          <div class="mb-2">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Your Todo
            </label>
            <input
              type="text"
              id="todo"
              value={todoName}
              onChange={(e) => setTodoname(e.target.value)}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your to do list "
              required
            />
          </div>
          <div class="mb-6">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={dateName}
              onChange={(e) => setDateName(e.target.value)}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          {show ? (
            <button
              type="button"
              onClick={handleUpdate}
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
            </button>
          ) : (
            <button
              type="submit"
              class="text-white mr-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {buttonLoader && (
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-5 h-5 mr-3 text-green-800 animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              Submit
            </button>
          )}
        </form>
      </div>

      <div className="w-[500px] mx-auto">
        {isLoading && (
          <div className="w-full flex justify-center items-center mt-16">
            <svg
              aria-hidden="true"
              role="status"
              class="inline w-[70px] h-[70px] mr-3 text-green-800 animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          </div>
        )}
        {todos.map((todo) => {
          return (
            <div
              key={todo.id}
              className="shadow-lg w-[500px] p-4 mx-auto mt-10"
            >
              <h1>{todo.todo}</h1>
              <p>{todo.date}</p>

              <button
                onClick={() => handleEdit(todo.id, todo.todo, todo.date)}
                class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center"
              >
                Edit
              </button>
              <button class="text-white ml-4 bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center">
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
