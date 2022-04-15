import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import Spinner from '../elements/Spinner';
const Login = lazy(() => import('../page/Login'));
const Main = lazy(() => import('../page/Main'));
const Waiting = lazy(() => import('../page/Waiting'));
const GameStart = lazy(() => import('../page/GameStart'));
const Result = lazy(() => import('../page/Result'));


function App() {
  return (
    <>
      <Suspense fallback={<Spinner type={"page"} is_dim={true} width="200px" />}>
        <ConnectedRouter history={history}>
          <Route path="/main" exact component={Main} />
          <Route path="/" exact component={Login} />
          <Route path="/waiting/:roomNum" exact component={Waiting} />
          <Route path="/game/:roomNum" exact component={GameStart} />
          <Route path='/game/result/:roomNum' exact component={Result} />
        </ConnectedRouter>
      </Suspense>
    </>
  );
}
export default App;