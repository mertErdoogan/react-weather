import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  showApiKey,
  handleSetApiKey,
  handleInputValue,
} from "../store/getApiKey";
import Cookies from "universal-cookie";

export default function GetApiKeyComponent(props) {
  const localApi = useSelector((state) => state.getApiKey.localApi);
  const apiKey = useSelector((state) => state.getApiKey.apiKey);
  const dispatch = useDispatch();
  const [apiInput, setApiInput] = useState("");

  const navigate = useNavigate();
  const cookies = new Cookies();

  function handleApiInputChange(e) {
    setApiInput(e.target.value);
    dispatch(handleInputValue(e.target.value));
  }

  return (
    <div className="apikey-root">
      <div className="apikey-wrapper">
        <div className="input-block">
          {localApi ? (
            <div className="enter-api-key">
              <p className="head-title">Enter your api key</p>
              <input
                type="text"
                name="get_api_key"
                onChange={handleApiInputChange}
                value={apiInput}
              />
              <div
                className="sendBtn"
                onClick={() => {
                  dispatch(handleSetApiKey());
                  if (cookies.get("hasApikey") != null) {
                    navigate("/");
                  }
                }}
              >
                Send
              </div>
            </div>
          ) : (
            <div className="enter-api-key">
              <p className="head-title">Create your api key</p>
              <input
                type="text"
                name="get_api_key"
                onChange={handleApiInputChange}
                value={apiInput}
              />
              <div
                className="sendBtn"
                onClick={() => dispatch(handleSetApiKey())}
              >
                Send
              </div>
            </div>
          )}
          <div
            onClick={() => dispatch(showApiKey())}
            className="show-my-apikey"
          >
            {apiKey ? apiKey : "Whats my apikey"}
          </div>
        </div>
      </div>
    </div>
  );
}