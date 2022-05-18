import React, { useState } from 'react';
import { customAlphabet } from 'nanoid';

import Styles from './PostModal.module.scss';
import { useAddOnePostMutation, useEditOnePostMutation } from '../../slices/apiSlice';


const nanoid = customAlphabet('1234567890', 12);


const PostModal = ({ post = {},
  togglePost,
  modalType = 'add' }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.body || '');

  const [addNewPost, { isLoading: addPostLoading }] = useAddOnePostMutation();
  const [editPost, { isLoading: editPostLoading }] = useEditOnePostMutation();

  // boolean variable representing if the title and content are appropriate lengths
  const canSave = Boolean(title.length > 2)
    && Boolean(content.length > 4)
    && !addPostLoading && !editPostLoading;

  const onSubmit = async () => {
    if (canSave) {
      const postObj = {
        ...(modalType === 'edit' && { id: post.id }),
        title: title,
        body: content,
        userId: nanoid(),
      };
      try {
        modalType === 'edit'
          ? await editPost(postObj).unwrap() : await addNewPost(postObj).unwrap();
        setTitle('');
        setContent('');
        togglePost();
      } catch (err) {
        console.error('failed to update the post: ', err)
      }
    }
  }

  const postTitle = modalType === 'edit' ? <h2>Edit this Post</h2> : <h2>Add a New Post</h2>;
  const isDisabled = addPostLoading || editPostLoading;

  return (
    <section className={Styles.overlay}>
      <div className={Styles.modal}>
        {postTitle}
        <form className={Styles.form}>
          <label htmlFor="postTitle">
            Post Title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={isDisabled}
          />
          <label htmlFor="postContent">
            Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={e => setContent(e.target.value)}
            disabled={isDisabled}
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
            onClick={togglePost}
            disabled={isDisabled}
            className={Styles.button}
          >Cancel</button>
        </form>
      </div>
    </section>
  )
}

export default React.memo(PostModal);
