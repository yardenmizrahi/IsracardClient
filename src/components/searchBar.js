import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchFilters, setSearchFilters] = useState({
    blocked: '',
    cardNumber: '',
    bank: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search Filters:", searchFilters); // Log the search filters
  
    // Pass a callback function to ensure that you're working with the latest state
    setSearchFilters((prevFilters) => {
      onSearch(prevFilters);
      return prevFilters;
    });
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <select
        name="blocked"
        value={searchFilters.blocked}
        onChange={handleChange}
      >
        <option value="">Select Blocked/Unblocked</option>
        <option value="true">Blocked</option>
        <option value="false">Unblocked</option>
      </select>
      <input
        type="text"
        name="cardNumber"
        placeholder="Card Number"
        value={searchFilters.cardNumber}
        onChange={handleChange}
      />
      <input
        type="text"
        name="bank"
        placeholder="Bank"
        value={searchFilters.bank}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
