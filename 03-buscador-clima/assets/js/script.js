// 1. Mapeamento de elementos do DOM
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherCard = document.getElementById('weatherCard');
const errorContainer = document.getElementById('errorContainer');
const errorMessage = document.getElementById('errorMessage');

// Elementos da Interface
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weatherIcon');
const weatherDescription = document.getElementById('weatherDescription');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

// 2. Função assíncrona para buscar os dados do clima (Usando API pública sem chave)
async function checkWeather(city) {
    try {
        // Passo A: Traduzir o nome da cidade em Coordenadas (Latitude e Longitude)
        // Adicionamos a busca em português e priorizamos resultados locais
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=pt`;
        const geoResponse = await fetch(geoUrl);
        
        if (!geoResponse.ok) throw new Error("Erro ao buscar coordenadas.");
        
        const geoData = await geoResponse.json();
        
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("Cidade não encontrada. Verifique a grafia e tente novamente!");
        }
        
        // Tentamos encontrar o primeiro resultado que seja do Brasil (BR), senão pega o primeiro da lista
        let selectedLocation = geoData.results.find(loc => loc.country_code === 'BR') || geoData.results[0];
        
        const { latitude, longitude, name, admin1, country } = selectedLocation;

        // Passo B: Buscar o clima real usando as coordenadas encontradas
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;
        const weatherResponse = await fetch(weatherUrl);
        
        if (!weatherResponse.ok) throw new Error("Erro ao buscar dados meteorológicos.");
        
        const weatherData = await weatherResponse.json();
        
        // Exibe os dados de depuração no console
        console.log("Localização selecionada:", selectedLocation);
        console.log("Dados do Clima recebidos:", weatherData);

        // Organiza os dados para renderizar na tela, incluindo o Estado (admin1)
        displayWeatherData({
            name: name,
            state: admin1 || "", // Captura o Estado (ex: Rio Grande do Sul)
            country: country || "", // Captura o País (ex: Brasil)
            temp: weatherData.current.temperature_2m,
            humidity: weatherData.current.relative_humidity_2m,
            wind: weatherData.current.wind_speed_10m,
            code: weatherData.current.weather_code
        });

    } catch (error) {
        showError(error.message);
    }
}

// 3. Mapeador de códigos de clima da Open-Meteo para descrição, ícones e temas do OpenWeather
function getWeatherDetails(code) {
    // Mapeia os códigos universais da WMO (World Meteorological Organization)
    if (code === 0) {
        return { desc: "Céu Limpo", icon: "01d", theme: "Clear" };
    } else if ([1, 2, 3].includes(code)) {
        return { desc: "Parcialmente Nublado", icon: "03d", theme: "Clouds" };
    } else if ([45, 48].includes(code)) {
        return { desc: "Nevoeiro", icon: "50d", theme: "Clouds" };
    } else if ([51, 53, 55, 80, 81, 82].includes(code)) {
        return { desc: "Chuva Leve", icon: "09d", theme: "Rain" };
    } else if ([61, 63, 65].includes(code)) {
        return { desc: "Chuva Moderada", icon: "10d", theme: "Rain" };
    } else if ([71, 73, 75, 77, 85, 86].includes(code)) {
        return { desc: "Neve", icon: "13d", theme: "Snow" };
    } else if ([95, 96, 99].includes(code)) {
        return { desc: "Tempestade", icon: "11d", theme: "Thunderstorm" };
    }
    return { desc: "Instável", icon: "04d", theme: "Clouds" };
}

// 4. Função para exibir os dados na interface
function displayWeatherData(info) {
    errorContainer.style.display = 'none';

    const weatherDetails = getWeatherDetails(info.code);

    // Constrói o texto de localização de forma elegante
    let locationText = info.name;
    if (info.state) {
        locationText += `, ${info.state}`;
    }
    if (info.country) {
        locationText += ` - ${info.country}`;
    }

    cityName.textContent = locationText;
    temperature.textContent = Math.round(info.temp);
    weatherDescription.textContent = weatherDetails.desc;
    humidity.textContent = `${info.humidity}%`;
    windSpeed.textContent = `${Math.round(info.wind)} km/h`;

    // Renderiza o ícone do clima correspondente
    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherDetails.icon}@2x.png`;
    weatherIcon.alt = weatherDetails.desc;

    // Altera o tema do plano de fundo dinamicamente
    changeBackgroundTheme(weatherDetails.theme);

    // Mostra o card na tela
    weatherCard.style.display = 'block';
}

// 5. Altera o plano de fundo do body baseado no tema
function changeBackgroundTheme(theme) {
    document.body.className = '';
    
    switch (theme) {
        case 'Clear':
            document.body.classList.add('bg-sunny');
            break;
        case 'Rain':
            document.body.classList.add('bg-rainy');
            break;
        case 'Clouds':
            document.body.classList.add('bg-cloudy');
            break;
        case 'Snow':
            document.body.classList.add('bg-snowy');
            break;
        case 'Thunderstorm':
            document.body.classList.add('bg-thunderstorm');
            break;
        default:
            document.body.classList.add('bg-default');
            break;
    }
}

// 6. Trata e exibe os erros de busca
function showError(message) {
    weatherCard.style.display = 'none';
    errorMessage.textContent = message;
    errorContainer.style.display = 'block';
}

// 7. Escutadores de Eventos
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) checkWeather(city);
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) checkWeather(city);
    }
});