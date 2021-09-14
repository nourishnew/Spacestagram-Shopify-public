import "./App.css";

import React, { Suspense, useEffect } from "react";
import { SnackbarProvider } from "notistack";
import FullPageLoader from "./components/FullPageLoader";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const LikedImages = React.lazy(() => import("./components/LikedImages"));
const Spacestagram = React.lazy(() => import("./components/Spacestagram"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));

function App() {
  return (
    <Router>
      <Suspense fallback={FullPageLoader}>
        <Switch>
          <Route exact path="/" component={Spacestagram} />
          <Route
            exact
            path={["/profile/:userIdPassed"]}
            render={(props) => (
              <SnackbarProvider maxSnack={1}>
                <Dashboard {...props} />
              </SnackbarProvider>
            )}
          />
          <Route
            exact
            path={["/profile/likedImages/:userIdPassed"]}
            render={(props) => (
              <SnackbarProvider maxSnack={1}>
                <LikedImages {...props} />
              </SnackbarProvider>
            )}
          />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
