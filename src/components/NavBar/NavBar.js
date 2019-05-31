import React, { Component } from 'react';
import SearchDropdown from '../SearchDropdown';
import SurfContext from '../../SurfContext';
import { Link } from 'react-router-dom'

import './NavBar.css';

class NavBar extends Component {
    static contextType = SurfContext;
    render() {
        return (
            <div className="NavBar">
                <Link to='/'>
                    <h2>Wave Buddy</h2>
                </Link>
                <SearchDropdown spots={this.context.spots} />
            </div>
        );
    }
}

export default NavBar;