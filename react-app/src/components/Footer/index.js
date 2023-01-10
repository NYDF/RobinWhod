// frontend/src/components/Navigation/index.js
import React from 'react';
import linkedin from '../../img/linkedin.png'
import github from '../../img/github.png'
import portfolio from '../../img/portfolio.png'
import angellist from '../../img/angellist.png'
import eriscord from '../../img/Eriscord.png'
import songbnb from '../../img/songbnb.png'
import './Footer.css';

function Footer() {

  return (
    <>
      <div className='About-link-port-div'>
        <div className='About-link-port'>Link to Developer's</div>
        <a target="_blank" rel="noopener noreferrer" href=" https://www.linkedin.com/in/dongfang-song-25261218a/"><img id='linkedin' src={linkedin} /></a>
        <a target="_blank" rel="noopener noreferrer" href=" https://github.com/NYDF"><img id='github' src={github} /></a>
        <a target="_blank" rel="noopener noreferrer" href=" https://angel.co/u/dongfang-song"><img id='angellist' src={angellist} /></a>
        <a target="_blank" rel="noopener noreferrer" href=" https://nydf.github.io/"><img id='portfolio' src={portfolio} /></a>
        <a target="_blank" rel="noopener noreferrer" href=" https://aa-eriscord.onrender.com/"><img id='angellist' src={eriscord} /></a>
        <a target="_blank" rel="noopener noreferrer" href=" https://airbnb-aa.herokuapp.com/"><img id='portfolio' src={songbnb} /></a>
      </div>
    </>
  );
}

export default Footer;
