import React from 'react'
import PostInteractions from '../PostInteractions/PostInteractions'

const Card = ({ post }) => {
  return (
    <div className='card'>
      <h1 className='card__title'>
        {post.title}
      </h1>
      <div className='card__body-wrapper'>
        <p className='card__body'>
          {post.body}
        </p>
        <div className='card__metrics'>
          <PostInteractions post={post} />
          <p className='card__label'>
            post id number:{post.id}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Card