    // src/components/SnippetForm.js
    import React, { useState } from 'react';

    // SnippetForm component receives 'onAddSnippet' as a prop
    function SnippetForm({ onAddSnippet }) {
      // State variables to hold form input values
      const [name, setName] = useState('');
      const [code, setCode] = useState('');
      const [description, setDescription] = useState(''); // Changed to empty string for consistency
      const [tags, setTags] = useState(''); // Tags as a comma-separated string

      // Handle form submission
      const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior (page reload)

        // Basic validation
        if (!name.trim() || !code.trim()) {
          alert('Snippet Name and Code are required!'); // Using alert for now, will replace with better UI later
          return;
        }

        // Create a new snippet object
        // IMPORTANT: Do NOT include 'id' here. The backend will generate it.
        const newSnippet = {
          name,
          code,
          description: description || null, // Ensure description is null if empty
          tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) // Split tags string into array
        };

        onAddSnippet(newSnippet); // Call the prop function to add the snippet
        
        // Clear the form fields after submission
        setName('');
        setCode('');
        setDescription('');
        setTags('');
      };

      return (
        <div className="snippet-form-container">
          <h2 className="snippet-form-title">Add New Snippet</h2>
          <form onSubmit={handleSubmit} className="snippet-form">
            <div className="form-group">
              <label htmlFor="snippetName">Snippet Name:</label>
              <input
                type="text"
                id="snippetName"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required // HTML5 required attribute
              />
            </div>

            <div className="form-group">
              <label htmlFor="snippetCode">Code:</label>
              <textarea
                id="snippetCode"
                className="form-textarea"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows="8" // Set number of visible rows
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="snippetDescription">Description (Optional):</label>
              <textarea
                id="snippetDescription"
                className="form-textarea"
                value={description || ''} // Use empty string for controlled component if null
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="snippetTags">Tags (comma-separated, Optional):</label>
              <input
                type="text"
                id="snippetTags"
                className="form-input"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., javascript, react, utility"
              />
            </div>

            <button type="submit" className="submit-button">
              Add Snippet
            </button>
          </form>
        </div>
      );
    }

    export default SnippetForm;
    