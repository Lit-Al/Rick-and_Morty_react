import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import "../styles/App.css";
import { API_URL, URL_CHARACTER } from "../API/api";
import Input from "../components/UI/Input";
import CharacterCard from "../components/CharacterCard";
import CardsList from "../components/CardsList";
import GetResultsApi from "../utils/GetDataApi";
import Image from "../img/pages/characters.png"
import { useFetching } from "../hooks/useFetching";

function Characters() {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState('');

  const [fetchCards, isCardsLoading] = useFetching(async () => {
    const response = await GetResultsApi.getAll(API_URL + URL_CHARACTER, page);
    if (!maxPage) setMaxPage(response.info.pages)
    setCards((cards) => [...cards, ...response.results]);
  })

  useEffect(() => {
    fetchCards(page);
  }, [page]);

  const [searchQuery, setSearchQuery] = useState('')

  const searchedCards = useMemo(() => {
    return cards.filter(card => card.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, cards])
  return (
    <div className="App">
      <Header />
      <div className="container">
        <img className="center category-image_characters" src={Image} alt="Characters" width='600' height='200'/>
        <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder={"Filter by name..."} />
        {
          isCardsLoading 
                ? <CardsList>
                {searchedCards.map((card) => (
                  <CharacterCard card={card} key={card.id} />
                ))}
              </CardsList>
                : null
        }
        <button disabled={maxPage === 1 ? true : false} className="more-cards-btn" onClick={() => {
          setPage(page + 1)
          setMaxPage(maxPage - 1)
        }
          }>LOAD MORE</button>
      </div>
    </div>
  );
}

export default Characters;
