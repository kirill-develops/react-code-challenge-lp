import React, { useReducer } from 'react';
import { useSelector } from 'react-redux';

import Styles from '../styles/global.module.scss';
import { getAllPosts, getPostById, useGetAllPostsQuery } from '../slices/apiSlice';
import Card from '../components/Card/Card';
import CreatePostButton from '../components/PostModals/CreatePostButton';
import PostInteractions from '../components/PostInteractions/PostInteractions';
import SearchBar from '../components/SearchBar/SearchBar';

const Home = () => {

  const {
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error } = useGetAllPostsQuery();

  const allPosts = useSelector(getAllPosts);

  // search state
  const [searchId, setSearchId] = useReducer((state, action) => {
    if (!action) {
      return '';
    }
    else if (!Number(action)) {
      return state;
    }
    return action;
  }, '');

  // data results from search by Id from Redux store
  const post = useSelector((state) => getPostById(state, +searchId));

  // create content variable to transform based on API responses
  let content;

  if (isLoading) {
    content = (
      <h1>Loading...</h1>);
  }
  else if (searchId) {
    //Based on search results, either produce formated data or error message
    content = post ? (
      <Card post={post}>
        <PostInteractions post={post} />
      </Card>
    ) : (
      <div className='card'>
        <h2>No such ID</h2>
      </div>
    )
  }
  else if (isSuccess) {
    content = allPosts
      .map(post =>
        <Card key={post.id} post={post}>
          <PostInteractions post={post} />
        </Card>
      );
  }
  else if (isError) {
    content = <div>{error}</div>;
  }

  const isDisabled = isFetching
    ? [Styles.card_deck, Styles.disabled].join(" ") : Styles.card_deck;

  return (
    <main className={Styles.page_layout}>
      <SearchBar
        search={searchId}
        setSearch={setSearchId}
        placeholder="search by ID..."
      />
      <CreatePostButton />
      <section className={isDisabled}>
        {content}
      </section>
    </main>
  )
};

export default React.memo(Home);
