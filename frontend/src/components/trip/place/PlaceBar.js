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
  overflow-y: scroll ;
`;

const PlaceName = styled.div``;

const PlusBtn = styled.button``;

const PlaceBar = () => {
  const dispatch = useDispatch();

  const { travelPlaceList, placeItem } = useSelector((state) => state.trip);

  // const PLACE_TYPES = {
  //   travel: "travel"
  // }
  // const placeItem = []
  const addPlaceToPlanner = (placeId,placeName, e) => {
    e.preventDefault()
    let placeItemObj = new Object()
    placeItemObj.placeId = placeId
    placeItemObj.placeName = placeName
    placeItemObj.draggable = true

    dispatch(setPlaceItem(placeItemObj))
    // placeItem.push(placeItemObj);
    // console.log("어떻게 될까",placeItem)

    // const placeItem = document.createElement('div')
    // placeItem.className = 'list-item'
    // placeItem.setAttribute('placeId', placeId) //이거 들어가니까 placeid로 바뀌네
    // placeItem.setAttribute('draggable', true)
    // placeItem.innerHTML = `<div class="item-content">${placeName}</div></div><div class="item-actions"><i class="material-icons delete">delete</i>`;
    // console.log(placeId)
    // console.log(placeName)
    // console.log(placeItem)
    // document.querySelector('.bucket').appendChild(placeItem);
    // document.querySelector('.planner-list').appendChild(placeItem); 한번에 두개의 클래스에 넣으니깐 왜 에러나지
  }

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
                      onClick={(e)=> addPlaceToPlanner(item.placeId,item.name, e)}
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
