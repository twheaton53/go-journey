import React from 'react';
import Plans from './Plans.jsx';

const ItineraryList = ( { itinerary } ) => (
  <>
    {itinerary.map((plan, index) => (
      <Plans plan={plan} key={index} />
    ))}
  </>
);

export default ItineraryList;