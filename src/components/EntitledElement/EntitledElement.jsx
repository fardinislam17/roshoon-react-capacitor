import React, { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useSignInWithExistingCookieQuery } from 'src/apis';
import { setUser, getCurrentUser } from 'src/slices';
import { useDispatch, useSelector } from 'react-redux';
import { ROSHOON_ACCESS_TOKEN } from 'src/app/constants';
import { useNavigate, useLocation } from 'react-router-dom';

const EntitledElement = ({
  children,
  fallback,
  redirectIfLoggedIn,
  redirectTo,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector(getCurrentUser);
  const shouldSkip = !localStorage.getItem(ROSHOON_ACCESS_TOKEN);
  const { data, isFetching } = useSignInWithExistingCookieQuery(
    shouldSkip ? skipToken : undefined
  );

  useEffect(() => {
    if (data?.success && data.user && !currentUser?.loggedIn) {
      dispatch(setUser({ ...data.user, loggedIn: true }));
    }
  }, [data, currentUser, dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const asChef = params.get('asChef') === 'true';

    if (redirectIfLoggedIn && currentUser?.loggedIn && !asChef) {
      navigate(redirectTo || '/');
    }
  }, [currentUser, redirectIfLoggedIn, redirectTo, location, navigate]);

  if (isFetching) {
    return fallback ? fallback : <CircularProgress />;
  }

  return children;
};

export default EntitledElement;
