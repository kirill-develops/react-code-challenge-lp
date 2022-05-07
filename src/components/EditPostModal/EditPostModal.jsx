import './EditPostModal.scss';
import React, { useState } from 'react';
import { editPost } from '../../features/posts/postsActions';
import { customAlphabet } from 'nanoid';
import { useDispatch } from 'react-redux';

const nanoid = customAlphabet('1234567890', 12)

const EditPostModal = ({ post, toggleEditPost }) => {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.body)

  const dispatch = useDispatch();

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (title && content) {
      const postObj = {
        id: post.id,
        title: title,
        body: content,
        userId: nanoid(),
      };
      dispatch(editPost(post.id, postObj));
      toggleEditPost();
    }
  }

  return (
    <section className='edit-post__overlay'>
      <div className='edit-post'>
        <h2>Edit this Post</h2>
        <form onSubmit={onFormSubmit} className='edit-post__form'>
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
            className='edit-post__input--large'
          />
          <button
            type="submit"
            className='edit-post__button'
          >Save Post</button>
          <button
            type="button"
            onClick={toggleEditPost}
            className='edit-post__button'
          >Cancel</button>
        </form>
      </div>
    </section>
  )
}

export default EditPostModal;
