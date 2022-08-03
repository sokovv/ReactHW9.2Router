import React from "react";

import Main from "./components/Main";
import Create from "./components/Create";
import PostView from "./components/PostView";
import { useState, useEffect } from "react";

import { Routes, Route, Link } from "react-router-dom";

import "./App.css";

export default function App() {
  const [posts, setPosts] = useState("");
  const [opts] = useState(1);

  useEffect(() => {
    fetch("http://localhost:7777/posts")
      .then((response) => response.json())
      .then((result) => {
        setPosts([...result]);
      });
  }, [opts]);

  function getData() {
    fetch("http://localhost:7777/posts")
      .then((response) => response.json())
      .then((result) => {
        setPosts([...result]);
      });
  }

  function postData(content) {
    const data = JSON.stringify({content });
    fetch("http://localhost:7777/posts", {
      method: "POST",
      body: data,
    }).then(getData);
  }

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main posts={posts} />} />
        <Route path="/posts/new" element={<Create addNote={postData} />} />
        <Route path='/posts/:pId' element={<PostView addNote={getData}/>}/>
        <Route
          path="*"
          element={
            <div>
              Страницы не существует.{" "}
              <Link to="/">Вернуться в главное меню</Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
}
