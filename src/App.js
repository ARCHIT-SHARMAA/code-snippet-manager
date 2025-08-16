import React, { useState, useEffect } from 'react';
import './App.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import EditSnippetForm from './components/EditSnippetForm';

function App() {
  const [snippets, setSnippets] = useState([]);
  const [newSnippet, setNewSnippet] = useState({
    name: '',
    description: '',
    code: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingSnippet, setEditingSnippet] = useState(null);

  const fetchSnippets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/api/snippets');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSnippets(data);
    } catch (e) {
      setError("Failed to load snippets. " + e.message);
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/snippets/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setSnippets(prevSnippets => prevSnippets.filter(snippet => snippet.id !== id));
    } catch (e) {
      setError("Failed to delete snippet. " + e.message);
      console.error("Delete error:", e);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/snippets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setEditingSnippet(null);
      fetchSnippets();
    } catch (e) {
      setError("Failed to update snippet. " + e.message);
      console.error("Update error:", e);
    }
  };

  const handleNewSnippetInputChange = (e) => {
    const { name, value } = e.target;
    setNewSnippet(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNewSnippetSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/snippets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSnippet),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const savedSnippet = await response.json();
      setSnippets(prevSnippets => [...prevSnippets, savedSnippet]);
      setNewSnippet({ name: '', description: '', code: '' });
    } catch (e) {
      setError("Failed to create snippet. " + e.message);
      console.error("Create error:", e);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  const getLanguage = (tags) => {
    if (!tags || tags.length === 0) return 'text';
    if (tags.includes('javascript')) return 'javascript';
    if (tags.includes('python')) return 'python';
    if (tags.includes('java')) return 'java';
    if (tags.includes('html')) return 'html';
    if (tags.includes('c++')) return 'cpp';
    return 'text';
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Code Snippet Manager</h1>
      </header>

      <form className="add-snippet-form" onSubmit={handleNewSnippetSubmit}>
        <input
          type="text"
          name="name"
          value={newSnippet.name}
          onChange={handleNewSnippetInputChange}
          placeholder="Snippet Name"
          required
        />
        <textarea
          name="description"
          value={newSnippet.description}
          onChange={handleNewSnippetInputChange}
          placeholder="Description"
          required
        />
        <textarea
          name="code"
          value={newSnippet.code}
          onChange={handleNewSnippetInputChange}
          placeholder="Code"
          required
        />
        <button type="submit">Add Snippet</button>
      </form>

      <div className="snippets-container">
        {loading && <p>Loading snippets...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && snippets.map(snippet => (
          <div key={snippet.id} className="snippet-card">
            {editingSnippet && editingSnippet.id === snippet.id ? (
              <EditSnippetForm
                snippet={editingSnippet}
                onUpdate={handleUpdate}
                onCancel={() => setEditingSnippet(null)}
              />
            ) : (
              <>
                <div className="snippet-header">
                  <h2>{snippet.name}</h2>
                  <div className="snippet-actions">
                    <button onClick={() => setEditingSnippet(snippet)} className="edit-button">Edit</button>
                    <button onClick={() => handleDelete(snippet.id)} className="delete-button">Delete</button>
                  </div>
                </div>
                <p className="snippet-description">{snippet.description}</p>
                <SyntaxHighlighter
                  language={getLanguage(snippet.tags)}
                  style={vscDarkPlus}
                  className="snippet-code"
                >
                  {snippet.code}
                </SyntaxHighlighter>
                <div className="snippet-tags">
                  {snippet.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
