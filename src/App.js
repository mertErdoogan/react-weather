import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import GetApiKeyComponent from "./components/GetApiKetComponent";
import HomeComponent from "./components/HomeComponent";

import { useSelector, useDispatch } from "react-redux";

function App() {

  const hasApiKey = useSelector(state => state.getApiKey.hasApiKey);

  const [provinceOption, setProvinceOption] = useState([]);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              hasApiKey ? (
                <HomeComponent
                  setProvinceOption={setProvinceOption}
                  provinceOption={provinceOption}
                />
              ) : (
                <Navigate replace to={"/set-api-key"} />
              )
            }
          ></Route>
          <Route
            path="/set-api-key"
            element={
              <GetApiKeyComponent
                hasApiKey={hasApiKey}
              />
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
