import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';

// Component Imports
import SearchForm from './components/Search_Form'
import Nav from './components/Nav';
import Loading from './components/Loading';
import PhotoContainer from './components/Photo_Container';
import Error from './components/Error';
import NotFound from './components/Not_Found';

// API Key Import
import API_key from './config';

class App extends Component  {

  state = {
    searchQuery: '',
    currentPhotos: [],
    loading: true,
    error: false,
    searchTerms: [
      'cats',
      'dogs',
      'trees'
    ],
    result: '',
  }

  componentDidMount() {
    let searchTerm = (window.location.href.replace('http://localhost:3000/',''))
    if (searchTerm) { //if url has search term on initial load (anything after / )
      this.performSearch(searchTerm)
      Promise.all(this.state.searchTerms.map(term => this.performSearch(term, true)))
    } else {
      Promise.all(this.state.searchTerms.map(term => this.performSearch(term, true)))
      .then(() => {
        this.setState({ loading: false })
      })
    }
  }

  performSearch = (query, savedTerm = false) => {
      this.setState({ loading: true, error: false }) //show loading page until promise is resolved, remove error if it had been called previously
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_key}&tags=${query}&content_type=1&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        if(savedTerm) this.setState({ [query]: response.data.photos.photo, result: [query] }) //if initial search term - save data in state under its own variable
        else this.setState({ currentPhotos: response.data.photos.photo, loading: false, searchQuery: query }) //add current search photo data to state
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error)
        this.setState({ error: true })
        this.render()
      });
  }

  removeNavLink = (searchTerm) => {
    const tempArray = this.state.searchTerms;
    const searchTermIndex = this.state.searchTerms.indexOf(searchTerm); //find index of search term to remove
          tempArray.splice(searchTermIndex, 1); //remove search term from array
    if(window.location.href.replace('http://localhost:3000/','').replace(/-/g, ' ') === searchTerm) { //if current search matches Nav link to be removed
      this.setState({ searchTerms: tempArray, [searchTerm]: null,  currentPhotos: this.state[searchTerm]});
    } else {
      this.setState({ searchTerms: tempArray, [searchTerm]: null });
    }
  }

  addNavLink = () => {
    let searchTerm = window.location.href.replace('http://localhost:3000/','').replace(/-/g, ' '); //find search term
    if(this.state.searchTerms.indexOf(searchTerm) === -1) {
      this.setState(prevState => {
        return {
          [searchTerm]: [...prevState.currentPhotos], //create custom variable and store photo data
          searchTerms: [...prevState.searchTerms, searchTerm], //add current search term to saved search terms
        }
      })
    }
  }

  render() {
    return (
      <Router>
        <div className="container">
          <SearchForm onSearch={this.performSearch}/>
          <Nav searchTerms={this.state.searchTerms} removeNavLink={this.removeNavLink} addNavLink={this.addNavLink}/>
          {(this.state.error) //show error
            ? <Error/> 
            : (this.state.loading) //show loading
              ? <Loading/>
              : <Switch>
                  <Route exact path="/"><Redirect to={ `/${this.state.result}` }/></Route>
                  {
                    this.state.searchTerms.map(searchTerm => { // create Route for each saved search term
                      return <PhotoContainer key={searchTerm} path={`/${searchTerm}`} photos={this.state[searchTerm]}/> })
                  }
                  <Route path={"/:searchTerm"} render={ () => {return <PhotoContainer photos={this.state.currentPhotos}/>}}/>
                  <Route component={ NotFound }/>
                </Switch>
          }
        </div>
      </Router>
    );
  }
}
  
export default App;
