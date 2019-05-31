import React from 'react';
import { Route } from 'react-router-dom';

import WelcomePage from './routes/WelcomePage/WelcomePage';
import LocationPage from './routes/LocationPage/LocationPage';

import './App.css';

import SurfContext from './SurfContext';

class App extends React.Component {
  state = {
    spots: [
      {
        key: "",
        text: "",
        value: ""
      }
    ],
    locationData: [],
    location: "",
    countyData: {},
    error: null,
  }

  setLocationData = (forecast, county) => {

    this.setState({
      locationData: forecast,
      location: forecast[0]["spot_name"],
      countyData: county
    })
  }

  componentDidMount() {
    const allspots = "http://api.spitcast.com/api/spot/all"

    fetch(allspots)
      .then(res => res.json())
      .then(resJ => resJ.map(spot => {
        return {
          key: spot["spot_id"],
          text: spot["spot_name"],
          value: `${spot["spot_id"]},${spot["county_name"]}`
        }
      }))
      .then(spotsArray => this.setState({
        spots: spotsArray
      }))
  }


  render() {
    const contextValue = {
      spots: this.state.spots,
      location: this.state.location,
      locationData: this.state.locationData,
      countyData: this.state.countyData,
      setLocationData: this.setLocationData
    }
    return (
      <SurfContext.Provider value={contextValue}>
        <div className="App">
          <Route exact path="/" component={WelcomePage} />
          <Route exact path="/forecast" component={LocationPage} />
        </div>
      </SurfContext.Provider>
    );
  }
}

export default App;
