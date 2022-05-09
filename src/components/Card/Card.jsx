import React from 'react';

import Styles from './Card.module.scss';
import PostInteractions from '../PostInteractions/PostInteractions';

const Card = ({ post }) => (
  <div className={Styles.card}>
    <h1 className={Styles.title}>
      {post.title}
    </h1>
    <div className={Styles.body_wrapper}>
      <p className={Styles.body}>
        {post.body}
      </p>
      <div className={Styles.metrics}>
        <PostInteractions post={post} />
        <p className={Styles.label}>
          post id number:{post.id}
        </p>
      </div>
    </div>
  </div >
);


export default Card;
