import Teste from "./components/Testes";
import {
  Switch,
  Route
} from "react-router-dom";
import Chrono from "./components/Chrono";
import Select from "./components/Select";
import Nav from "./ui/Nav";
import Emom from "./components/Emom";
import Interval from "./components/Interval";
import styled from "styled-components";

const Main = styled.div`
  background-color: var(--sec-color);
  height: 100vh;
  width: 100vw;
  margin: 0;
`
 
function App() {
  return (
    <Main>
      <Nav />
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
        <Route path="/emom">
          <Emom />
        </Route>
        <Route path="/interval">
          <Interval />
        </Route>
      </Switch>
    </Main>
  );
}

export default App;
