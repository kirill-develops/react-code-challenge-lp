import React, { useReducer } from 'react';

import Styles from './PostModal.module.scss';
import PostModal from './PostModal';



const CreatePostButton = () => {
  const [newPost, toggleNewPost] = useReducer(checked => !checked, false);


  return newPost ? (
    <PostModal
      togglePost={toggleNewPost}
      modalType={"add"}
    />
  ) : (
    <button
      type='button'
      onClick={toggleNewPost}
      className={Styles.button}
    >
      CREATE POST
    </button>
  );
};

export default React.memo(CreatePostButton);
