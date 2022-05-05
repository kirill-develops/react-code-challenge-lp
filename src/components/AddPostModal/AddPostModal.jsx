import './AddPostModal.scss';
import React, { useReducer, useState } from 'react';

const AddPostModal = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [newPost, toggleNewPost] = useReducer(checked => !checked, false);

  return newPost ? (
    <section className='new-post__overlay'>
      <div className='new-post'>
        <h2>Add a New Post</h2>
        <form className='new-post__form'>
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
            type="button"
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
