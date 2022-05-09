import React, { useState } from 'react';
import { customAlphabet } from 'nanoid';
import { useDispatch } from 'react-redux';

import Styles from './PostModal.module.scss';
import { editPost } from '../../features/posts/postsActions';


const nanoid = customAlphabet('1234567890', 12);

const EditPostModal = ({ post, toggleEditPost }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.body);

  const dispatch = useDispatch();

  // boolean variable representing if the title and content are appropriate lengths
  const canSave = Boolean(title.length > 2) && Boolean(content.length > 4);

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (canSave) {
      const postObj = {
        id: post.id,
        title: title,
        body: content,
        userId: nanoid(),
      };
      dispatch(editPost(post.id, postObj));
      setTitle('');
      setContent('');
      toggleEditPost();
    }
  }

  return (
    <section className={Styles.overlay}>
      <div className={Styles.modal}>
        <h2>Edit this Post</h2>
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
            onClick={toggleEditPost}
            className={Styles.button}
          >Cancel</button>
        </form>
      </div>
    </section>
  )
}

export default EditPostModal;
