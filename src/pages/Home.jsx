import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/posts';


import { Post } from '../components/Post';

export const Home = () => {
	const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data)
	const { posts } = useSelector(state => state.posts);
  console.log(posts.items.imageUrl)

	const isPostsLoading = posts.state === 'loading'

	React.useEffect(() => {
		dispatch(fetchPosts());
	}, [])


  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => 
            isPostsLoading ? (
              <Post key={index} isLoading={true}/>
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL || `http://localhost:4444`}${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                tags={obj.tags}  
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
      </Grid>
    </>
  );
};
