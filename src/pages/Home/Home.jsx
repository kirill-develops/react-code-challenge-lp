import './Home.scss';
import React, { useEffect, useState } from 'react';
import { getAllPosts, getOne } from '../../features/posts/postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchPost } from '../../features/posts/postsActions';

const Home = () => {
  // localized dispatch caller of useDispatch hook
  const dispatch = useDispatch();

  // search state & redux variable
  const [search, setSearch] = useState('');
  const postSearched = useSelector(getOne);

  // when the search state changes, dispatch fetchPost with the search state as
  // a paramater
  useEffect(() => {
    dispatch(fetchPost(search))
  }, [search, dispatch])

  // allPosts, postStatus & error copied from the posts slice in Redux
  const allPosts = useSelector(getAllPosts);
  const postStatus = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  // when the page first loads, dispatch fetchPosts to populate our posts Redux state
  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  // create content variable to transform based on API responses
  let content;

  if (postStatus === 'loading') {
    content = <h1>Loading...</h1>;
  } else if (postStatus === 'succeeded') {
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
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  // if API req responds with a 404, produce an error
  if (postSearched === 404) {
    content = (
      <div
        className='card'
      >
        <h2>No such ID</h2>
      </div>
    )
  } else if (postSearched.id) {
    content = (
      <div
        key={postSearched.id}
        className='card'
      >
        <h1 className='card__title'>
          {postSearched.title}
        </h1>
        <p className='card__body'>{postSearched.body}</p>
        <p className='card__label'>post id number:{postSearched.id}</p>
      </div>
    )
  }

  return (
    <div>
      <section className='search-wrapper'>
        <input
          type='search'
          value={search}
          placeholder="search by ID..."
          onChange={(e) => setSearch(e.target.value)}
          className=''
        />
      </section>
      <div className='card-deck'>
        {content}
      </div>
    </div>
  )
};

export default Home;
