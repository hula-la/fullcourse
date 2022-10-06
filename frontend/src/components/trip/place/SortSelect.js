import React, { useState, useRef, useEffect } from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 7px;
  display: flex;
  justify-content: center;
  .selectBox2 * {
    box-sizing: border-box;
  }
  .selectBox2 {
    position: relative;
    width: 8vw;
    height: 4vh;
    border-radius: 3rem;
    border: 1px solid #0aa1dd;
    background-color: rgba(217, 239, 255, 1);
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
    cursor: pointer;
    z-index: 1;
  }
  .selectBox2:before {
    content: '▾';
    position: absolute;
    top: 50%;
    font-size: 20px;
    color: #0aa1dd;
    transform: translateY(-50%);
    right: 10px;
    z-index: -1;
  }
  .selectBox2:after {
    content: '';
    display: block;
    width: 1px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 35px;
    background-color: #0aa1dd;
  }

  .selectBox2 .select-btn {
    display: flex;
    align-items: center;
    width: inherit;
    height: inherit;
    border: 0 none;
    outline: 0 none;
    padding-left: 15px;
    background: transparent;
    cursor: pointer;
  }

  .selectBox2 .optionList {
    position: absolute;
    top: 28px;
    left: 0;
    width: 100%;
    background: #d9efff;
    color: #0aa1dd;
    font-size: 15px;
    list-style-type: none;
    padding: 0;
    border-radius: 1rem;
    overflow: hidden;
    max-height: 0;
    transition: 0.3s ease-in;
  }

  .selectBox2 .optionList::-webkit-scrollbar {
    width: 6px;
  }
  .selectBox2 .optionList::-webkit-scrollbar-track {
    background: transparent;
  }
  .selectBox2 .optionList::-webkit-scrollbar-thumb {
    color: #0aa1dd;
    border-radius: 45px;
  }
  .selectBox2 .optionList::-webkit-scrollbar-thumb:hover {
    background: #d9efff;
  }

  .selectBox2.active .optionList {
    max-height: 500px;
  }

  .selectBox2 .optionItem {
    border-bottom: 1px dashed #0aa1dd;
    padding: 5px 15px 5px;
    transition: 0.1s;
  }

  .selectBox2 .optionItem:hover {
    background: #d9efff;
  }

  .selectBox2 .optionItem:last-child {
    border-bottom: 0 none;
  }
`;

const SortSelect = ({
  sort,
  setSort,
  setSortReq,
  placeType,
  setPageNum,
  setMaxDist,
  setRecentLat,
  setRecentLng,
  setKeyword,
}) => {
  const [sortItem, setSortItem] = useState([]);
  //여행
  const defaultSortItem = [
    {
      type: 'mention',
      name: 'SNS언급순',
    },
    {
      type: 'likeCnt',
      name: '좋아요순',
    },
    {
      type: '',
      name: '기본순',
    },
    {
      type: 'addedCnt',
      name: '담긴순',
    },
    {
      type: 'reviewCnt',
      name: '리뷰순',
    },
    {
      type: 'reviewScore',
      name: '별점순',
    },
  ];

  //맛집
  const sortItem1 = [
    {
      type: 'naverScore',
      name: 'Naver평점',
    },
    {
      type: 'likeCnt',
      name: '좋아요순',
    },
    {
      type: '',
      name: '기본순',
    },
    {
      type: 'addedCnt',
      name: '담긴순',
    },
    {
      type: 'reviewCnt',
      name: '리뷰순',
    },
    {
      type: 'reviewScore',
      name: '별점순',
    },
  ];
  //축제, 문화, 액티비티
  const sortItem2 = [
    {
      type: 'likeCnt',
      name: '좋아요순',
    },
    {
      type: '',
      name: '기본순',
    },
    {
      type: 'addedCnt',
      name: '담긴순',
    },
    {
      type: 'reviewCnt',
      name: '리뷰순',
    },
    {
      type: 'reviewScore',
      name: '별점순',
    },
  ];
  const [isActive, setIsActive] = useState(false);

  const showOptions = () => {
    if (placeType === 'travel') {
      setSortItem(defaultSortItem);
    } else if (placeType === 'restaurant') {
      setSortItem(sortItem1);
    } else if (placeType === 'custom') {
    } else {
      setSortItem(sortItem2);
    }

    setIsActive(!isActive);
  };

  const onClcikSort = (e) => {
    // setKeyword('')
    setPageNum(0);
    setMaxDist(0);
    setRecentLat(0);
    setRecentLng(0);
    setSort(e.target.getAttribute('value'));
    if (placeType === 'custom') {
      setSortReq('');
    } else {
      sortItem.map((item, idx) => {
        if (item.name === e.target.getAttribute('value')) {
          setSortReq(item.type);
        }
      });
    }
    setIsActive(!isActive);
  };

  useEffect(() => {}, [sort, sortItem, placeType]);

  return (
    <Wrapper>
      <div className={isActive ? 'selectBox2 active' : 'selectBox2'}>
        <button className="select-btn" onClick={showOptions}>
          {sort}
        </button>
        <ul className="optionList">
          {sortItem.map((item, index) => {
            return (
              <li
                key={index}
                value={item.name}
                className="optionItem"
                onClick={onClcikSort}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    </Wrapper>
  );
};

export default SortSelect;
