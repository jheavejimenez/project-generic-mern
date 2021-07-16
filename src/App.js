import {BrowserRouter, Route, Switch} from "react-router-dom";
import './styles/output.css';

import Login from "./components/login"
import Admin from "./components/admin";
import Home from "./components/home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/secret-crud" component={Admin}/>
        <Route path="/" component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
