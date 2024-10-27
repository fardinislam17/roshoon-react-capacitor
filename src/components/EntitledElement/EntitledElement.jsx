import React, { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useSignInWithExistingCookieQuery } from 'src/apis';
import { setUser, getCurrentUser } from 'src/slices';
import { useDispatch, useSelector } from 'react-redux';

const EntitledElement = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const { data, isFetching } = useSignInWithExistingCookieQuery();
  const { children, fallback } = props;

  useEffect(() => {
    if (data?.success && data.user && !currentUser?.loggedIn) {
      dispatch(setUser({ ...data.user, loggedIn: true }));
    }
  }, [data, currentUser, dispatch]);

  if (isFetching) {
    return fallback ? (
      fallback
    ) : (
      <>
        <CircularProgress />
      </>
    );
  }

  return children;
};

export default EntitledElement;
