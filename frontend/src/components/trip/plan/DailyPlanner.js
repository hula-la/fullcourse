import React from 'react';

const DailyPlanner = ({tripDay}) => {

  const planData = []
  
  return (
    <div>
      <ul>
        <li>{tripDay}</li>
      </ul>
    </div>
  );
};

export default DailyPlanner;