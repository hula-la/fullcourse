import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import FullcourseTag from '../../components/share/SharedFcTag';
import SharedFcList from '../../components/share/SharedFcList';
import TitleText from '../../components/user/profile/TitleText';
import { fetchSharedFc } from '../../features/share/shareActions';
import { Pagination } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Wrapper = styled.div`
  margin: 0 20%;
  input {
    width: 20vw;
    height: 30px;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 3px;
    font-size: 1rem;
    text-align: center;
    border: none;
    background-color: rgba(217, 239, 255, 1);
    font-family: Tmoney;
    outline: none;
  }
`;

const Input = styled.input``;
const Button = styled.button`
  margin-bottom: 4vh;
  @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
    margin: 2vh 0;
  }
  outline: 0;
  padding: 5px;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  font-size: 1rem;
  background: linear-gradient(
    90deg,
    rgba(217, 239, 255, 1) 100%,
    rgba(164, 216, 255, 1) 100%
  );
  box-shadow: 3px 3px 5px rgba(164, 216, 255, 0.64);
  color: darkslategray;
  border: solid 2px #ffffff00;
  &:hover {
    background: #ffffff;
    color: #4b94ca;
    border-color: #4b94ca;
    transition: 0.3s;
  }
`;

const FullcourseShare = () => {
  const dispatch = useDispatch();
  const { sharedFcList } = useSelector((state) => state.share);
  const { checkedTagList } = useSelector((state) => state.share);
  const { checkedDayTagList } = useSelector((state) => state.share);
  const [maxPageNum, setMaxPageNum] = useState(null);
  const [pageNum, setPageNum] = useState(0);
  const [place, setPlace] = useState('검색어를 입력하세요');

  useEffect(() => {
    if (sharedFcList !== null) {
      let tmp = sharedFcList.totalElements;
      let result = parseInt(tmp / 9);
      let remainder = tmp % 9;
      console.log(result, remainder);
      if (remainder === 0) {
        setMaxPageNum(result);
      } else {
        setMaxPageNum(result + 1);
      }
    }
  }, [sharedFcList]);

  useEffect(() => {
    dispatch(
      fetchSharedFc({ checkedTagList, checkedDayTagList, place, pageNum }),
    );
  }, [dispatch, checkedTagList, checkedDayTagList, pageNum]);

  const onClickPage = (e) => {
    const nowPage = parseInt(e.target.outerText);
    console.log(nowPage);
    setPageNum(nowPage - 1);
  };

  const onClickSearch = (e) => {
    setPlace(e.target.value);
  };

  const onFocus = (e) => {
    setPlace('');
  };

  return (
    <div>
      <Wrapper>
        <TitleText className="ttl" content="풀코스 검색"></TitleText>
        <input
          placeholder={place}
          onFocus={onFocus}
          onClick={onClickSearch}
        ></input>
        <SearchOutlinedIcon />
        <Button>검색</Button>
      </Wrapper>

      <FullcourseTag />

      <SharedFcList />

      {sharedFcList ? (
        <Pagination
          count={maxPageNum}
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
          defaultPage={1}
          boundaryCount={2}
          onChange={onClickPage}
        />
      ) : null}
    </div>
  );
};

export default FullcourseShare;
