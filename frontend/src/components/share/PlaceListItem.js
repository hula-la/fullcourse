import React from 'react';

const PlaceListItem = ({ placeKey, place }) => {
  return (
    <div>
      <p>{parseInt(placeKey) + 1}Day</p>
      {place.map((p, index) => {
        return <p key={index}>{p.place.name}</p>;
      })}
    </div>
  );
};

export default PlaceListItem;
