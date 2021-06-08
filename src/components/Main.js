import React, { useState, useEffect } from 'react';
import {
  useLocation
} from 'react-router-dom';
import axios from 'axios';

// Component Imports
import SearchForm from './Search_Form'
import Nav from './Nav';
import Loading from './Loading';
import Error from './Error';
import PhotoContainer from './Photo_Container';

// API Key Import
import API_key from '../config';

function Main() {

  const location = useLocation();
  const [currentPhotos, setCurrentPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [savedSearchTerms, setSavedSearchTerms] = useState([
    'cats',
    'dogs',
    'trees'
  ]);

  const performSearch = query => {
    setLoading(true)
    setError(false)
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_key}&tags=${query}&content_type=1&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      setCurrentPhotos(response.data.photos.photo)
      setLoading(false)
    }) //add current search photo data to state
    .catch(error => {
      setError(true)
      this.render()
    });
  }

  const addNavLink = () => {
    let searchTerm = window.location.href.replace('http://localhost:3000/search/','').replace(/-/g, ' '); //find search term
    if(savedSearchTerms.indexOf(searchTerm) === -1) {
      setSavedSearchTerms([...savedSearchTerms, searchTerm]) //add current search term to saved search terms
    }
  }

  const removeNavLink = searchTerm => {
    let tempArray = savedSearchTerms.filter(term => term !== searchTerm)
    setSavedSearchTerms(tempArray);
  }

  useEffect(() => {
    performSearch(location.pathname.replace('/search/',''))
  }, [location]);

  return (
    <div className="container">
      <SearchForm onSearch={performSearch}/>
      <Nav searchTerms={savedSearchTerms} removeNavLink={removeNavLink} addNavLink={addNavLink}/>
        { error //show error
          ?  <Error />
          : loading //show loading
            ? <Loading/>
            : <PhotoContainer photos={currentPhotos}/>
        }
      </div>
  );
}

export default Main;
