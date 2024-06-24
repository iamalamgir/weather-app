import React, { useState } from "react";
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/weather-clear.png';
// import cloud_icon from '../assets/weather-cloud.png';
// import drizzle_icon from '../assets/drizzle-weather.webp';
// import rain_icon from '../assets/weather-forecast.webp';
// import snow_icon from '../assets/weather-snow.webp';
import wind_icon from '../assets/wind.webp';
import humidity_icon from '../assets/weather-waves.png';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherInfo, setWeatherInfo] = useState(null);

    function getWeather() {
        const apiKey = "03402c448b5faddca5f2cdd738e74e80";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                let MT = Math.round(data.main.temp);
                let FL = Math.round(data.main.feels_like);

                const weather = {
                    location: `Weather in ${data.name}`,
                    temperature: `Temperature: ${MT} C`,
                    feelsLike: `Feels Like: ${FL} C`,
                    humidity: `Humidity: ${data.main.humidity} %`,
                    wind: `Wind: ${data.wind.speed} km/h`,
                    condition: `Weather Condition: ${data.weather[0].description}`,
                };

                setWeatherInfo(weather);
            })

            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="weather">
            <div className="search-bar">
                <input 
                    type="text"
                    placeholder="Search"
                    value={city}
                    onChange={(e)=>setCity(e.target.value)}
                />
                <img src={search_icon} onClick={getWeather} alt="" />
            </div>

            {weatherInfo && (
                <div className="weather-info">
                    <h3>{weatherInfo.location}</h3>
                    <p>{weatherInfo.temperature}</p>
                    <p>{weatherInfo.feelsLike}</p>
                    <p>{weatherInfo.humidity}</p>
                    <p>{weatherInfo.wind}</p>
                    <p>{weatherInfo.condition}</p>
                </div>
            )}

            <img src={clear_icon} alt="" className="weather-icon" />
            <p className="temperature">30&deg;C</p>
            <p className="location">Bangladesh</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>81 %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>5.03 Km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather;
