import React, {useState} from "react"
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (username !== "admin" || password !== "admin") {
      alert("Incorrect credentials." + username + password);
      return;
    }
    history.push("/secret-crud");
  }

  return (
    <div className="font-sans min-h-screen antialiased pt-24 pb-5 bg-gray-100">
      <div className="flex flex-col justify-center sm:w-96 sm:m-auto mx-5 mb-5 space-y-8">
        <form onSubmit={(e) => {
          e.preventDefault()
          handleLogin();
        }}>
          <div className="flex flex-col bg-white p-10 rounded-lg shadow space-y-6">
            <h1 className="font-bold text-xl text-center text-blue-500">ATMOS-MED ADMIN</h1>
            <div className="flex flex-col space-y-1">
              <input type="text" name="username" id="username"
                     value={username}
                     onChange={e => setUsername(e.target.value)}
                     className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow"
                     placeholder="Username"/>
            </div>
            <div className="flex flex-col space-y-1">
              <input type="password" name="password" id="password"
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                     className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow"
                     placeholder="Password"/>
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center">
              <a href="#" className="inline-block text-blue-500 hover:text-blue-800 hover:underline">Forgot your
                password?</a>
              <button type="submit"
                      className="bg-blue-500 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors"
              >
                Log In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
