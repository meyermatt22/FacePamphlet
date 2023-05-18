import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import AllProfiles from "./components/ProfPageAll";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ProfPageCurr from "./components/ProfPageCurr";
import ProfPageForm from "./components/ProfPageForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/profiles">
            <AllProfiles />
          </Route>
          <Route exact path="/profiles/current">
            <ProfPageCurr />
          </Route>
          <Route exact path="/profiles/new">
            <ProfPageForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
