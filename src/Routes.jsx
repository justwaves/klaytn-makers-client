import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import WritePage from 'pages/WritePage';
import TestPage from 'pages/TestPage';
import StorePage from 'pages/StorePage';
import DetailPage from 'pages/DetailPage';
import WalletPage from 'pages/WalletPage';
import OrderDetailPage from 'pages/OrderDetailPage';
import ScrollToTop from 'components/Common/ScrollToTop';

const Routes = () => (
  <>
    <ScrollToTop />
    <Switch>
      <Route path="/product/:postId" component={DetailPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/write" component={WritePage} />
      <Route path="/store/:status" component={StorePage} />
      <Route path="/wallet/:username" component={WalletPage} />
      <Route path="/orders/:username" component={OrderDetailPage} />
      <Route path="/test" component={TestPage} />
      <Redirect from="*" to="/store/home" />
    </Switch>
  </>
);

export default Routes;
