
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async () => {
    const API_KEY = 'e55be00f9ada24e30fcbd080a5078a6a';
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please enable location services to get weather information.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
      Alert.alert('Weather Error', 'Failed to load weather data.');
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return { weatherData, fetchWeather };
};

export default useWeather;