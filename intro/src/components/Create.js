import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Create(props) {
  const [text, setText] = useState("");

  function handleSubmit() {
    props.addNote(text);
    setText("");
  }

  function handleChange(event) {
    const { value } = event.target;
    setText(value);
  }

  return (
    <div className="Post">
      <header className="Post-header">
        <div className="publish-link">Публикация</div>
      </header>
      <form className="Form">
        <label>
          <textarea
            className="Form-textarea"
            onChange={handleChange}
            value={text}
            name="text"
            required
          />
        </label>
        <Link to={`/`} className="Form-button" onClick={handleSubmit}>
          Опубликовать
        </Link>
      </form>
    </div>
  );
}
