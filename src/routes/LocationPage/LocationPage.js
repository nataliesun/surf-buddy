import React, { Component } from 'react';

import { colors } from "../../colors.js";

import { Line } from 'react-chartjs-2';
import SurfContext from '../../SurfContext.js';
import NavBar from '../../components/NavBar/NavBar.js';





class LocationPage extends Component {
    static contextType = SurfContext;

    state = { activeIndex: -1 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    getMinAndMaxFt = (array) => {
        let min = array[0].size;
        let max = array[0].size;
        this.context.locationData.forEach(hour => {
            let current = hour.size;

            if (current < min) {
                min = current
            }
            if (current > max) {
                max = current
            }
        });
        if (min === max) {
            return `${min}ft`
        }
        return `${min}-${max}ft`;
    }



    render() {

        const { locationData, location, countyData } = this.context;
        const data = {
            labels: locationData.map(h => h.hour),
            datasets: [{
                label: "Wave height (ft)",
                backgroundColor: colors.med,
                borderColor: colors.dark,
                data: locationData.map(h => h.size),
                borderWidth: 2
            }]
        }
        const options = {
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                        // OR //
                        beginAtZero: true,
                        max: 7  // minimum value will be 0.
                    }
                }]
            }
        }

        return (
            <section className="forecast-display">
                <NavBar />

                {/* {this.state.error && <div className="error">{this.state.error}</div>} */}
                {this.context.locationData.length === 0 && (
                    <h3>Select a location from the search box</h3>
                )}
                {this.context.locationData.length > 0 && (
                    <div className="ui vertical stripe segment">
                        <div className="ui text container">
                            <h2>{location}</h2>
                            <Line data={data} options={options} />
                        </div>
                        <div className="ui header">
                            <h3>Wave height: {this.getMinAndMaxFt(locationData)}</h3>
                            <div className="temp">
                                <p>Water temp: {countyData.fahrenheit}°F</p>
                                <p>
                                    Recommended: {countyData.wetsuit}
                                </p>


                            </div>

                        </div>
                    </div>
                )}
            </section>
        );
    }
}

export default LocationPage;