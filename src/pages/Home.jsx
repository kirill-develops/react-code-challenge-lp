import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Styles from '../styles/global.module.scss';
import { getAllPosts, getOne } from '../features/posts/postsSlice';
import { fetchPost, fetchPosts } from '../features/posts/postsActions';
import SearchBar from '../components/SearchBar/SearchBar';
import AddPostModal from '../components/PostModals/AddPostModal';
import Card from '../components/Card/Card';
import PostInteractions from '../components/PostInteractions/PostInteractions';

const Home = () => {
  // localized dispatch caller of useDispatch hook
  const dispatch = useDispatch();

  const postSearchedFor = useSelector(getOne);

  // allPosts, postStatus & error copied from the posts slice in Redux
  const allPosts = useSelector(getAllPosts);
  const postStatus = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  // when the page first loads, dispatch fetchPosts to populate our posts Redux state
  useEffect(() => {
    if (postStatus === 'idle') dispatch(fetchPosts())
  }, [postStatus, dispatch]);

  // create content variable to transform based on API responses
  let content;

  switch (postStatus || postSearchedFor) {
    default:
      content = (
        <h1>Loading...</h1>);
      break;
    case 404:
      content = (
        <div className='card'>
          <h2>No such ID</h2>
        </div>
      )
      break;
    case postSearchedFor.id:
      content = <Card post={postSearchedFor} />
      break;
    case 'succeeded':
      content = allPosts.slice()
        .map(post =>
          <Card key={post.id} post={post}>
            <PostInteractions post={post} />
          </Card>
        );
      break;
    case 'failed':
      content = <div>{error}</div>;
      break;
  }

  return (
    <main className={Styles.page_layout}>
      <SearchBar
        reduxAction={fetchPost}
        placeholder="search by ID..."
      />
      <AddPostModal />
      <section className={Styles.card_deck}>
        {content}
      </section>
    </main>
  )
};

export default React.memo(Home);
