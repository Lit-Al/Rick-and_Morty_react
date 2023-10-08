import { URL_EPISODE } from "../API/api";
import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import "../styles/App.css";
import { API_URL } from "../API/api";
import Input from "../components/UI/Input";
import CardsList from "../components/CardsList";
import GetResultsApi from "../utils/GetDataApi";
import EpisodeCard from "../components/EpisodeCard";
import Image from "../img/pages/episodes.png"

function Episodes() {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState('');
  useEffect(() => {
    async function fetchCards() {
      const response = await GetResultsApi.getAll(API_URL + URL_EPISODE, page);
      if (!maxPage) setMaxPage(response.info.pages)
      setCards((cards) => [...cards, ...response.results]);
    }
    fetchCards();
  }, [page]);

  const [searchQuery, setSearchQuery] = useState('')

  const searchedCards = useMemo(() => {
    return cards.filter(card => card.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, cards])

  return (
    <>
      <Header />
      <div className="container">
        <img className="center category-image" src={Image} alt="Episodes" width="269" height="210"/>
        <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder={"Filter by name..."} />
         <CardsList>
          {searchedCards.map((card) => (
            <EpisodeCard card={card} key={card.id} />
          ))}
        </CardsList>
        <button disabled={maxPage === 1 ? true : false} className="more-cards-btn" onClick={() => {
          setPage(page + 1)
          setMaxPage(maxPage - 1)
        }
          }>LOAD MORE</button>
      </div>
    </>
  )
}

export default Episodes;
