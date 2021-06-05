import { Link } from 'react-router-dom';

function NotFound() {
    return ( 
        <div className="not-found">
            <h2>Page Not Found</h2>
            <p><Link to={`/`}>Return Home</Link></p>
        </div>
    );
}
  
export default NotFound;