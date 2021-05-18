import React from 'react';
import DaysView from './DaysView.jsx';

const DaysList = ( { days } ) => (
  <>
    {days.map((day, index) => (
      <DaysView day={day} key={index} />
    ))}
  </>
);

export default DaysList;