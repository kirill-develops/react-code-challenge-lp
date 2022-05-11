import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';

import Styles from './PostInteractions.module.scss';
import { deletePost } from '../../features/posts/postsActions';
import EditPostModal from '../PostModals/EditPostModal';

const PostInteractions = ({ post }) => {
  const dispatch = useDispatch();

  const [editPost, toggleEditPost] = useReducer(checked => !checked, false);

  const onDelete = e => dispatch(deletePost(post.id));

  return (
    <div className={Styles.button_wrapper}>
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
};

export default React.memo(PostInteractions);
