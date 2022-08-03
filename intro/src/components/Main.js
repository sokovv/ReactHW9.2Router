import React from "react";
import TimeAgo from "javascript-time-ago";
import ru from "javascript-time-ago/locale/ru";

import { Link } from "react-router-dom";

export default function Main(props) {


  const { posts } = props;

  TimeAgo.addLocale(ru);
  const timeAgo = new TimeAgo("ru-RU");
  return (
    <div className="Post">
      <header className="Post-header">
        <Link to={`/posts/new`} className="creat-post">
          Создать пост
        </Link>
      </header>
      {posts &&
        posts.map((item) => (
          <Link to={`/posts/${item.id}`} className="link" key={item.id}>
            <div className="post-content" key={item.id}>
              <div className="info">
                <img
                  className="image"
                  src="https://coolsen.ru/wp-content/uploads/2021/09/11-900x563.jpg"
                  alt="img"
                />
                <div className="name">Валерий</div>
                <div className="date">
                  {" "}
                  {timeAgo.format(new Date(item.created))}
                </div>
              </div>
              <div className="content">{item.content}</div>
              <div className="relation">
                <div className="like">👍 Нравится</div>
                <div className="comment">👆 Комментировать</div>
              </div>
              <input
                className="input-comment"
                type="text"
                placeholder="Напишите комментарий"
              />
            </div>
          </Link>
        ))}
    </div>
  );
}
