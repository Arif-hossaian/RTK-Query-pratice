import React from 'react';
import PostAuthor from './PostAuthor';
import ReactionButtons from './Reaction';
import TimeAgo from './TimeAgo';

const AllPosts = ({ post }) => {
  return (
    <article>
      <h4>
        <span>{post.id}:- </span> {post.title}
      </h4>
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default AllPosts;
