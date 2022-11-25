import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AllPosts from './AllPosts';
import {
  selectAllPosts,
  getAllPostsStatus,
  getAllPostsError,
  fetchPosts,
} from './posts/postsSlice';

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getAllPostsStatus);
  const postsError = useSelector(getAllPostsError);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (postsStatus === 'success') {
    const orderedPosts = posts
      .slice()
      .sort((a, c) => c.date.localeCompare(a.date));
    content = orderedPosts
      .slice(0, 8)
      .map((post) => <AllPosts key={post.id} post={post} />);
  } else if (postsStatus === 'fail') {
    content = <p>{postsError}</p>;
  }

  return (
    <div>
      Posts
      {content}
    </div>
  );
};

export default PostsList;
