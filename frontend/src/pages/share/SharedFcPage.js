import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FullcourseTag from '../../components/share/SharedFcTag';
import SharedFcList from '../../components/share/SharedFcList';
import { fetchSharedFc } from '../../features/share/shareActions';
import { Pagination } from '@mui/material';
// import styled from 'styled-components';

const FullcourseShare = () => {
  const dispatch = useDispatch();
  const { sharedFcList } = useSelector((state) => state.share);
  const { checkedTagList } = useSelector((state) => state.share);
  const { checkedDayTagList } = useSelector((state) => state.share);
  const [maxPageNum, setMaxPageNum] = useState(null);
  const [pageNum, setPageNum] = useState(0);
  const [place, setPlace] = useState('');

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

  return (
    <div>
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
