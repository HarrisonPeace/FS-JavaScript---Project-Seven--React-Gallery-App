import { NavLink } from 'react-router-dom';
import React from 'react';

//Import close icon
import closeSvg from '../close.svg'

function Nav({ searchTerms, addNavLink, removeNavLink }) {
    return (
      <nav className="main-nav">
      <ul id="nav-ul">
        { searchTerms.map(searchTerm => //map over saved search terms and create a Nav item for each
          <li id={searchTerm} key={searchTerm}>
            <NavLink to={ `/search/${searchTerm.replace(/ /g, '-')}` }>{ searchTerm }</NavLink>
            <img onClick={ () => removeNavLink(searchTerm) } src={closeSvg} alt='Remove Link' tabIndex="0"></img> {/* remove search item svg */}
          </li>)
        }
        <li id="nav-button"><button onClick={ addNavLink }>Add Search Term</button></li>
      </ul>
    </nav>
  );
}
  
export default Nav;