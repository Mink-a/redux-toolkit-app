import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useLoginMutation } from "./feature/auth/authApi";
import { login, logout } from "./feature/auth/authSlice";
import {
  decrement,
  increment,
  incrementByAmount,
} from "./feature/counter/counterSlice";
import { useGetTodosQuery } from "./feature/todos/todoApi";

function App() {
  const count = useAppSelector((state) => state.counter.count);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { data = [] } = useGetTodosQuery({ limit: 5 });
  const [loginMutation] = useLoginMutation();

  const handleAdd = () => {
    dispatch(increment());
  };

  const handleMinus = () => {
    dispatch(decrement());
  };

  const handleAddByTwo = () => {
    dispatch(incrementByAmount(2));
  };

  const handleLogin = async () => {
    try {
      const res = await loginMutation({
        username: "kminchelle",
        password: "0lelplR",
      });

      if ("error" in res) {
        return res.error;
      } else {
        dispatch(
          login({
            isAuthenticated: true,
            token: res.data.token,
            user: { username: res.data.username },
          })
        );
      }
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <h1>Vite + React</h1>
      <p>count is: {count}</p>
      <button onClick={handleAdd}>Increment</button>
      <button onClick={handleMinus}>Decrement</button>
      <button onClick={handleAddByTwo}>IncrementByTwo</button>
      {auth.isAuthenticated ? <p>user: {auth.user.username}</p> : null}
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <h1>Number of todos: {data.length}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default App;
