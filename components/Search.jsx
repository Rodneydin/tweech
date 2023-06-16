import React, { useState } from 'react';

const SearchComponent = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchTerm);
    setSearchTerm('');
  };

  return (
    <div className='m-3 bg-black/10'>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchTerm} onChange={handleChange} placeholder="Search..." />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchComponent;
