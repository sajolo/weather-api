document.addEventListener('DOMContentLoaded', () => {
    fetchCurrentWeather();
    fetchWeatherForecast();
});

function fetchCurrentWeather() {
    fetch('/weather/current')
        .then(response => response.json())
        .then(data => {
            const weatherHTML = `
                <p>Temperatura: ${data.main.temp} °C</p>
                <p>Viento: ${data.wind.speed} km/h</p>
                <p>Humedad: ${data.main.humidity}%</p>
            `;
            document.getElementById('currentWeather').innerHTML = weatherHTML;
        })
        .catch(error => console.error('Error:', error));
}

function fetchWeatherForecast() {
    fetch('/weather/forecast')
        .then(response => response.json())
        .then(data => {
            const forecastHTML = data.list.slice(0, 5).map(item => {
                // Determinar la clase según la temperatura
                let tempClass = '';
                if (item.main.temp < 14) {
                    tempClass = 'temp-cold';
                } else if (item.main.temp >= 14 && item.main.temp < 17) {
                    tempClass = 'temp-mild';
                } else if (item.main.temp >= 17) {
                    tempClass = 'temp-warm';
                }
                
                // Retornar el HTML con la clase de temperatura correspondiente
                return `
                    <div class="forecast-item ${tempClass}">
                        <p><strong>${new Date(item.dt_txt).toLocaleTimeString()}</strong>: ${item.main.temp} °C, ${item.weather[0].description}</p>
                    </div>
                `;
            }).join('');
            document.getElementById('forecast').innerHTML = forecastHTML;
        })
        .catch(error => console.error('Error:', error));
}

