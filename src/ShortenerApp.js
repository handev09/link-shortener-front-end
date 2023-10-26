import React, { useState } from 'react';
import './ShortenerApp.css'; // Import the CSS file with your classes

const ShortenerApp = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleShorten = async () => {
    if (inputUrl) {
      setIsFetching(true);
  
      try {
        const response = await fetch('http://localhost:3001', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ originalUrl: inputUrl }),
        });
  
        if (response.ok) {
          const data = await response.json();
          setShortUrl(data.shortUrl);
          setIsFetching(false);
        } else {
          // Handle the error, e.g., display an error message
          console.error('URL shortening failed');
          setIsFetching(false);
        }
      } catch (error) {
        // Handle any network errors or exceptions here
        console.error('An error occurred:', error);
        setIsFetching(false);
      }
    }
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);
  };

  return (
    <div className="shortener-container">
      <h1>URL Shortener</h1>
      <div>
        <input
          type="text"
          placeholder="Paste URL here"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="shortener-input"
        />
        <button
          onClick={handleShorten}
          disabled={isFetching}
          className="shortener-button"
        >
          {isFetching ? 'Please wait...' : 'Shorten'}
        </button>
      </div>
      {isFetching && <p className="shortener-message">Please wait...</p>}
      {shortUrl && !isFetching && (
        <div>
          <p className="shortener-result">Shortened URL: {shortUrl}</p>
          <button
            onClick={handleCopyToClipboard}
            className="shortener-button"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
      {isCopied && <p className="shortener-copied">Link copied to clipboard</p>}
    </div>
  );
};

export default ShortenerApp;
