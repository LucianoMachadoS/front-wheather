import { format } from "date-fns";
import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import "./WheatherCard.css";
import type { Weather } from "../../models/WeatherModel";
import { api } from "../../lib/axios";
import { getLargeIcon, getWeatherTheme } from "../../lib/weatherTheme";

interface WeatherCardProps {
    weather: Weather;
    refreshCard: (cityName: string) => void;
}

export default function WeatherCard({weather, refreshCard}: WeatherCardProps){
    const [isFavorited, setIsFavorited] = useState(weather.isFavorite);

    async function toggleFavorite() {
        console.log(weather)
        // TODO: VERIFICAR SE A CIDADE É FAVORITA, SE FOR,
        // CHAMAR A API PARA REMOVER CIDADE DOS FAVORITOS
        // SENÃO, ADICIONAR CIDADE AOS FAVORITOS
        if(isFavorited){
            await api.delete(`/favoritecity/${weather.favoriteCityId}`)
        }else {
            await api.post("/favoritecity", {
                "name" : weather.location.name
            })
        }
        // TODO: TROCAR O VALOR DE ISFAVORITED
        
        setIsFavorited(!isFavorited)
        // TODO: CHAMAR RESFRESHCARD COM O NOME DA CIDADE
        refreshCard(weather.location.name)
    }
    const theme = getWeatherTheme(weather.current.condition.code, weather.current.is_day)

    return (
        <div
            className="card"
            style={{
                background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})`,
                color: theme.textColor,
            }}
        >
            <div className="favorite-icon" onClick={toggleFavorite}>
                {isFavorited ? <FaStar color="gold" /> : <FaRegStar color={theme.textColor} />}
            </div>
            <div className="cardContent">
                <h2>Clima em {weather.location.name}</h2>
                <p>País: {weather.location.country}</p>
                <p>Temperatura: {weather.current.temp_c.toFixed(0)}°C</p>
                <p>Condição: {weather.current.condition.text}</p>
                <p>Ultima Atualização: {format(weather.current.last_updated, "dd-MM-yyyy HH:mm")} </p>
            </div>

            <img className="weatherIcon" src={getLargeIcon(weather.current.condition.icon)} alt={weather.current.condition.text} />
        </div>
    )

}