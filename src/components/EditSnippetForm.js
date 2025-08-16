import React, { useState } from 'react';

const EditSnippetForm = ({ snippet, onUpdate, onCancel }) => {
  const [editedSnippet, setEditedSnippet] = useState({ ...snippet });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSnippet(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedSnippet.id, {
      name: editedSnippet.name,
      description: editedSnippet.description,
      code: editedSnippet.code,
    });
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        defaultValue={editedSnippet.name} // Changed from value to defaultValue
        onChange={handleInputChange}
        required
      />
      <textarea
        name="description"
        defaultValue={editedSnippet.description} // Changed from value to defaultValue
        onChange={handleInputChange}
        required
      />
      <textarea
        name="code"
        defaultValue={editedSnippet.code} // Changed from value to defaultValue
        onChange={handleInputChange}
        required
      />
      <div className="edit-buttons">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default EditSnippetForm;
