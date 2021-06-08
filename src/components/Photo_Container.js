
// Component Imports
import Photo from './Photo'
import NoResults from './No_Results'

function PhotoContainer({ photos, onSearch }) {

    let searchTerm = (window.location.href.replace('http://localhost:3000/',''))

    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                { photos.length === 0
                    ? <NoResults searchTerm={searchTerm.replace(/-/g, ' ')}/> // If no results are found show no results page passing in search term
                    : photos.map(photo => <Photo info={photo} key={photo.id}/> ) 
                }
            </ul>
        </div>
        );
}

export default PhotoContainer;