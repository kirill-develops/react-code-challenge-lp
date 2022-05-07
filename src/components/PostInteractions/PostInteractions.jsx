import React, { useReducer } from 'react'
import { useDispatch } from 'react-redux';
import { deletePost } from '../../features/posts/postsActions';
import EditPostModal from '../EditPostModal/EditPostModal';

const PostInteractions = ({ post }) => {
  const dispatch = useDispatch();

  const [editPost, toggleEditPost] = useReducer(checked => !checked, false);

  const onDelete = e => dispatch(deletePost(post.id));

  return (
    <div>
      <button
        type='button'
        onClick={toggleEditPost}
      >Edit</button>
      <button
        type='button'
        onClick={onDelete}
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