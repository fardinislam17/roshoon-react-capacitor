import { Box, Container, styled } from '@mui/material';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import EntitledElement from './components/EntitledElement';
import AppBar from './features/appBar/AppBar';
import ErrorBoundary from './features/errorBoundary';
import Footer from './features/footer';
import Roshoon from './features/roshoon';
import { Register, Login, SignUp } from './features/auth';
import * as paths from './paths';
import RoshoonSkeleton from './RoshoonSkeleton';

const AppRoot = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100%',
  minHeight: 500,
}));

const MainContent = styled(Container)(({ theme }) => ({
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
  marginTop: 80,
}));

const UnknownRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(paths.homepage);
  }, [navigate]);
  return null;
};

const App = () => {
  return (
    <AppRoot>
      <AppBar />
      <MainContent disableGutters maxWidth={false}>
        <Routes>
          <Route
            path={paths.homepage}
            element={
              <ErrorBoundary>
                <EntitledElement fallback={<RoshoonSkeleton />}>
                  <Roshoon />
                </EntitledElement>
              </ErrorBoundary>
            }
          />
          <Route
            path={paths.register}
            element={
              <ErrorBoundary>
                <EntitledElement fallback={<RoshoonSkeleton />}>
                  {/* <Register /> */}
                  <SignUp />
                </EntitledElement>
              </ErrorBoundary>
            }
          />
          <Route
            path={paths.login}
            element={
              <ErrorBoundary>
                <EntitledElement fallback={<RoshoonSkeleton />}>
                  <Login />
                </EntitledElement>
              </ErrorBoundary>
            }
          />
          <Route path="*" element={<UnknownRoute />} />
        </Routes>
      </MainContent>
      <Footer />
    </AppRoot>
  );
};

export default App;
