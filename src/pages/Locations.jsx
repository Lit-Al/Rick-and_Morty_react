import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import "../styles/App.css";
import { API_URL, URL_LOCATION } from "../API/api";
import Input from "../components/UI/Input";
import CardsList from "../components/CardsList";
import GetResultsApi from "../utils/GetDataApi";
import LocationCard from "../components/LocationCard";
import Image from "../img/pages/locations.png"


function Locations() {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState('');
  useEffect(() => {
    async function fetchCards() {
      const response = await GetResultsApi.getAll(API_URL + URL_LOCATION, page);
      if (!maxPage) setMaxPage(response.info.pages)
      setCards((cards) => [...cards, ...response.results]);
    }
    fetchCards(page);
  }, [page]);

  const [searchQuery, setSearchQuery] = useState('')

  const searchedCards = useMemo(() => {
    return cards.filter(card => card.name.toLowerCase().includes(searchQuery))
  }, [searchQuery, cards])


  return (
    <>
      <Header />
      <div className="container">
        <img className="center category-image" src={Image} alt="Locations" width='326' height='202'/>
        <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder={"Filter by name..."} />
        <CardsList>
          {searchedCards.map((card) => (
            <LocationCard card={card} key={card.id} />
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

export default Locations;
