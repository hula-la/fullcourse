import React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { fetchTravelPlace } from '../../../features/trip/tripActions';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import { setPlaceItem } from '../../../features/trip/tripSlice';

const PlaceContainer = styled.div`
  border: 1px solid;
  height: 87vh;
`;
const PlaceOverview = styled.div``;

const PlaceList = styled.div`
  border: 1px solid;
  height: 80vh;
  overflow-y: scroll;
`;

const PlaceName = styled.div``;

const PlusBtn = styled.button``;

const PlaceBar = () => {
  const dispatch = useDispatch();

  const { travelPlaceList } = useSelector((state) => state.trip);

  // const PLACE_TYPES = {
  //   travel: "travel"
  // }
  // const placeItem = [] //슬라이스를 안쓰니까 담는 클릭을 할 때마다 placeItem이 초기화됨
  const addPlaceToPlanner = (placeId, placeName, placeImg, id, e) => {
    e.preventDefault();
    let placeItemObj = new Object();
    placeItemObj.placeId = placeId;
    placeItemObj.name = placeName;
    placeItemObj.imgUrl = placeImg;
    placeItemObj.draggable = true;
    placeItemObj.id = id;

    dispatch(setPlaceItem(placeItemObj));
  };

  useEffect(() => {
    //아무것도 선택안하고 일정생성할때 기본 장소리스트(여행지)
    //  console.log(PLACE_TYPES['travel'])
    const PLACE_TYPES = {
      travel: 'travel',
    };
    dispatch(fetchTravelPlace(PLACE_TYPES['travel']));
  }, []);

  return (
    <PlaceContainer className="place-container">
      <PlaceOverview className="place-overview">
        <PlaceList className="place-list">
          {travelPlaceList &&
            travelPlaceList.map((item, idx) => (
              <Card
                variant="outlined"
                className="place-card"
                id={item.placeId}
                row
                sx={{
                  minWidth: '320px',
                  gap: 2,
                  '&:hover': {
                    boxShadow: 'md',
                    borderColor: 'neutral.outlinedHoverBorder',
                  },
                }}
              >
                <AspectRatio ratio="1" sx={{ width: 90 }}>
                  <img src={item.imgUrl} alt="" />
                </AspectRatio>
                <Box>
                  <Box sx={{ ml: 0.5 }}>
                    <PlaceName>{item.name}</PlaceName>

                    <PlusBtn
                      className="plus" //heart대신 plus
                      id={item.placeId}
                      onClick={(e) =>
                        addPlaceToPlanner(
                          item.placeId,
                          item.name,
                          item.imgUrl,
                          idx,
                          e,
                        )
                      } //여기에
                    >
                      장바구니에넣기
                    </PlusBtn>
                  </Box>
                </Box>
              </Card>
            ))}
        </PlaceList>
      </PlaceOverview>
    </PlaceContainer>
  );
};

export default PlaceBar;
