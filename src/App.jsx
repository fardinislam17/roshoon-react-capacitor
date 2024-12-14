import { Box, styled } from '@mui/material';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { homepagePath, loginPath, registerPath } from 'src/paths';
import Login from 'src/components/Login';
import SignUp from 'src/components/SignUp';
import EntitledElement from 'src/components/EntitledElement';
import ErrorBoundary from 'src/components/ErrorBoundary';
import AppBar from 'src/features/appBar/AppBar';
import Footer from 'src/features/footer';
import LandingPageContent from 'src/features/landingPageContent';
import RoshoonSkeleton from 'src/RoshoonSkeleton';

const AppRoot = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100%',
  minHeight: 500,
}));

const UnknownRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(homepagePath);
  }, [navigate]);
  return null;
};

const App = () => {
  return (
    <AppRoot>
      <AppBar />
      <div className="container">
        <Routes>
          <Route
            path={homepagePath}
            element={
              <ErrorBoundary>
                <EntitledElement fallback={<RoshoonSkeleton />}>
                  <LandingPageContent />
                </EntitledElement>
              </ErrorBoundary>
            }
          />
          <Route
            path={loginPath}
            element={
              <ErrorBoundary>
                <EntitledElement
                  fallback={<RoshoonSkeleton />}
                  redirectIfLoggedIn
                  redirectTo={homepagePath}
                >
                  <Login />
                </EntitledElement>
              </ErrorBoundary>
            }
          />
          <Route
            path={registerPath}
            element={
              <ErrorBoundary>
                <EntitledElement
                  fallback={<RoshoonSkeleton />}
                  redirectIfLoggedIn
                  redirectTo={homepagePath}
                >
                  <SignUp />
                </EntitledElement>
              </ErrorBoundary>
            }
          />
          <Route path="*" element={<UnknownRoute />} />
        </Routes>
      </div>
      <Footer />
    </AppRoot>
  );
};

export default App;
