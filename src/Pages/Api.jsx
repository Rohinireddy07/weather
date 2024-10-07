import React, { useState } from 'react';

const Api = () => {
    const data = {
        key: "4fa3a3054124c230147993d949f086d8",
        url: "https://api.openweathermap.org/data/2.5/weather"
    };
    
   let [value, setValue] = useState('');
    let [weather, setWeather] = useState(null);
    let [error, setError] = useState("");
    let [loading, setLoading] = useState(false);

   let searchWeather = () => {
        setLoading(true);
        setError("");
        setWeather(null);
        
        fetch(`${data.url}?q=${value}&appid=${data.key}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                setWeather(data);
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    let handleKeyUp = (e) => {
        if (e.key === "Enter") {
            searchWeather();
        }
    };

    return (
        <div>
            <section>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyUp={handleKeyUp}
                />
                <button onClick={searchWeather}>Search</button>
            </section>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {weather && weather.main ? (
                <>
                    <p>{weather.name}</p>
                    <p>{weather.main.temp}°C</p>
                </>
            ) : (!error && !loading)}
        </div>
    );
};

export default Api;