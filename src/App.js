import { Switch, Route, Link } from "react-router-dom";
import './styles/output.css';

import Login from "./components/login"

function App() {
  return (
    // <div className="bg-gray-100">
    //     <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
    //         <div className="p-6">
    //             <p className="text-white text-3xl font-semibold uppercase">Admin</p>
    //         </div>
    //         <nav className="text-white text-base font-semibold pt-3">
    //             <a href="index.html" className="flex items-center active-nav-link text-white py-4 pl-6 nav-item">
    //                 <i className="fas fa-chart-pie mr-3"></i>
    //                 Dashboard
    //             </a>
    //         </nav>
    //     </aside>
    //     <div className="w-full flex flex-col h-screen overflow-y-hidden">
    //       <header classNames="w-full items-center bg-white py-2 px-6 hidden sm:flex">
    //           <div className="w-1/2"></div>
    //           <div className="relative w-1/2 flex justify-end">
    //           <button className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
    //             <img></img>
    //           </button>
    //               <button  className="h-full w-full fixed inset-0 cursor-default"></button>
    //               <div class="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
    //                   <a href="#" className="block px-4 py-2 account-link hover:text-white">Account</a>
    //                   <a href="#" className="block px-4 py-2 account-link hover:text-white">Support</a>
    //                   <a href="#" className="block px-4 py-2 account-link hover:text-white">Sign Out</a>
    //               </div>
    //           </div>
    //       </header>
    //     </div>
    //     <div className="content-container">
          <Switch>
            <Route  path="/login" component={Login} />

          </Switch>
    //   </div>
    // </div>
   
    
    
  );
}

export default App;
