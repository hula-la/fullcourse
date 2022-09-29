import React from 'react';
import PlaceListItem from './PlaceListItem';

const PlaceList = ({ placeList }) => {
  return (
    <div>
      {placeList ? (
        <>
          {Object.keys(placeList).map((placeKey, index) => {
            return (
              <PlaceListItem
                key={index}
                placeKey={placeKey}
                place={placeList[placeKey]}
              />
            );
          })}
        </>
      ) : null}
    </div>
  );
};

export default React.memo(PlaceList);
