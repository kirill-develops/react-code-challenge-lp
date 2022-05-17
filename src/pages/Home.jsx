import React, { useState } from 'react';

import Styles from '../styles/global.module.scss';
import { getAllPosts, getPostById, useGetAllPostsQuery } from '../features/api/apiSlice';
import SearchBar from '../components/SearchBar/SearchBar';
import AddPostModal from '../components/PostModals/AddPostModal';
import Card from '../components/Card/Card';
import PostInteractions from '../components/PostInteractions/PostInteractions';
import { useSelector } from 'react-redux';

const Home = () => {

  const {
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error } = useGetAllPostsQuery();

  const allPosts = useSelector(getAllPosts);

  // search state & redux variable
  const [search, setSearch] = useState('');

  const post = useSelector((state) => getPostById(state, Number(search)));

  // create content variable to transform based on API responses
  let content;

  if (isLoading) {
    content = (
      <h1>Loading...</h1>);
  }
  else if (search && !post) {
    content = (
      <div className='card'>
        <h2>No such ID</h2>
      </div>
    )
  }
  else if (search && post) {
    content = (
      <Card post={post}>
        <PostInteractions post={post} />
      </Card>
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
        search={search}
        setSearch={setSearch}
        placeholder="search by ID..."
      />
      <AddPostModal />
      <section className={isDisabled}>
        {content}
      </section>
    </main>
  )
};

export default React.memo(Home);
