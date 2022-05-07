import React, { useReducer } from 'react'
import EditPostModal from '../EditPostModal/EditPostModal';

const PostInteractions = ({ post }) => {

  const [editPost, toggleEditPost] = useReducer(checked => !checked, false);

  return (
    <div>
      <button
        type='button'
        onClick={() => toggleEditPost()}
      >Edit</button>
      <button type='button'
      >Del</button>
      {editPost
        && <EditPostModal
          post={post}
          toggleEditPost={toggleEditPost}
        />
      }
    </div>
  )
}

export default PostInteractions;