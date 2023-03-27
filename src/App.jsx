import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import AppRoutes from "./Routes/AppRoutes";
const App = () => {
  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
};

export default App;
