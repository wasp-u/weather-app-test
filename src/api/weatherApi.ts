const APIKey = 'c99a9a174eb112e392aabbe68bd009dd'

export const weatherApi = {
    async getWeatherByCityName(cityName: string) {
        return await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric`
        )
    },
    async getForecastWeather(cityName: string) {
        return await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&cnt=12&units=metric`
        )
    },
}
