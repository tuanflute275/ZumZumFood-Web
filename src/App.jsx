import { Route, Routes, Navigate } from "react-router-dom";
import { appRoutes } from "./routes/Routes";
import { useSelector } from "react-redux";
import { selectUserData } from "./redux/reducers/user";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const userData = useSelector(selectUserData);
  const isAuthenticated = userData?.user?.userId;
  return (
    <Routes>
      {appRoutes.map((route, index) => {
        const element = route.protected ? (
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            {route.element}
          </ProtectedRoute>
        ) : (
          route.element
        );
        return <Route exact key={index} path={route.path} element={element} />;
      })}
    </Routes>
  );
}

export default App;
