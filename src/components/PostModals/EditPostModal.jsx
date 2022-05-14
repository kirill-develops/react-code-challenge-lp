import React, { useState } from 'react';
import { customAlphabet } from 'nanoid';

import Styles from './PostModal.module.scss';
import { useEditOnePostMutation } from '../../features/api/apiSlice';


const nanoid = customAlphabet('1234567890', 12);

const EditPostModal = ({ post, toggleEditPost }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.body);

  const [editPost, { isLoading }] = useEditOnePostMutation();

  // boolean variable representing if the title and content are appropriate lengths
  const canSave = Boolean(title.length > 2) && Boolean(content.length > 4) && !isLoading;

  const onSubmit = async () => {

    if (canSave) {
      const postObj = {
        id: post.id,
        title: title,
        body: content,
        userId: nanoid(),
      };
      try {
        await editPost(postObj).unwrap()
        setTitle('');
        setContent('');
        toggleEditPost();
      } catch (err) {
        console.error('failed to update the post: ', err)
      }
    }
  }

  return (
    <section className={Styles.overlay}>
      <div className={Styles.modal}>
        <h2>Edit this Post</h2>
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
            onClick={toggleEditPost}
            disabled={isLoading}
            className={Styles.button}
          >Cancel</button>
        </form>
      </div>
    </section>
  )
}

export default React.memo(EditPostModal);
