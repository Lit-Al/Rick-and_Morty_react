import React, { useEffect, useState } from "react";
import "../styles/App.css";
import { useParams, useNavigate } from "react-router-dom";
import GetResultsApi from "../utils/GetDataApi";
import { API_URL, URL_EPISODE } from "../API/api";
import Header from "../components/Header";
import CharacterCard from "../components/CharacterCard";
import CardsList from "../components/CardsList";

function EpisodePage() {
  const params = useParams();
  const [card, setCard] = useState({});
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useNavigate();

  const fetchPostById = async (id) => {
    const response = await GetResultsApi.getById(API_URL + URL_EPISODE, id);
    setCard(response);
    setIsLoading(true);
  };
  useEffect(() => {
    fetchPostById(params.id);
  }, []);

  const fetchCharacters = async (url) => {
    const response = await GetResultsApi.getById(url, "");
    setCharacters((prevArray) => [...prevArray, response]);
  };

  if (isLoading) {
    for (let i = 0; i < card.characters.length; i++) {
      fetchCharacters(card.characters[i]);
    }
    setIsLoading(false);
  }

  return (
    <>
      <Header />
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
        <h1 className="details-title">{card.name}</h1>
        <ul className="episode-info">
          <li>
            Episode
            <span>{card.episode}</span>
          </li>
          <li>
            Date
            <span>{card.air_date}</span>
          </li>
        </ul>
        <div className="cast">
          <h2>Cast</h2>
          <CardsList>
                {characters.map((card) => (
                  <CharacterCard card={card} key={card.id} />
                ))}
              </CardsList>
        </div>
      </div>
    </>
  );
}

export default EpisodePage;
