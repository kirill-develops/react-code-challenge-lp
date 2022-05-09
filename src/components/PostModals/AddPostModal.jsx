import React, { useReducer, useState } from 'react';
import { customAlphabet } from 'nanoid';
import { useDispatch } from 'react-redux';

import Styles from './PostModal.module.scss';
import { addPost } from '../../features/posts/postsActions';


const nanoid = customAlphabet('1234567890', 12)

const AddPostModal = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [newPost, toggleNewPost] = useReducer(checked => !checked, false);

  const dispatch = useDispatch();

  // boolean variable representing if the title and content are appropriate lengths
  const canSave = Boolean(title.length > 2) && Boolean(content.length > 4);

  // function to handle form submission 
  const onFormSubmit = (event) => {
    // prevents page reload
    event.preventDefault();

    // check title & content have values
    if (canSave) {
      const postObj = {
        title: title,
        body: content,
        userId: nanoid(),
      };
      dispatch(addPost(postObj));
      setTitle('');
      setContent('');
      toggleNewPost();
    };
  };

  return newPost ? (
    <section className={Styles.overlay}>
      <div className={Styles.modal}>
        <h2>Add a New Post</h2>
        <form onSubmit={onFormSubmit} className={Styles.form}>
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={e => setContent(e.target.value)}
            className={Styles.input__large}
          />
          <button
            type="submit"
            className={Styles.button}
            disabled={!canSave}
          >Save Post</button>
          <button
            type="button"
            onClick={toggleNewPost}
            className={Styles.button}
          >Cancel</button>
        </form>
      </div>
    </section>
  ) : (
    <button
      type='button'
      onClick={toggleNewPost}
      className={Styles.button}>
      CREATE POST
    </button>
  );
};

export default AddPostModal;
