import './Home.scss';
import React, { useEffect } from 'react';
import { getAllPosts, getOne } from '../../features/posts/postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../features/posts/postsActions';
import SearchBar from '../../components/SearchBar/SearchBar';
import { AddPostForm } from '../../components/AddPostForm/AddPostForm';

const Home = () => {
  // localized dispatch caller of useDispatch hook
  const dispatch = useDispatch();

  const postSearched = useSelector(getOne);

  // allPosts, postStatus & error copied from the posts slice in Redux
  const allPosts = useSelector(getAllPosts);
  const postStatus = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  // when the page first loads, dispatch fetchPosts to populate our posts Redux state
  useEffect(() => {
    if (postStatus === 'idle') dispatch(fetchPosts())
  }, [postStatus, dispatch])

  // create content variable to transform based on API responses
  let content;

  if (postStatus === 'loading') {
    content = <h1>Loading...</h1>;
  }
  else if (postStatus === 'succeeded') {
    content = allPosts.slice()
      .map(post =>
        <div
          key={post.id}
          className='card'
        >
          <h1 className='card__title'>
            {post.title}
          </h1>
          <p className='card__body'>{post.body}</p>
          <p className='card__label'>post id number:{post.id}</p>
        </div>);
  }
  else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  // if API req responds with a 404, produce an error
  if (postSearched === 404) {
    content = (
      <div className='card'>
        <h2>No such ID</h2>
      </div>
    )
  } else if (postSearched.id) {
    content = (
      <div className='card'>
        <h1 className='card__title'>
          {postSearched.title}
        </h1>
        <p className='card__body'>{postSearched.body}</p>
        <p className='card__label'>post id number:{postSearched.id}</p>
      </div>
    )
  }

  return (
    <div className='home-page'>
      <SearchBar />
      <div className='card-deck'>
        {content}
      </div>
    </div>
  )
};

export default Home;
