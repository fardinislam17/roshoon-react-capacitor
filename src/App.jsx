import { styled, Stack, Box, Container, Button } from '@mui/material';
import RoshoonSkeleton from './RoshoonSkeleton';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import * as paths from './paths';
import AppBar from './features/appBar/AppBar';
import Footer from './features/footer';
import ErrorBoundary from './features/errorBoundary';
import EntitledElement from './components/EntitledElement';
import Roshoon from './features/roshoon';
import { Register } from './features/auth';

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
                  <Register />
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
