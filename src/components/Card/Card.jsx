import React from 'react';

import Styles from './Card.module.scss';

const Card = ({ post, children }) => (
  <div className={Styles.card}>
    <h1 className={Styles.title}>
      {post.title}
    </h1>
    <div className={Styles.body_wrapper}>
      <p className={Styles.body}>
        {post.body}
      </p>
      <div className={Styles.metrics}>
        {children}
        <p className={Styles.label}>
          post id number:{post.id}
        </p>
      </div>
    </div>
  </div >
);


export default React.memo(Card);
