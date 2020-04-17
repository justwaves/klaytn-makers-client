import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PostListPage from "pages/PostListPage";
import PostPage from "./pages/PostPage";
import LoginPage from "pages/LoginPage";
import SignupPage from "pages/SignupPage";
import WritePage from "pages/WritePage";
import TestPage from "pages/TestPage";
import MainPage from "pages/MainPage";

const Routes = () => (
  <Switch>
    <Route path={["/@:username", "/"]} exact component={PostListPage} />
    <Route path="/@:username/:postId" component={PostPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/write" component={WritePage} />
    <Route path="/test" component={TestPage} />
    <Route path="/main/:status" component={MainPage} />
    <Route path="/main" component={MainPage} />
    <Redirect from="*" to="/" />
  </Switch>
);

export default Routes;
