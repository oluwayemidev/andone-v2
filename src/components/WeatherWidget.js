import React, { useState, useEffect } from 'react';
import { Card, Spin, Alert } from 'antd';
import axios from 'axios';
import translateText from '../translationService'; // Import your translation service

const WeatherWidget = ({ language }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
          params: {
            key: '2a999d97479d4eb5a96180453241705',
            q: `${lat},${lon}`, // query for the weather based on latitude and longitude
          },
        });
        const translatedLocation = await translateText(response.data.location.name, language);
        const translatedCondition = await translateText(response.data.current.condition.text, language);
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

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            fetchWeather(position.coords.latitude, position.coords.longitude);
          },
          error => {
            setError(error);
            setLoading(false);
          }
        );
      } else {
        setError(new Error('Geolocation is not supported by this browser.'));
        setLoading(false);
      }
    };

    getLocation();
  }, [language]);

  if (loading) {
    return <Spin tip="Loading weather data..." />;
  }

  if (error) {
    return <Alert message="Error" description="Failed to fetch weather data." type="error" showIcon />;
  }

  return (
    <Card title="Current Weather" bordered={false} style={{ }}>
      <p>{`Location: ${weather.location.name}`}</p>
      <p>{`Temperature: ${weather.current.temp_c}°C`}</p>
      <p>{`Condition: ${weather.current.condition.text}`}</p>
    </Card>
  );
};

export default WeatherWidget;
