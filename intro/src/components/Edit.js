import { useState } from "react";
import { Link } from "react-router-dom";

export default function Edit({ post, onSubmit, onClose }) {
  const [form, setForm] = useState({ text: post.content });

  const handleSubmit = () => {
    onSubmit(post.id, form.text);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <form className="Form">
      <header className="Post-header">
        <div className="publish-link">Редактировать</div>
        <div className="Form-close" onClick={onClose}>
          ❌
        </div>
      </header>
      <textarea
        className="Form-textarea"
        name="text"
        value={form.text}
        onChange={handleChange}
      />
      <Link to={`/`} className="Form-button" onClick={handleSubmit}>Сохранить</Link>
    </form>
  );
}
