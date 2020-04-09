import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import { logout } from "redux/modules/user";

export default () => {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return <Header user={user} onLogout={onLogout} />;
};
