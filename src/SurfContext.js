import React from 'react'

const SurfContext = React.createContext({
    spots: [
        {
            key: "",
            text: "",
            value: ""
        }
    ],
    locationData: [],
    setLocationData: () => {

    },
    location: '',
    countyData: []
})

export default SurfContext