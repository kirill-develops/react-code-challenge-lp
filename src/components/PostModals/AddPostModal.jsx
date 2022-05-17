import React, { useReducer, useState } from 'react';
import { customAlphabet } from 'nanoid';

import Styles from './PostModal.module.scss';
import { useAddOnePostMutation } from '../../slices/apiSlice';


const nanoid = customAlphabet('1234567890', 12)

const AddPostModal = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [newPost, toggleNewPost] = useReducer(checked => !checked, false);

  const [addNewPost, { isLoading }] = useAddOnePostMutation();

  // boolean variable representing if the title and content are appropriate lengths
  const canSave = Boolean(title.length > 2)
    && Boolean(content.length > 4)
    && !isLoading;

  // function to handle form submission 
  const onSubmit = async () => {
    // check title & content have values
    if (canSave) {
      const postObj = {
        title: title,
        body: content,
        userId: nanoid(),
      };
      try {
        await addNewPost(postObj).unwrap();
        setTitle('');
        setContent('');
        toggleNewPost();
      } catch (err) {
        console.error('failed to save the post: ', err);
      }
    };
  };

  return newPost ? (
    <section className={Styles.overlay}>
      <div className={Styles.modal}>
        <h2>Add a New Post</h2>
        <form className={Styles.form}>
          <label htmlFor="postTitle">
            Post Title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={isLoading}
          />
          <label htmlFor="postContent">
            Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={e => setContent(e.target.value)}
            disabled={isLoading}
            className={Styles.input__large}
          />
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canSave}
            className={Styles.button}
          >Save Post</button>
          <button
            type="button"
            onClick={toggleNewPost}
            disabled={isLoading}
            className={Styles.button}
          >Cancel</button>
        </form>
      </div>
    </section>
  ) : (
    <button
      type='button'
      onClick={toggleNewPost}
      disabled={isLoading}
      className={Styles.button}
    >
      CREATE POST
    </button>
  );
};

export default React.memo(AddPostModal);
