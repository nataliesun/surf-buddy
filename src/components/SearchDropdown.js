import React, { Component } from 'react';
import { withRouter } from "react-router";

import { Dropdown } from 'semantic-ui-react';
import SurfContext from '../SurfContext';

import { checkStatus, parseJSON } from '../helpers';


class SearchDropdown extends Component {
    static contextType = SurfContext;

    getLocationData = (locationString) => {
        const location = locationString.split(",")[0];
        const locationCounty = locationString.split(",")[1].replace(/\s+/g, '-').toLowerCase();

        const urls = [
            `http://api.spitcast.com/api/spot/forecast/${location}/`,
            `http://api.spitcast.com/api/county/water-temperature/${locationCounty}/`];

        Promise.all(urls.map(url =>
            fetch(url)
                .then(checkStatus)
                .then(parseJSON)
                .catch(error => {
                    alert('No data for location, please try another.')
                    console.log('There was a problem!', error)
                })
        ))
            .then(data => {
                this.context.setLocationData(data[0], data[1]);
                this.props.history.push('/forecast')
            })
            .catch(error => console.log('There was a problem!', error))
    }

    render() {

        return (
            <div className="Form">
                {/* find out a way to display after info loads */}
                <Dropdown
                    icon='search'
                    placeholder='Spot'
                    search
                    selection
                    options={this.props.spots}
                    onChange={(e, { value }) => this.getLocationData(value)}
                />

            </div>
        );
    }
}

export default withRouter(SearchDropdown);