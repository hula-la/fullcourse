import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlaceList from '../../../components/user/fullcourse/PlaceList';
import {
  checkAllDay,
  checkDay,
  makeDayTagList,
} from '../../../features/share/shareSlice';
import styled from 'styled-components';
import { dropFc } from '../../../features/trip/tripActions';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchMyFullcourse } from '../../../features/share/shareActions';

const Side = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30%;
  height: 89vh;
  background-color: #dfefff;
  #userInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 1rem 0.5rem 0.5rem 0.5rem;
    padding: 0.6rem 0.5rem 0.5rem 0.5rem;
    font-size: small;
    /* font-weight: ; */
  }

  #imgBlock {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #profileImg {
    width: 3.5rem;
    height: 3.5rem;
    margin-right: 1rem;
    margin: 0 auto;
    border-radius: 5rem;
  }

  #userName {
    margin-left: 0.5rem;
  }
  #fullcourseInfo {
    display: flex;
    margin: auto 0;
    padding: 0.6rem 0.5rem 0rem 0.5rem;
    font-size: 1.5rem;
    border-bottom: 4px solid #0aa1dd;
    align-items: center;
    justify-content: center;
    height: fit-content;
  }
  #info-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: row;
    height: 22%;
  }
  .daynonelist {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-left: 0px;
  }

  .daylistitem {
    overflow-y: auto;
    border: #0aa1dd 1px solid;
    border-radius: 20px;
    padding: 3px 10px;
    margin: 10px 4px;
    font-size: small;
    font-weight: bold;
    cursor: pointer;
    color: #0aa1dd;
    transition: background-color 500ms;
    &:hover {
      background-color: #0aa1dd;
      color: #ffffff;
      font-weight: bold;
    }
  }

  .daytag-selected {
    z-index: 3;
    opacity: 1;
    background-color: #0aa1dd;
    color: #ffffff;
    font-size: small;
    font-weight: bold;
  }
`;
const Plan = styled.div`
  /* border: 1px solid #333333; */
  border-radius: 1rem;
  padding: 1rem;
  height: 76%;
  margin: 0.6rem;
  box-shadow: -1px 1px 5px 1px #0000029e;
  background-color: #fff;
`;

const Button = styled.div`
  /* width: 30%; */
  padding: 3px;
  background-color: #fff;
  border: 2px solid #d9efff;
  border-radius: 5rem;
  text-align: center;
  font-size: 0.9rem;
  width: 4vw;
  height: 4vh;
  margin-top: 8.5vh;
  /* line-height: 4vh; */

  cursor: pointer;
  &:hover {
    border: 2px solid #f73131;
    transition: 0.3s;
  }
`;

const FullcourseSide = ({ days, userInfo, fullcourseDetail }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const fcId = params.fcId;
  const { dayTagList2 } = useSelector((state) => state.share);
  const { checkedDay } = useSelector((state) => state.share);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    if (fullcourseDetail) {
      const start = new Date(fullcourseDetail.startDate);
      const end = new Date(fullcourseDetail.endDate);
      const startSplit = start.toDateString().split(' ');
      const endSplit = end.toDateString().split(' ');
      const months = {
        Jan: '1',
        Feb: '2',
        Mar: '3',
        Apr: '4',
        May: '5',
        Jun: '6',
        Jul: '7',
        Aug: '8',
        Sep: '9',
        Oct: '10',
        Nov: '11',
        Dec: '12',
      };
      setStartDate(months[startSplit[1]] + '.' + startSplit[2]);
      setEndDate(months[endSplit[1]] + '.' + endSplit[2]);
    }
  }, [fullcourseDetail]);

  const onClickDelete = async () => {
    Swal.fire({
      title: '정말 삭제하시겠습니까?',
      imageUrl: '/img/boogie.jpg',
      imageWidth: 400,
      imageHeight: 280,
      imageAlt: 'character',
      showCancelButton: true,
      showCloseButton: true,
      cancelButtonText: '취소',
      confirmButtonText: '삭제',
      showLoaderOnConfirm: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { payload } = await dispatch(dropFc(fcId));
        if (payload.message === 'Success') {
          Swal.fire({
            icon: 'success',
            title: '삭제 완료!',
            showConfirmButton: false,
            timer: 1500,
          }).then(async (result) => {
            await dispatch(fetchMyFullcourse());
            navigate('/user/profile/1');
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: '삭제 실패!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  useEffect(() => {
    dispatch(makeDayTagList(days));
  }, [days]);

  const onClickTags = (index, e) => {
    dispatch(checkDay(index));
  };

  const onClickTagsAll = (e) => {
    dispatch(checkAllDay());
  };
  return (
    <Side>
      {userInfo && fullcourseDetail ? (
        <div id="info-wrapper">
          {/* <div id="userInfo">
            <div id="imgBlock">
            <img id="profileImg" src={userInfo.imgUrl} alt="profileImg" />
            </div>
            <p id="userName">{userInfo.nickname}</p>
            
          </div> */}
          <div id="fullcourseInfo">
            {startDate} → {endDate}
          </div>

          <Button onClick={onClickDelete}>삭제</Button>
          {/* {userInfo && userInfo.email === fullcourseDetail.email ? (
          
          ) : null} */}
        </div>
      ) : null}
      <Plan>
        <ul className="daynonelist">
          <li
            className={
              'daylistitem' + (checkedDay === 6 ? ' daytag-selected' : '')
            }
            onClick={onClickTagsAll}
          >
            <div>All</div>
          </li>
          {dayTagList2.map((tag, index) => {
            return (
              <li
                className={
                  'daylistitem' +
                  (checkedDay === index ? ' daytag-selected' : '')
                }
                key={index}
                onClick={(e) => onClickTags(index, e)}
              >
                <div id={tag.tag}>{tag}</div>
              </li>
            );
          })}
        </ul>

        {fullcourseDetail ? (
          <PlaceList placeList={fullcourseDetail.places} />
        ) : null}
      </Plan>
    </Side>
  );
};

export default FullcourseSide;
