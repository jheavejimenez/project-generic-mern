import React from "react"

function Login() {
    return(
    <div className="font-sans min-h-screen antialiased pt-24 pb-5 bg-gray-100">
      <div className="flex flex-col justify-center sm:w-96 sm:m-auto mx-5 mb-5 space-y-8">
        <form>
          <div className="flex flex-col bg-white p-10 rounded-lg shadow space-y-6">
          <h1 className="font-bold text-xl text-center text-blue-500">ATMOS-MED ADMIN</h1>
            <div className="flex flex-col space-y-1">
              <input type="text" name="username" id="username" className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Username" />
            </div>
            <div className="flex flex-col space-y-1">
              <input type="password" name="password" id="password" className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Password" />
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center">
              <a href="#" className="inline-block text-blue-500 hover:text-blue-800 hover:underline">Forgot your password?</a>
              <button type="submit" className="bg-blue-500 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors">Log In</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    );
}

export default Login;
