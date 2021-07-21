import React, { Suspense } from "react";
import styled from "styled-components";
import {
  Switch,
  Route
} from "react-router-dom";
import Chrono from "./components/Chrono";
import Select from "./components/Select";
import Nav from "./ui/Nav";
// import Emom from "./components/Emom";
// import Interval from "./components/Interval";
// import Teste from "./components/Testes";
const Timer = React.lazy(() => import("./components/Timer"))
const Interval = React.lazy(() => import("./components/Interval"))
const Emom = React.lazy(() => import('./components/Emom'))

const Main = styled.div`
  background-color: var(--black);
  height: 100vh;
  width: 100vw;
  margin: 0;
`
 
function App() {
  return (
    <Main>
      <Nav />
      <Suspense fallback={
        <div>Loading</div>
      }>
        <Switch>
          <Route path="/" exact>
            <Select />
          </Route>
          <Route path="/timer">
            <Timer />
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
      </Suspense>
    </Main>
  );
}

export default App;
