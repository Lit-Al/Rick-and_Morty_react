import React from "react";
import "../styles/App.css"

function CardsList(props) {
  return (
    <ul className="cards-list">
       {props.children}
    </ul>
  )
}

export default CardsList;
