import React from "react";
import "../styles/App.css";
import { useNavigate } from "react-router-dom"

function CharacterCard(props) {

  const router = useNavigate()
  
  if (props.card.type === "") props.card.type = "Unknown";
  return (
    <li className="character-card">
      <button className="card-button" onClick={() => router(`/characters/${props.card.id}`)}>
        <img
          className="character-img"
          src={props.card.image}
          alt={props.card.name}
        />
        <h2 className="character-name">{props.card.name}</h2>
        <p className="character-type">{props.card.type}</p>
      </button>
    </li>
  );
}

export default CharacterCard;
