import { Stack, styled, Box, Container } from "@mui/material";
import RoshoonSkeleton from "./RoshoonSkeleton";
import { useNavigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import * as paths from "./paths";
import AppBar from "src/features/appBar";
import Footer from "src/features/footer";
import ErrorBoundary from "src/features/errorBoundary";
import EntitledElement from "./components/EntitledElement";

const AppRoot = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100%",
  minHeight: 500,
}));

const MainContent = styled(Container)(({ theme }) => ({
  flex: "1 1 auto",
  display: "flex",
  flexDirection: "column",
  marginTop: 80,
}));

const unknownRoute = () => {
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
      <MainContent disableGutters>
        <Routes>
          <Route
            path={paths.homepage}
            element={
              <ErrorBoundary>
                <EntitledElement role={"dev"} fallback={<RoshoonSkeleton />}>
                  <div>Some Component</div>
                </EntitledElement>
              </ErrorBoundary>
            }
          />
        </Routes>
        <Footer />
      </MainContent>
    </AppRoot>
  );
};

export default App;
