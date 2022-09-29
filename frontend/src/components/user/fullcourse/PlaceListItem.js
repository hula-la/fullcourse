import React, { useEffect } from 'react';

const PlaceListItem = ({ placeKey, place }) => {
  useEffect(() => {
    console.log(place);
  });
  return (
    <div>
      <p>{parseInt(placeKey) + 1}Day</p>
      {place.map((p, index) => {
        return (
          <div>
            <p key={index}>{p.place.name}</p>
            <button>멤</button>
          </div>
        );
      })}
    </div>
  );
};

export default PlaceListItem;
