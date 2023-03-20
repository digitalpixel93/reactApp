import React, { useState } from 'react';
import './form.css';

function Form() {
  const [searchResult, setSearchResult] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    const websiteUrl = event.target.elements['website-url'].value; // Get the website URL from the form
    const searchText = event.target.elements['search-text'].value; // Get the search text from the form
  
    setSearchResult(`Searching for "${searchText}" in ${websiteUrl}...`); // Set the search result to indicate that the search is starting
  
    try {
      const response = await fetch(websiteUrl); // Make a request to the website
      const body = await response.text(); // Get the body of the response as text
  
      // Count the occurrences of the search text in the body
      const count = (body.match(new RegExp(searchText, 'gi')) || []).length;
  
      setSearchResult(`Found ${count} occurrences of "${searchText}" on ${websiteUrl}.`); // Set the search result to show the number of occurrences found
    } catch (error) {
      setSearchResult(`Error searching for "${searchText}" on ${websiteUrl}: ${error.message}`); // Set the search result to show the error message if there's an error
    }
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="website-url">Website URL:</label>
          <input type="url" id="website-url" name="website-url" placeholder="Enter website URL" />
        </div>
        <div>
          <label htmlFor="search-text">Search Text:</label>
          <input type="text" id="search-text" name="search-text" placeholder="Enter search text" />
        </div>
        <button type="submit">Submit</button>
      </form>
      <SearchResult result={searchResult} />
    </div>
  );
}

function SearchResult({ result }) {
  return <div className="search-result">{result}</div>;
}

export default Form;
