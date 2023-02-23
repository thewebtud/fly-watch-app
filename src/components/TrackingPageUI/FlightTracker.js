import React, { useState } from "react";
import axios from "axios";
import FlightMap from "../Mapbox/FlightMap";

function FlightTracker() {
  const [flightData, setFlightData] = useState(null);
  const [icao24, setIcao24] = useState("");

  const handleTrackFlight = async () => {
    try {
      const response = await axios.get(
        `https://opensky-network.org/api/states/all?icao24=${icao24}&time=0`
      );
      setFlightData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={icao24}
        onChange={(e) => setIcao24(e.target.value)}
      />
      <button onClick={handleTrackFlight}>Track Flight</button>
      {flightData && (
        <div>
          <p>Flight: {flightData.states[0][1] || 0}</p>
          <p>Latitude: {flightData.states[0][6] || 0}</p>
          <p>Longitude: {flightData.states[0][5]}</p>

          {console.log({ flightData })}

          <FlightMap longitude={flightData.states[0][5] || 72} latitude={flightData.states[0][6] || 37} />

        </div>
      )}
    </div>
  );
}

export default FlightTracker;
