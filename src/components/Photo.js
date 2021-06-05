import React from 'react';

function Photo( {info} ) {
    return (
        <li tabIndex="0">
            <img src={`https://live.staticflickr.com/${info.server}/${info.id}_${info.secret}.jpg`} alt="" />
        </li>
    );
  }
  
  export default Photo;
  