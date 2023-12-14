import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Post } from "../components/Post";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const [data, setData] = React.useState()
  const userData = useSelector(state => state.auth.data)
  const [isLoading, setLoading] = React.useState(true);
  const {id} = useParams()

  React.useEffect(() => {
    axios
    .get(`/posts/${id}`)
    .then(res => {
      setData(res.data);
      setLoading(false)
    }).catch(err => {
      console.warn(err)
      alert('Ошибка при получении статьи')
    })
  }, [])

  if(isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL || `http://localhost:4444`}${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        tags={data.tags}
        isEditable={userData?._id === data.user._id}
      >
        <ReactMarkdown children={data.text} />
      </Post>
    </>
  );
};
