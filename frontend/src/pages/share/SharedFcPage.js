import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import FullcourseTag from '../../components/share/SharedFcTag';
import SharedFcList from '../../components/share/SharedFcList';
import SortSelect from '../../components/share/SortSelect';
import TitleText from '../../components/user/profile/TitleText';
import { fetchSharedFc } from '../../features/share/shareActions';
import { Pagination } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Wrapper = styled.div`
  margin: 0 20%;
  position: relative;
  .icon {
    position: relative;
    right: 50px;
    top: 5px;
    cursor: pointer;
  }
`;
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;
`;

const Input = styled.input`
  width: 32vw;
  min-width: 200px;
  height: 40px;
  margin: 10px;
  padding: 3px;
  font-size: 1rem;
  text-align: center;
  border: 0.5px solid #0aa1dd;
  border-radius: 5rem;
  background-color: rgba(217, 239, 255, 1);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
  font-family: Tmoney;
  outline: none;
  &:focus {
    background-color: #eef8ff;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 30%);
    transition: 0.5s;
  }
  .input {
  }
`;
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
  const { howSort } = useSelector((state) => state.share);
  const [maxPageNum, setMaxPageNum] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [place, setPlace] = useState('');

  useEffect(() => {
    if (sharedFcList !== null) {
      let tmp = sharedFcList.totalElements;
      let result = parseInt(tmp / 9);
      let remainder = tmp % 9;
      if (remainder === 0) {
        setMaxPageNum(result);
      } else {
        setMaxPageNum(result + 1);
      }
    }
  }, [sharedFcList]);

  useEffect(() => {
    dispatch(
      fetchSharedFc({
        checkedTagList,
        checkedDayTagList,
        place,
        pageNum: 0,
        howSort,
      }),
    );
    setPageNum(1);
  }, [dispatch, checkedTagList, checkedDayTagList, howSort]);

  useEffect(() => {
    dispatch(
      fetchSharedFc({
        checkedTagList,
        checkedDayTagList,
        place,
        pageNum: pageNum - 1,
        howSort,
      }),
    );
  }, [dispatch, pageNum]);

  const onClickPage = (e) => {
    const nowPage = parseInt(e.target.outerText);
    setPageNum(nowPage);
  };

  const onClickSearch = (e) => {
    setPageNum(1);
    dispatch(
      fetchSharedFc({
        checkedTagList,
        checkedDayTagList,
        place,
        pageNum: 0,
        howSort,
      }),
    );
    window.scrollTo(0, 0);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClickSearch();
    }
  };

  const onFocus = (e) => {
    e.target.placeholder = '';
  };

  const onChange = (e) => {
    setPlace(e.target.value);
    if (e.target.value.length == 0) {
      e.target.placeholder = '가고싶은 장소를 입력하세요';
    }
  };

  return (
    <div>
      <Wrapper>
        <TitleText className="ttl" content="풀코스 검색"></TitleText>
        <div className="input">
          <Input
            placeholder="가고싶은 장소를 입력하세요"
            onFocus={onFocus}
            onChange={onChange}
            onKeyPress={onKeyPress}
          ></Input>

          <SearchOutlinedIcon className="icon" onClick={onClickSearch} />
        </div>
      </Wrapper>

      <FullcourseTag />
      <SortSelect />
      <SharedFcList />

      <PaginationWrapper>
        {sharedFcList ? (
          <Pagination
            page={pageNum}
            count={maxPageNum}
            color="primary"
            showFirstButton
            showLastButton
            defaultPage={1}
            boundaryCount={2}
            onChange={onClickPage}
          />
        ) : null}
      </PaginationWrapper>
    </div>
  );
};

export default FullcourseShare;
