import React from "react";
import "../styles/App.css"
import { useNavigate } from "react-router-dom"

function EpisodeCard(props) {
  
  const router = useNavigate()

  return (
    <li className="episode-card">
       <button className="card-button card-button_episode" onClick={() => router(`/episodes/${props.card.id}`)}>
          <h1 className="episode-name">{props.card.name}</h1>
          <p className="episode-date">{props.card.air_date}</p>
          <p className="episode-code">{props.card.episode}</p>
        </button>
    </li>
  )
}

export default EpisodeCard;
