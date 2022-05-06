import './AddPostModal.scss';
import React, { useReducer, useState } from 'react';
import { addPost } from '../../features/posts/postsActions';
import { customAlphabet } from 'nanoid';
import { useDispatch } from 'react-redux';

const nanoid = customAlphabet('1234567890', 12)

const AddPostModal = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [newPost, toggleNewPost] = useReducer(checked => !checked, false);

  const dispatch = useDispatch();

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (title && content) {
      const postObj = {
        title: title,
        body: content,
        userId: nanoid(),
      };
      dispatch(addPost(postObj));
    }
  }

  return newPost ? (
    <section className='new-post__overlay'>
      <div className='new-post'>
        <h2>Add a New Post</h2>
        <form onSubmit={onFormSubmit} className='new-post__form'>
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
          />
          <button
            type="submit"
            className='new-post__button'
          >Save Post</button>
          <button
            type="button"
            onClick={toggleNewPost}
            className='new-post__button'
          >Cancel</button>
        </form>
      </div>
    </section>
  ) : (
    <button
      type='button'
      onClick={toggleNewPost}
      className='new-post__button'>
      CREATE POST
    </button>
  )
}

export default AddPostModal;
