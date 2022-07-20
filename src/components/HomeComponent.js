import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { fetchProvinces, fetchWeatherByCity } from "../store/homeSlice";

export default function HomeComponent(props) {
  const provinceOptions = useSelector(
    (state) => state.homeSlice.provinceOption
  );
  const weather = useSelector((state) => state.homeSlice.weather);
  const sky = useSelector((state) => state.homeSlice.sky);
  const feelsLike = useSelector((state) => state.homeSlice.feelsLike);
  const province = useSelector((state) => state.homeSlice.province);
  const dispatch = useDispatch();
  const date = new Date();

  useEffect(() => {
    dispatch(fetchProvinces());
  }, []);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "transparent",
      // Overwrittes the different states of border
      borderColor: "none",
      border: '1px solid #bfbfbf',
      borderRadius: '0',
      color: 'white',
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      padding: '2px 0px',
      backgroundColor: "transparent",
      "&:hover": {
      
      },

    }),
    option: (provided, state) => ({
      ...provided,
      color: "#000000",
      backgroundColor: "#E0E3E3",
      fontSize: state.selectProps.myFontSize,

    }),
    singleValue: (provided, state) => ({
      ...provided,
      backgroundColor: "transparent",
      color: "#bfbfbf",
      fontSize: '18px',

    })
  };

  return (
    <div className="home-root">
      <div className="home-wrapper">
        <div className="home-container">
          <div className="bg-item active-rain"></div>
          <div className="content-block">
            <img src="./assets/images/main.png" alt="" />
            <div className="left-block">
              <div className="info-container">
                <div className="info-block">
                  <p className="degree-value">{`${weather}`}</p>
                  <div className="city-info">
                    <p>{province}</p>
                    <p className="name">{date.toUTCString()}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rigth-block">
              <div className="blured-bg"></div>
              <Select
                className="select-box"
                styles={customStyles}
                placeholder="Search Location"
                options={provinceOptions}
                onChange={(e) => dispatch(fetchWeatherByCity(e))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
