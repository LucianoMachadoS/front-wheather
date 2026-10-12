// Códigos de condição da WeatherAPI: https://www.weatherapi.com/docs/weather_conditions.json
const CLOUDY = [1003, 1006, 1009]
const FOG = [1030, 1135, 1147]
const THUNDER = [1087, 1273, 1276, 1279, 1282]
const SNOW = [1066, 1069, 1072, 1114, 1117, 1168, 1171, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264]

export interface WeatherTheme {
    colors: [string, string]
    textColor: string
}

const themes = {
    clearDay: { colors: ["#FFE29A", "#8FD3FE"], textColor: "#10243E" },
    clearNight: { colors: ["#2C3E70", "#0F1A36"], textColor: "#FFFFFF" },
    cloudyDay: { colors: ["#E3EAF2", "#AFC0D6"], textColor: "#1F2A37" },
    cloudyNight: { colors: ["#3E4A5C", "#1E2633"], textColor: "#FFFFFF" },
    fogDay: { colors: ["#ECEFF1", "#C3CAD1"], textColor: "#263238" },
    rainDay: { colors: ["#5B7A99", "#2F4A66"], textColor: "#FFFFFF" },
    rainNight: { colors: ["#2E4057", "#141E2B"], textColor: "#FFFFFF" },
    snowDay: { colors: ["#F5FAFF", "#CFE3F5"], textColor: "#1C2B3A" },
    snowNight: { colors: ["#5A6B85", "#2B3547"], textColor: "#FFFFFF" },
    thunder: { colors: ["#4B3F72", "#1F1A38"], textColor: "#FFFFFF" },
} satisfies Record<string, WeatherTheme>

export function getWeatherTheme(code: number, isDay: number): WeatherTheme {
    const day = isDay === 1

    if (code === 1000) return day ? themes.clearDay : themes.clearNight
    if (CLOUDY.includes(code)) return day ? themes.cloudyDay : themes.cloudyNight
    if (FOG.includes(code)) return day ? themes.fogDay : themes.cloudyNight
    if (THUNDER.includes(code)) return themes.thunder
    if (SNOW.includes(code)) return day ? themes.snowDay : themes.snowNight

    // Demais códigos são chuva, garoa ou granizo
    return day ? themes.rainDay : themes.rainNight
}

// A WeatherAPI devolve "//cdn.weatherapi.com/weather/64x64/..."; usa a versão 128x128, mais nítida
export function getLargeIcon(icon: string): string {
    return `https:${icon}`.replace("64x64", "128x128")
}
