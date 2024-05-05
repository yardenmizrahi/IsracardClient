import React, { useState, useEffect } from 'react';
import CardList from './components/cardList';
import SearchBar from './components/searchBar';

const App = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    // Fetch mock data from API
    fetch('http://localhost:5244/api/Card')
      .then((response) => response.json())
      .then((data) => {
        setCards(data);
        setFilteredCards(data); // Initially set filteredCards to all cards
      })
      .catch((error) => console.error('Error fetching cards:', error));
  }, []);

  const handleSearch = (filters) => {
    // Filter cards based on search criteria
    const filtered = cards.filter((card) => {
      if (!card) return false; // Skip if card is undefined
  
      // Convert filter values to lowercase for case-insensitive comparison
      const blockedFilter = filters.blocked.toLowerCase();
      const cardNumberFilter = filters.cardNumber.toLowerCase();
      const bankFilter = filters.bank.toLowerCase();
  
      // Check if the card matches the filter criteria
      return (
        (blockedFilter === '' || (card.isBlocked !== undefined && card.isBlocked.toString().toLowerCase() === blockedFilter)) &&
        (cardNumberFilter === '' || (card.cardNumber !== undefined && card.cardNumber.toLowerCase().includes(cardNumberFilter))) &&
        (bankFilter === '' || (card.bankCode !== undefined && card.bankCode.toLowerCase().includes(bankFilter)))
      );
    });
    setFilteredCards(filtered);
  };
  
  

  const handleCardSelect = (selectedCard) => {
    // Implement functionality to display card details or enlarge frame
    console.log('Selected Card:', selectedCard);
  };

  return (
    <div className="app">
      <h1>Card Management System</h1>
      <SearchBar onSearch={handleSearch} />
      <CardList cards={filteredCards} onCardSelect={handleCardSelect} />
    </div>
  );
};

export default App;
