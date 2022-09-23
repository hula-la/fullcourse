import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkDayTag } from '../../features/share/shareSlice';
import styled from 'styled-components';

const TagBlock = styled.div`
  .daylistitem {
    border: #0aa1dd 1px solid;
    border-radius: 20px;
    padding: 3px 10px;
    margin: 10px 4px;
    cursor: pointer;
    color: #0aa1dd;
    font-weight: bold;
    transition: background-color 500ms;
    &:hover {
      background-color: #0aa1dd;
      color: #ffffff;
      font-weight: bold;
    }
  }

  .daytag-selected {
    background-color: #0aa1dd;
    color: #ffffff;
    font-weight: bold;
  }
`;
const SharedFcDayTagItem = ({ tag }) => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  const onClick = () => {
    setIsChecked(!isChecked);
    dispatch(checkDayTag(tag));
  };
  return (
    <TagBlock>
      <div
        onClick={onClick}
        className={'daylistitem' + (isChecked ? ' daytag-selected' : '')}
      >
        {tag}
      </div>
    </TagBlock>
  );
};

export default SharedFcDayTagItem;
