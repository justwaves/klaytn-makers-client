import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PostListPage from "pages/PostListPage";
import PostPage from "./pages/PostPage";
import LoginPage from "pages/LoginPage";
import SignupPage from "pages/SignupPage";
import WritePage from "pages/WritePage";

const Routes = () => (
  <Switch>
    <Route path={["/@:username", "/"]} exact component={PostListPage} />
    <Route path="/@:username/:postId" component={PostPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/write" component={WritePage} />
    <Redirect from="*" to="/" />
  </Switch>
);

export default Routes;
