import React, { useState } from 'react';
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
const FullcourseTagItem = ({ tag, onClickTag }) => {
  const [isChecked, setIsChecked] = useState(false);

  const onClick = () => {
    setIsChecked(!isChecked);
    onClickTag(tag);
  };

  return (
    <TagBlock>
      <div
        onClick={onClick}
        className={'listitem' + (isChecked ? ' tag-selected' : '')}
      >
        # {tag}
      </div>
    </TagBlock>
  );
};

export default FullcourseTagItem;
