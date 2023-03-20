import React, { useState } from 'react';
import './form.css';

function Form() {
  const [results, setResults] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();

    const websiteUrl = event.target.elements['website-url'].value;
    const searchText = event.target.elements['search-text'].value;

    setResults([{ count: 0, html: `Searching for "${searchText}" in ${websiteUrl}...` }]);

    try {
      const occurrences = await findOccurrences(websiteUrl, searchText);
      const count = occurrences.reduce((total, occurrence) => total + occurrence.count, 0);

      if (count === 0) {
        setResults([{ count: 0, html: `No occurrences of "${searchText}" found on ${websiteUrl}.` }]);
      } else {
        setResults(occurrences);
      }
    } catch (error) {
      setResults([{ count: 0, html: `Error searching for "${searchText}" on ${websiteUrl}: ${error.message}` }]);
    }
  }

  async function findOccurrences(websiteUrl, searchText) {
    const response = await fetch(websiteUrl);
    const body = await response.text();
    const regex = new RegExp(`(>[^<]*?)(${searchText})([^>]*?<)`, 'gi');
    const matches = body.match(regex) || [];
    const occurrences = [];

    for (const match of matches) {
      const count = (match.match(new RegExp(searchText, 'gi')) || []).length;
      const html = match.replace(new RegExp(`(${searchText})`, 'gi'), '<mark>$1</mark>');
      occurrences.push({ count, html });
    }

    return occurrences;
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
      <SearchResult results={results} />
    </div>
  );
}

function SearchResult({ results }) {
  return (
    <div className="search-results">
      {results.map((occurrence) => (
        <div className="search-result">
          <span>Found {occurrence.count} occurrence(s) in the following tag:</span>
          <pre dangerouslySetInnerHTML={{ __html: occurrence.html }}></pre>
        </div>
      ))}
    </div>
  );
}

export default Form;
