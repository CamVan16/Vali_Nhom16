import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import DefaultComponent from './components/Layout/Layout';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;

            if (route.isProtected) {
              return (
                <Route key={route.path} path={route.path} element={
                  <ProtectedRoute isAdminRoute={route.isAdminRoute}>
                    <Layout>
                      <Page />
                    </Layout>
                  </ProtectedRoute>
                } />
              );
            } else {
              return (
                <Route key={route.path} path={route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
                } />
              );
            }
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
