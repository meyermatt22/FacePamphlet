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
import PostPageSingle from "./components/PostPageSingle";
import PostPageForm from "./components/PostPageForm";
import PostPageEditFormModal from "./components/PostPageEditFormModal";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AllComments from "./components/CommentPageAll";
import ProfileDeleteModal2 from "./components/ProfPageDeleteModal/index2";
import Board from "./components/MineSweeper/Board";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <LoginFormPage />
          </Route>
          <Route exact path="/mine" >
            <Board />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/home">
            <ProtectedRoute>
              <HomePage/>
            </ProtectedRoute>
          </Route>
          <Route exact path="/profiles">
            <ProtectedRoute>
              <AllProfiles />
            </ProtectedRoute>
          </Route>
          <Route exact path="/profiles/current">
            <ProtectedRoute>
              <ProfPageCurr />
            </ProtectedRoute>
          </Route>
          <Route exact path="/profiles/new">
            <ProtectedRoute>
              <ProfPageForm />
            </ProtectedRoute>
          </Route>
          <Route exact path="/profiles/edit/:id">
            <ProtectedRoute>
              <ProfPageEditForm />
            </ProtectedRoute>
          </Route>
          <Route exact path="/profiles/:id">
            <ProtectedRoute>
              <ProfPageSingle />
            </ProtectedRoute>
          </Route>
          <Route exact path="/posts">
            <ProtectedRoute>
              <AllPosts />
            </ProtectedRoute>
          </Route>
          <Route exact path="/comments">
            <ProtectedRoute>
              <AllComments />
            </ProtectedRoute>
          </Route>
          <Route exact path="/posts/new">
            <ProtectedRoute>
              <PostPageForm />
            </ProtectedRoute>
          </Route>
          <Route exact path="/posts/edit/:id">
            <ProtectedRoute>
              <PostPageEditFormModal />
            </ProtectedRoute>
          </Route>
          <Route exact path="/posts/:id">
            <ProtectedRoute>
              <PostPageSingle />
            </ProtectedRoute>
          </Route>
          <Route exact path="/profiles/delete/query">
            <ProtectedRoute>
              <ProfileDeleteModal2 />
            </ProtectedRoute>
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
