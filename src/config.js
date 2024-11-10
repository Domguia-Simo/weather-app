// The need of geocoding the location name into its coordinates, latitude and longitude
// endpoint for geocoding : http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// After obtaining the api key and the location coordinates:
// endpoint to get the weather : https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// Diretly getting the weather with the location name without passing through the coordinates
// API endpoint : https://api.openweathermap.org/data/2.5/weather?q={location}&appid={api key}&units={unit} 
const BASEURL = "https://api.openweathermap.org"
const WEATHER_API_KEY = "d6345998377e1455ea6e1d0c5941035a"

export {BASEURL ,WEATHER_API_KEY}

