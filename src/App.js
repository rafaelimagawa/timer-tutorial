import React, { Suspense } from "react";
import styled from "styled-components";
import {
  Switch,
  Route
} from "react-router-dom";
import Chrono from "./pages/Chrono";
import Select from "./pages/Select";
import Nav from "./ui/Nav";
import Logo from "./ui/Logo";

// import Emom from "./components/Emom";
// import Interval from "./components/Interval";
// import Teste from "./components/Testes";
const Timer = React.lazy(() => import("./pages/Timer"))
const Interval = React.lazy(() => import("./pages/Interval"))
const Emom = React.lazy(() => import('./pages/Emom'))

const Main = styled.div`
  background-color: var(--black);
  height: 100vh;
  width: 100%;
  margin: 0;
  overflow-x: hidden;
`
 
function App() {
  return (
    <Main>
      <Logo />
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
