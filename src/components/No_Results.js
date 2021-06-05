import { Link } from 'react-router-dom';

function NoResults(props) {

    let searchTerm = props.searchTerm.toUpperCase()
    
    return (
        <li className="not-found">
            <h3>No Results Found</h3>
            <p>Your search of "{searchTerm}" did not return any results. Please try again.</p>
            <p style={{ marginTop: "40px" }}><Link to={`/`}>Return Home</Link></p>
        </li>
    );
}

export default NoResults;