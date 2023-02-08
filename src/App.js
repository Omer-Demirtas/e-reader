import axios from "utils/Api";
import React, { useEffect} from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { Routes } from "Routes";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

const Router = () => {
  return useRoutes(Routes);
};

export default App;
