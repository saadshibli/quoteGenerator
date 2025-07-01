import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchQuote = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://stoic-quotes.com/api/quote');
            const data = await response.json();
            setQuote(data.text);
            setAuthor(data.author);
        } catch(err) {
            setQuote("Oops! Couldn't fetch a quote. Try again.");
            setAuthor('');
        }
        setLoading(false);
    };

    const copyToClipboard = () => {
        const textToCopy = `"${quote}" — ${author}`;
        navigator.clipboard.writeText(textToCopy)
            .then(() => alert('Quote copied to clipboard!'))
            .catch(err => {
                console.error('Failed to copy:', err);
                alert('Failed to copy quote to clipboard');
            });
    };

    const shareOnTwitter = () => {
        const tweetText = encodeURIComponent(`"${quote}" — ${author}`);
        const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
        window.open(twitterUrl, '_blank');
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div className="App">
            <div className="quote-container">
                <h1>Random Quote Generator</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <blockquote className="quote">"{quote}"</blockquote>
                        {author && <p className="author">— {author}</p>}
                    </>
                )}
                <button 
                    className="new-quote-btn" onClick={fetchQuote} disabled={loading}>
                    {loading ? 'Loading...' : 'New Quote'}
                </button>
                <button 
                    className="clipboard-btn"
                    onClick={copyToClipboard}
                    disabled={!quote}
                >
                    Copy to Clipboard
                </button>
                
                <button 
                    className="twitter-btn"
                    onClick={shareOnTwitter}
                    disabled={!quote}
                >
                    Share on Twitter
                </button>
            </div>
        </div>
    );
}

export default App;