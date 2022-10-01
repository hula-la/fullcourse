import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkTag } from '../../features/share/shareSlice';
import styled from 'styled-components';

const TagBlock = styled.div`
  .listitem {
    border: #e36387 1px solid;
    border-radius: 20px;
    padding: 3px 10px;
    margin: 10px 4px;
    cursor: pointer;
    color: #e36387;
    font-weight: bold;
    transition: background-color 500ms;
    &:hover {
      background-color: #e36387;
      color: #ffffff;
      font-weight: bold;
    }
  }

  .tag-selected {
    background-color: #e36387;
    color: #ffffff;
  }
`;
const FullcourseTagItem = ({ tag, index }) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const { checkedTagList } = useSelector((state) => state.share);

  useEffect(() => {
    if (checkedTagList.includes(tag)) {
      setIsChecked(true);
    }
  });

  const onClick = () => {
    setIsChecked(!isChecked);
    dispatch(checkTag(tag));
  };

  return (
    <TagBlock>
      <div
        onClick={onClick}
        className={'listitem' + (isChecked ? ' tag-selected' : '')}
      >
        {index === 0 ? tag : '#' + tag}
      </div>
    </TagBlock>
  );
};

export default FullcourseTagItem;
