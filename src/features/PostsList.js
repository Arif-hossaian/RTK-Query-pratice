import React from 'react';
import { useSelector } from 'react-redux';
import PostAuthor from './PostAuthor';
import { selectAllPosts } from './posts/postsSlice';
import ReactionButtons from './Reaction';
import TimeAgo from './TimeAgo';

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const orderedPosts = posts
    .slice()
    .sort((a, c) => c.date.localeCompare(a.date));
  const renderPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h>{post.title}</h>
      <p>{post.content}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  ));
  return (
    <div>
      Posts
      {renderPosts}
    </div>
  );
};

export default PostsList;
