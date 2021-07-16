import Teste from "./components/Testes";
import {
  Switch,
  Route
} from "react-router-dom";
import Chrono from "./components/Chrono";
import Select from "./components/Select";
 
function App() {
  return (
    <div>
    <Switch>
      <Route path="/" exact>
        <Select />
      </Route>
      <Route path="/timer">
        <Teste />
      </Route>
      <Route path="/chrono">
        <Chrono />
      </Route>
    </Switch>

    </div>
  );
}

export default App;
