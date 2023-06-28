import React, { useEffect, useState } from "react";
import "../styles/App.css";
import { useParams, useNavigate } from "react-router-dom";
import GetResultsApi from "../utils/GetDataApi";
import { API_URL, URL_CHARACTER } from "../API/api";
import Header from "../components/Header";

function CharacterPage() {
  const [isCardLoading, setIsCardLoading] = useState(false);
  const [isEpisodeLoading, setIsEpisodeLoading] = useState(false);

  const params = useParams();
  const [card, setCard] = useState({});
  const [episode, setEpisodes] = useState([]);
  const [location, setLocation] = useState("");
  const router = useNavigate();

  useEffect(() => {
    fetchCardById(params.id);
  }, []);

  const fetchCardById = async (id) => {
    const response = await GetResultsApi.getById(API_URL + URL_CHARACTER, id);
    setCard(response);
    setIsEpisodeLoading(true);
    setIsCardLoading(true);
  };

  const fetchEpisode = async (url) => {
    const response = await GetResultsApi.getById(url, "");
    setEpisodes((prevArray) => [...prevArray, response]);
  };

  const fetchLocation = async (url) => {
    const response = await GetResultsApi.getById(url, "");
    setLocation(response);
  };

  if (isEpisodeLoading) {
    fetchLocation(card.location.url);
    setIsEpisodeLoading(false);
  }

  if (isEpisodeLoading) {
    for (let i = 0; i < card.episode.length; i++) {
      fetchEpisode(card.episode[i]);
    }
    setIsEpisodeLoading(false);
  }

  return (
    <>
      <Header />
      {isCardLoading ? (
        <div className="container">
          <button className="go-back-btn" onClick={() => router(-1)}>
            
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
                fill="black"
              />
            </svg>
            GO BACK
          </button>
          <img
            className="character-page-img"
            src={card.image}
            alt={card.name}
          />
          <h1 className="character-page-name">{card.name}</h1>
          <div className="character-details">
            <section className="details-column">
              <p className="column-name">Informations</p>
              <ul className="details-list">
                <li className="details-item">
                  Gender
                  <span className="character-status">{card.gender}</span>
                </li>
                <li className="details-item">
                  Status
                  <span className="character-status">{card.status}</span>
                </li>
                <li className="details-item">
                  Specie
                  <span className="character-status">{card.species}</span>
                </li>
                <li className="details-item">
                  Origin
                  <span className="character-status">{card.origin.name}</span>
                </li>
                <li className="details-item">
                  Type
                  <span className="character-status">
                    {card.type ? card.type : "Unknown"}
                  </span>
                </li>
                <li className="details-item">
                  <button onClick={() => router(`/locations/${location.id}`)}>
                    Location
                    <span className="character-status">
                      {card.location.name}
                    </span>
                  </button>
                </li>
              </ul>
            </section>
            <section className="details-column">
              <p className="column-name">Episodes</p>
              <ul className="details-list details-list_episodes">
                {episode.map((card) => (
                  <li className="details-item" key={card.id}>
                    <button onClick={() => router(`/episodes/${card.id}`)}>
                      <h1 className="episodes-name">{card.episode}</h1>
                      <p className="episodes-date">{card.name}</p>
                      <p className="episodes-code">{card.air_date}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default CharacterPage;
