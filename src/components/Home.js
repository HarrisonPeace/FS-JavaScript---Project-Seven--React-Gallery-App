import { Link } from 'react-router-dom';

function NoResults() {
  return (
    <div className="container">
        <h3>Welcome to the React Gallery App!</h3>
        <p>This App uses React and the Flickr API to render images onto the page</p>
        <p style={{ marginTop: "40px" }}><Link to={`/search/cats`}>Start Here</Link></p>
        <p>Happy Searching!</p>
    </div>
  );
}

export default NoResults;