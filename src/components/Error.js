import { Link } from 'react-router-dom';

function Error() {
    return ( 
        <div className="not-found">
            <h2>Error</h2>
            <p>There was an error fetching the data please try again</p>
            <p><Link to={`/`}>Return Home</Link></p>
        </div>
    );
}
  
export default Error;