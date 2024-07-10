import React, { useState, useEffect } from "react";
import { Card, Spin, Alert, Avatar } from "antd";
import axios from "axios";
import translateText from "../translationService"; // Import your translation service
import Meta from "antd/es/card/Meta";
import weatherIcon from '../icons/weather.svg'

const WeatherWidget = ({ language }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const response = await axios.get(
          "https://api.weatherapi.com/v1/current.json",
          {
            params: {
              key: "2a999d97479d4eb5a96180453241705",
              q: `${lat},${lon}`, // query for the weather based on latitude and longitude
            },
          }
        );
        const translatedLocation = await translateText(
          response.data.location.name,
          language
        );
        const translatedCondition = await translateText(
          response.data.current.condition.text,
          language
        );
        const translatedWeatherData = {
          ...response.data,
          location: {
            ...response.data.location,
            name: translatedLocation,
          },
          current: {
            ...response.data.current,
            condition: {
              ...response.data.current.condition,
              text: translatedCondition,
            },
          },
        };
        setWeather(translatedWeatherData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    const fetchLocation = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        const { latitude, longitude } = response.data;
        fetchWeather(latitude, longitude);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchLocation();
  }, [language]);

  if (loading) {
    return (
      <Card
        title="Current Weather"
        bordered={false}
        style={{ minHeight: "200px" }}
      >
        <Spin tip="Loading weather data..." />
      </Card>
    );
  }

  if (error) {
    return (
      <Card
        title="Current Weather"
        bordered={false}
        style={{ minHeight: "200px" }}
      >
        <Alert
          message="Weather"
          description="Can't access current weather. Check your network and refresh the page"
          type="warning"
          showIcon
        />
      </Card>
    );
  }

  return (
    <Card
      bordered={false}
      dir="left"
      style={{ minHeight: "200px", width: '100%' }}
    >
      <img src={weatherIcon} alt="weather" style={{
        width: '80px'
      }} />
      <p>{`Location: ${weather.location.name}`}</p>
      <p>{`Temperature: ${weather.current.temp_c}°C`}</p>
      <p>{`Condition: ${weather.current.condition.text}`}</p>
    </Card>
  );
};

export default WeatherWidget;
