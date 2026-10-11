import { useEffect, useState } from "react"
import axios from "axios"
import Header from "../../components/Header/Header"
import "./WeatherPage.css"
import type { Weather } from "../../models/WeatherModel"
import { api } from "../../lib/axios"
import type { FavoriteCity } from "../../models/FavoriteCity"
import WeatherCard from "../../components/WheaterCard/WheatherCard"

export default function WeatherPage() {
    const [favoriteCitiesData, setfavoriteCitiesData] = useState<Weather[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cityToSearch, setCityToSearch] = useState<string>("");
    const [cityWeatherData, setCityWeatherData] = useState<Weather>();
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        getFavoriteCities()
    }, [])

    async function getFavoriteCities() {
        setfavoriteCitiesData([]);
        setErrorMessage("")
        setIsLoading(true)

        try {
            const response = await api.get<FavoriteCity[]>("/favoritecity")

            // Busca o clima de todas as favoritas e só termina o carregamento quando todas chegarem
            const results = await Promise.allSettled(
                response.data.map((item) => getWeatherByCity(item.name))
            )

            const weathers = results
                .filter((result) => result.status === "fulfilled")
                .map((result) => (result as PromiseFulfilledResult<Weather>).value)
                .sort((a, b) => a.location.name.localeCompare(b.location.name))

            setfavoriteCitiesData(weathers)
        } catch (error) {
            console.error(error)
            setErrorMessage("Não foi possível conectar à API. Tente novamente em alguns segundos.")
        } finally {
            setIsLoading(false)
        }
    }

    async function getWeatherByCity(cityName: string) {
        const response = await api.get<Weather>("/weather/" + encodeURIComponent(cityName))

        return response.data;
    }

    async function onSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setErrorMessage("")

        try {
            const responseWeather = await getWeatherByCity(cityToSearch);
            setCityWeatherData(responseWeather);
        } catch (error) {
            console.error(error)
            setCityWeatherData(undefined)
            setErrorMessage(
                axios.isAxiosError(error) && error.response?.status === 404
                    ? "Cidade não encontrada."
                    : "Não foi possível buscar o clima. Tente novamente."
            )
        }

        setCityToSearch("");
    }

    async function refreshCardSearch() {
        getFavoriteCities()
        setCityWeatherData(undefined)
    }

    return (
        <div className="container">
            <Header />

            <form action="#" className="formSearch" onSubmit={onSubmitSearch}>
                <input type="text" className="inputSearch" value={cityToSearch} onChange={(e =>
                    setCityToSearch(e.target.value))} placeholder="Digite o nome da cidade" />
                <button className="buttonSearch" type="submit">Buscar</button>
            </form>

            {errorMessage && <p className="errorMessage">{errorMessage}</p>}

            {cityWeatherData &&<WeatherCard weather={cityWeatherData} refreshCard={refreshCardSearch} />}

            <h2 className="favoriteCitiesTitle">Cidades Favoritas</h2>

            <div className="favoriteCities">
                {isLoading ? <p>Carregando cidades favoritas...</p> :
                    favoriteCitiesData.length == 0 ? <p>Nenhuma cidade favorita encontrada.</p> :
                        favoriteCitiesData.map((item) => <WeatherCard key={item.location.name} weather={item} refreshCard={getFavoriteCities} />)
                }
            </div>
        </div>
    )
}