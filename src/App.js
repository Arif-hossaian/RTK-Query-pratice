import logo from './logo.svg';
import './App.css';
import PostsList from './features/PostsList';
import AddPostForm from './features/AddPostForm';

function App() {
  return (
    <div className="App">
      <AddPostForm />
      <PostsList />
    </div>
  );
}

export default App;
