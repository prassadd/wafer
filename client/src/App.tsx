import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Todo from './pages/Todo'
import AddNewTodo from './pages/AddNewTodo';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const router = createBrowserRouter([
 { path: "/", element: <Todo /> },
  { path: "/add", element: <AddNewTodo /> },
]);

function App() {
  return <>
  <ToastContainer />
  <RouterProvider router={router} />
  </>;
}

export default App;