import TimeAgo from "javascript-time-ago";
import ru from "javascript-time-ago/locale/ru";
import Edit from "./Edit";

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function PostView(props) {
  const [edit, setEdit] = useState(false);
  const [opts] = useState(1);
  const [posts, setPosts] = useState();
  const { pId } = useParams();


  useEffect(() => {
    fetch("http://localhost:7777/posts")
      .then((response) => response.json())
      .then((result) => {
        setPosts([...result]);
      });
  }, [opts]);

  if (!posts)
    return (
      <div>
        Не найдено, перейти к <Link to="/">на главную</Link>
      </div>
    );

  function deleteData(id) {
    console.log(id);
    fetch(`http://localhost:7777/posts/${id}`, {
      method: "DELETE",
    }).then(() => {
      props.addNote();
    });
  }

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSubmit = (id, text) => {
    const data = JSON.stringify({ id: Number(id), content: text });
    fetch("http://localhost:7777/posts", {
      method: "POST",
      body: data,
    })
      .then(() => {
        props.addNote();
      })
      .then(() => {
        setEdit(false);
      });
  };

  const handleClose = () => {
    setEdit(false);
  };

  TimeAgo.addLocale(ru);
  const timeAgo = new TimeAgo("ru-RU");
  return (
    <div className="Post">
      {posts &&
        ((!edit && (
          <div className="PostView">
            <div className="post-content">
              <div className="info">
                <img
                  className="image"
                  src="https://coolsen.ru/wp-content/uploads/2021/09/11-900x563.jpg"
                  alt="img"
                />
                <div className="name">Валерий</div>
                <div className="date">
                  {" "}
                  {timeAgo.format(
                    new Date(
                      posts.find(
                        (item) => Number(item.id) === Number(pId)
                      ).created
                    )
                  )}
                </div>
                <Link to={"/"} className="Form-close">
                  ❌
                </Link>
              </div>
              <div className="content">
                {" "}
                {posts.find((item) => Number(item.id) === Number(pId)).content}
              </div>
              <div className="relation">
                <div className="like">👍 Нравится</div>
                <div className="comment">👆 Комментировать</div>
              </div>
            </div>
            <div className="Post-footer">
              <div className="PostView-edit" onClick={handleEdit}>
                Изменить
              </div>
              <Link
                to={"/"}
                className="delete-post"
                onClick={() =>
                  deleteData(
                    posts.find((item) => Number(item.id) === Number(pId)).id
                  )
                }
              >
                Удалить
              </Link>
            </div>
          </div>
        )) ||
          (edit && (
            <div>
              <Edit
                post={posts.find((item) => Number(item.id) === Number(pId))}
                onSubmit={handleSubmit}
                onClose={handleClose}
              />
            </div>
          )))}
    </div>
  );
}
