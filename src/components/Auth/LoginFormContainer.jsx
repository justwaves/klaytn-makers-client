import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initializeForm, login } from 'redux/modules/auth';
import AuthForm from './AuthForm';
import { check } from 'redux/modules/user';

export default () => {
  const [error, setError] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const { form, auth, authError, user, loading, checkLoading } = useSelector(
    ({ auth, user, loading }) => ({
      form: auth.login,
      auth: auth.auth,
      authError: auth.authError,
      user: user.user,
      loading: loading['auth/LOGIN'],
      checkLoading: loading['user/CHECK'],
    }),
  );

  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = e => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      setError('로그인 실패');
      return;
    }
    if (auth) {
      console.log('로그인 성공');
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [history, user]);

  return (
    <>
      <AuthForm
        type="login"
        form={form}
        error={error}
        onChange={onChange}
        onSubmit={onSubmit}
        loading={loading}
        checkLoading={checkLoading}
      />
    </>
  );
};
