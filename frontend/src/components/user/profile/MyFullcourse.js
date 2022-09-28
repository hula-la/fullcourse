import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyFullcourse } from '../../../features/user/userActions';
import MyFullcourseItem from './MyFullcourseItem';
import styled from 'styled-components';
import MyfullcourseItem from "./MyFullcourseItem";
import TitleText from './TitleText';


//carousel
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { makeStyles, useMediaQuery } from '@material-ui/core';

const Wrapper = styled.div`
  margin: 0 5vw;
  .slick-prev:before, .slick-next:before{
    color: #a4d8ff;
  } 
  p{
    text-align: left;
    font-family: Tmoney;
    font-size: 30px;
  }
  .slider{
    margin: 1vw auto;
    width: 90%;
  }
`;

const Flex = styled.div`
 display: flex;
 flex-direction: row;
 margin: 0 3vw;
`

const MyFullcourse = ({ userInfo }) => {

  const isMobile = useMediaQuery("(max-width: 767px)");

  const dispatch = useDispatch();
  const { myFullcourseList } = useSelector((state) => state.user);

  // carousel 설정
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1
  };

  useEffect(() => {
    dispatch(fetchMyFullcourse());
  }, [dispatch]);

  return (
    <Wrapper>
      <TitleText content="나의 풀코스"/>

      {myFullcourseList ? myFullcourseList.content.length >=3 ?
        <Slider className='slider' {...settings}>
          {myFullcourseList.content.map((fullcourse, index)=>{
            return <MyfullcourseItem  key={index} fullcourse={fullcourse}/>
          })}
          </Slider>
          :<Flex>
            {myFullcourseList.content.map((fullcourse, index) => {
              return <MyfullcourseItem key={index} fullcourse={fullcourse} />;
            })}
          </Flex>:null
        }
    </Wrapper>
  );
};

export default MyFullcourse;
