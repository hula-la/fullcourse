import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import TitleText from '../user/profile/TitleText';
import SharedFcDayTagItem from './SharedFcDayTagItem';
import FullcourseTagItem from './SharedFcTagItem';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Wrapper = styled.div`
  padding: 20px;
  max-width: 1320px;
  margin: 0 auto;

  .ttl {
    padding: 10px;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: start;
  }

  .tag {
    display: none;
    height: 0;

    /* display: flex; */
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    width: 70%;
    margin: 0 auto;
    padding: 20px 0;
    /* border-bottom: 2px solid #d9d9d9; */
    background-color: #ffff;
    border-radius: 1rem;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
    animation: fadeInUp 2s;
  }
  .open{
    display: flex;
    height: auto;
    border-radius: 0 0 1rem 1rem;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    width: 70%;
    margin: 0 auto;
    padding: 20px 0;
    /* border-bottom: 2px solid #d9d9d9; */
    background-color: #ffff;
    /* border-radius: 1rem; */
    border-radius: 0 0 1rem 1rem;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
    animation: fadeInDown 0.5s;
  }

  .nonelist {
    list-style: none;
    display: flex;

    flex-wrap: wrap;
    justify-content: start;
    margin: 0px 0px;
  }

  .tag-open{
    display: flex;
    width: 70%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 1rem 1rem 0 0;
    flex-direction: column;
  }
  .tag-close{
    display: flex;
    width: 70%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 1rem;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .selected{
    width: 70%;
    margin: 0 auto;
    background-color: #fff;
    /* border-radius: 1rem; */
    border-radius: 1rem 1rem 0 0;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
    padding-right:40px;
    margin-bottom:3vh;
    margin: 1rem;
    padding:0.8rem;
  }
  .selected-open{
    width: 70%;
    margin: 0 auto;
    background-color: #fff;
    /* border-radius: 1rem; */
    border-radius: 1rem 1rem 0 0;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
    padding-right:40px;
    margin-bottom:3vh;
    margin: 1rem;
  }
  .selected-list{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0;
  }

  .daynonelist {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    margin: 0;
  }
  .nonelist > li:first-child {
    width: 100px;
    div > div {
      color: #fff;
      background-color: #e36387;
    }
    pointer-events: none;
  }

  .daynonelist > li:first-child {
    width: 100px;
    div > div {
      color: #fff;
      background-color: #0aa1dd;
    }
    pointer-events: none;
  }

  .btn-select{
    border-radius: 4rem;
    border: 2px solid #dc3d59;
    padding: 2px 8px;
    color: #dc3d59;
    margin: 0.8rem;
  }
  .icon{
    color: #000000;
}
`;

const Text = styled.div`
  background: url('/img/baseline.png') no-repeat;
  background-position-x: 0;
  height: 100%;
  font-family: Tmoney;
  color: #333333;
  padding: 0;
`;

const FullcourseTag = () => {
  const { tagList } = useSelector((state) => state.share);
  const { dayTagList } = useSelector((state) => state.share);
  const { checkedTagList } = useSelector((state) => state.share);
  const [open, setOpen] = useState(false);

  useEffect(()=>{},[open])

  return (
    <Wrapper>
      <div className="tag-close"> 
        <ul className="daynonelist">
          {dayTagList.map((tag, index) => {
            return (
              <li key={index}>
                <SharedFcDayTagItem tag={tag} />
              </li>
            );
          })}
        </ul>
      </div>

      <div className={open?"tag-open":"tag-close"}>
      <div className='btn-select' onClick={()=>setOpen(!open)}>{open?"닫기":"태그 선택"}</div>
        <ul className="selected-list">
          {checkedTagList && checkedTagList.length > 0 ? checkedTagList.map((tag,index)=>{
            return(
            <div>
              <FullcourseTagItem  tag={tag} index={index}/>
              </div>)
            }):null}
        </ul>
      </div>

      <div className={open?"tag open":"tag"}>
        {tagList.map((arr, index) => {
          return (
            <ul className="nonelist" key={index}>
              {arr.map((tag, index) => {
                return (
                  <li key={index}>
                    <FullcourseTagItem tag={tag} index={index} />
                  </li>
                );
              })}
            </ul>
          );
        })}
        
      </div>
    </Wrapper>
  );
};

export default FullcourseTag;
