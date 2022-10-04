import React,{useState, useEffect}  from 'react';
import styled from 'styled-components';
import { likePlace, deletePlace } from '../../../features/survey/surveySlice';
import { useSelector, useDispatch } from 'react-redux';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FaCommentDots } from 'react-icons/fa';
import { GoHeart } from 'react-icons/go';

import ReactWordcloud from "react-wordcloud";
import { createWordCloud } from '../../../features/wordcloud/wcAction';


const options = {
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [5, 60],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 1,
  rotations: 3,
  rotationAngles: [0, 90],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000
};

const Wrapper = styled.div`
  
  position: relative;

  
  
  
  /* 카드 뒤집기 효과 추가 */
  /* overflow: hidden; */
  .card {
    
  width: 100%; 
  height: 100%; 
  position: relative;
  transition: .4s;
  transform-style: preserve-3d;

}	

.front, .back {
  overflow: hidden;
  border-radius: 1rem;
    box-shadow: 1px 1px 5px darkgrey;
    background: white;

  position: absolute;
  width: 100%; 
  height: 100%;
  backface-visibility: hidden;
}

/* .front {
  background: red; 
} */

// 뒷면은 사전에 미리 뒤집기
.back { 
  /* background: royalblue;  */
  transform: rotateY(180deg);
}

// 호버 시 뒤집기
:hover .card {
  transform: rotateY(180deg);
}
/* --------------------- */


  animation: flip-vertical-right 0.7s cubic-bezier(0.455, 0.03, 0.515, 0.955)
    both;

  @keyframes flip-vertical-right {
    0% {
      -webkit-transform: rotateY(-180deg);
      transform: rotateY(-180deg);
    }
    100% {
      -webkit-transform: rotateY(0deg);
      transform: rotateY(0deg);
    }
  }

  height: 100%;
  width: 18rem;
  margin: 0 1rem;

  @media (min-width: 375px) and (max-width: 800px) {
    height: 98%;
    width: 15rem;
    margin: 0 0.8rem;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 800px) {
    .placeTag {
      white-space: nowrap;
      overflow-x: scroll;
      padding: 0 0.5rem;
    }
  }

  .placeTag::-webkit-scrollbar {
    /* display: hidden; */
    width: 10px;
  }

  @media only screen and (max-device-width: 800px) {
    .placeTag::-webkit-scrollbar-thumb {
      background-color: transparent;
    }
  }

  @media only screen and (min-device-width: 800px) {
    .placeTag::-webkit-scrollbar-thumb {
      background-color: #dc3e5a;
      border: 3px solid white;
      border-radius: 10px;
    }
  }


  /* .placeTag::-webkit-scrollbar-track{
border-radius: 10px;    

} */

  .placeTag {
    max-height: 30%;
    overflow: scroll;
  }


  img {
    width: 100%;
  }

  .cardHead {
    padding: 1rem 0;
    display: flex;
    justify-content: center;

    div {
      width: 10%;
    }
    .placeName {
      width: 60%;
      font-size: 1.2rem;
      font-weight: bold;
    }
    .button {
      padding: 0;
      cursor: pointer;
      color: #dc3d59;
      width: 1.5rem;
      height: 1.5rem;
    }

    .button:hover {
      transform-origin: center center;
      transform: scale(1.1);
    }
  }
`;

const Tag = styled.div`
  font-size: 0.9rem;
  border: 2px solid #dc3d59;
  border-radius: 1rem;
  display: inline-block;
  padding: 0.1rem 0.4rem;
  margin: 0.3rem;
  color: #dc3d59;
`;

const CardFooter = styled.div`
  position: absolute;
  bottom: 1.2rem;
  left: 1.5rem;

  display: flex;
  align-items: center;
  p {
    margin: 0 1rem 0 0.4rem;
  }
`;

const Like = styled(GoHeart)`
  color: #e36387;
  font-size: 2.5vmin;
`;

const Comment = styled(FaCommentDots)`
  color: #e36387;
  font-size: 2.2vmin;
`;

const RecommendCard = ({ place, index }) => {
  const dispatch = useDispatch();
  const { recommendPlaceList } = useSelector((state) => state.survey);
  const { likePlaceIndex } = useSelector((state) => state.survey);
  const [words, setWords] = useState('')

  useEffect(() => {
    console.log(place.name);
    dispatch(createWordCloud(place.name))
      .then((result) => {
        // setWords(result.payload.entries)
        let data = Object.entries(result.payload).map((entry) => {
          return {
            text: entry[0],
            value: entry[1]
          };
        });

        setWords(data);
      })
  },[])

  // useEffect(() => {
  //   console.log(words)
  // }, [words])

  const onClickAdd = (index, e) => {
    //  이미 선택한 장소면 삭제
    if (likePlaceIndex.includes(place.placeId)) {
      dispatch(deletePlace(recommendPlaceList[index]));
    }
    //  선택한 것이 아니면
    else {
      // 최대 갯수를 넘지 않으면 추가
      if (likePlaceIndex.length == 5) alert('최대 장소 선택갯수를 채웠습니다.');
      else {
        dispatch(likePlace(recommendPlaceList[index]));
      }
    }
  };

  return (
    <Wrapper>
      <div className='card'>
        {/* 앞면 */}
        <div className='front'>
          <img src={place.imgUrl} />
          <div className="cardHead">
            <div></div>
            <div className="placeName">{place.name}</div>
            <div>
              <div className="button" onClick={(e) => onClickAdd(index, e)}>
                {likePlaceIndex.includes(place.placeId) ? (
                  <AddCircleIcon />
                ) : (
                  <AddCircleOutlineIcon />
                )}
              </div>
            </div>
          </div>
          <div className="placeTag">
            {place.tag.split(',').map((tag) => {
              return <Tag>#{tag}</Tag>;
            })}
          </div>
          <CardFooter>
            <Like /> <p>{place.likeCnt}</p>
            <Comment /> <p>{place.reviewCnt}</p>
          </CardFooter>

        </div>
{/* 뒷면 */}
        <div className='back'>
        <ReactWordcloud options={options} words={words} />

        </div>

      </div>
    </Wrapper>
  );
};

export default RecommendCard;
