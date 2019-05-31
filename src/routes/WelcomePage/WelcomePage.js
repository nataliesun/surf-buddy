import React, { Component } from 'react';
import SearchDropdown from '../../components/SearchDropdown';
import SurfContext from '../../SurfContext';

import './WelcomePage.css'

class WelcomePage extends Component {
    static contextType = SurfContext;

    render() {
        return (
            <div className="WelcomePage">
                <div className="content">
                    <h2>Wave Buddy</h2>
                    <SearchDropdown spots={this.context.spots} />
                </div>
            </div>
        );
    }
}

export default WelcomePage;