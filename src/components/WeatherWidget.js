
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

const WeatherWidget = ({ weatherData, isDarkMode }) => {
  if (!weatherData || !weatherData.main) return null;

  const getWeatherIcon = (iconCode) => {
    if (!iconCode) return null;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    return <Image source={{ uri: iconUrl }} style={styles.weatherIcon} />;
  };

  return (
    <View style={[styles.weatherCard, isDarkMode && styles.darkCard]}>
      <Text style={[styles.cardTitle, isDarkMode && styles.darkText]}>Weather in {weatherData.name}</Text>
      <View style={styles.weatherContent}>
        {getWeatherIcon(weatherData.weather[0].icon)}
        <Text style={[styles.weatherText, isDarkMode && styles.darkText]}>{weatherData.main.temp}°C</Text>
        <Text style={[styles.weatherDescription, isDarkMode && styles.darkText]}>
          {weatherData.weather[0].description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: colors.darkBackground,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  weatherContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  weatherText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  weatherDescription: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  darkText: {
    color: colors.darkText,
  },
});

export default WeatherWidget;