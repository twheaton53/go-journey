import React from 'react';
import { Accordion } from 'react-bootstrap';
import DaysView from './DaysView.jsx';

const DaysList = ( { days, viewItinerary, dayId } ) => (
  <>
    {days.map((day, index) => (
      <DaysView day={day} key={index} viewItinerary={viewItinerary} dayId={dayId} />
    ))}
  </>
);

export default DaysList;