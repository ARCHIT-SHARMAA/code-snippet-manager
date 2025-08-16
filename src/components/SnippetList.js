    // src/components/SnippetList.js
    import React from 'react';

    // SnippetList component receives 'snippets' and 'onDelete' as props
    function SnippetList({ snippets, onDelete }) {
      return (
        <div className="snippet-list-container">
          <h2 className="snippet-list-title">Your Code Snippets</h2>
          {snippets.length === 0 ? (
            <p className="no-snippets-message">No snippets added yet. Add some above!</p>
          ) : (
            <ul className="snippet-list">
              {/* Map over the snippets array to render each snippet */}
              {snippets.map(snippet => (
                <li key={snippet.id} className="snippet-item">
                  <div className="snippet-header">
                    <h3 className="snippet-name">{snippet.name}</h3>
                    <button
                      className="delete-button"
                      onClick={() => onDelete(snippet.id)} // Call onDelete when button is clicked
                    >
                      Delete
                    </button>
                  </div>
                  <pre className="snippet-code"><code>{snippet.code}</code></pre>
                  <p className="snippet-description">{snippet.description}</p>
                  <div className="snippet-tags">
                    {snippet.tags && snippet.tags.length > 0 && (
                      snippet.tags.map(tag => (
                        <span key={tag} className="snippet-tag">{tag}</span>
                      ))
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    export default SnippetList;
    