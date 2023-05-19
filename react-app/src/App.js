import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllProfiles from "./components/ProfPageAll";
import ProfPageCurr from "./components/ProfPageCurr";
import ProfPageForm from "./components/ProfPageForm";
import ProfPageEditForm from "./components/ProfPageEditForm";
import ProfPageSingle from "./components/ProfPageSingle";
import AllPosts from "./components/PostPageAll";

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
          <Route exact path="/profiles/:id">
            <ProfPageSingle />
          </Route>
          <Route exact path="/profiles/new">
            <ProfPageForm />
          </Route>
          <Route exact path="/profiles/edit/:id">
            <ProfPageEditForm />
          </Route>
          <Route exact path="/posts">
            <AllPosts />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
