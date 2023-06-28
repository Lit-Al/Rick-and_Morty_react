import React from "react";
import "../styles/App.css"
import { useNavigate } from "react-router-dom"

function LocationCard(props) {

  const router = useNavigate()

  return (
    <li className="episode-card">
       <button className="card-button card-button_episode" onClick={() => router(`/locations/${props.card.id}`)}>
          <h1 className="location-name episode-name">{props.card.name}</h1>
          <p className="location-type episode-date">{props.card.type}</p>
        </button>
    </li>
  )
}

export default LocationCard;
