import React from 'react';
import styled from 'styled-components';
import '../../pages/main/main.css';

import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Avatar from '@mui/joy/Avatar';
import CardOverflow from '@mui/joy/CardOverflow';
import { FaCommentDots } from 'react-icons/fa';
import { GoHeart } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
// mui에서 미디어쿼리 사용하는 방법
import { makeStyles, useMediaQuery } from '@material-ui/core';
import { getUserInfo } from '../../api/user';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  cardMobile: {
    // 테스트용 css
    // width: '100%',
  },
}));

const Wapper = styled.div`
  margin: 1vw;
  @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
    width: 100%;
  }

  .scrollBar::-webkit-scrollbar {
    width: 10px;
  }

  .scrollBar::-webkit-scrollbar- {
    background-clip: padding-box;

    background-color: rgba(217, 239, 255, 1);
    /* 스크롤바 둥글게 설정    */
    border-radius: 1rem;
    border: 4px solid transparent;
    width: 5px;
  }

  /* 스크롤바 뒷 배경 설정*/

  .scrollBar::-webkit-scrollbar-track {
    border-radius: 10px;
  }
`;

const Nickname = styled.div`
  font-family: Tmoney;
  font-size: 1.5vmin;
  color: #333333;
  text-align: center;
`;

const CardTitle = styled.div`
  font-family: Tmoney;
  font-size: 2.5vmin;
  @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
    font-size: 3.5vmin;
  }
  color: #333333;
  margin-top: 1vh;
  padding-right: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CardContent = styled.div`
  font-family: Tmoney;
  font-size: 1.5vmin;

  color: #333333;
  margin-top: 1vh;
  height: 55px;
  overflow: hidden;
  height: calc(1.5vmin * 4);
  max-height: 55px;
  min-height: 26px;
  text-overflow: clip;
  white-space: break-spaces;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;

  span {
    font-family: Tmoney;
    font-size: 1.5vmin;
    margin-right: 1vw;
    margin-left: 0.5vw;
  }
`;

const Like = styled(GoHeart)`
  color: #e36387;
  font-size: 2.5vmin;
`;
const Comment = styled(FaCommentDots)`
  color: #e36387;
  font-size: 2.2vmin;
`;

const Tags = styled.div`
  overflow-x: auto;
  display: -webkit-box;
  min-height: 52px;
  margin-top: 1vh;
`;

const Tag = styled.div`
  font-size: 0.9rem;
  border: 2px solid #dc3d59;
  border-radius: 1rem;
  width: fit-content;
  padding: 0.1rem 0.4rem;
  margin: 0.3rem;
  color: #dc3d59;
  height: fit-content;
`;
const CardComponent = (props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`../../../fullcourse/detail/${props.fullcourse.sharedFcId}`);
  };

  return (
    <Wapper>
      <Card
        onClick={onClick}
        className={isMobile ? classes.cardMobile : null}
        variant="soft"
        sx={{
          width: '14.5vw',
          minWidth: '200px',
          // boxShadow: '0px 2px 4px 0px rgb(0 0 0 / 10%);' }}, 스투비플래너 카드 예시
          boxShadow: '1px 2px 4px 1px rgb(0 0 0 / 10%);',
          marginTop: '1vh',
          ':hover': {
            boxShadow: '0px 3px 9px 5px rgb(0 0 0 / 10%);',
          
            cursor: 'pointer',
          },
        }}
      >
        <CardOverflow>
          <AspectRatio ratio="3">
            <img src={props.fullcourse.thumbnail} alt="card main img" />
          </AspectRatio>

          <Avatar
            src={props.fullcourse.user.imgUrl}
            size="lg"
            sx={{
              position: 'absolute',
              zIndex: 2,
              right: '50%',
              bottom: 0,
              transform: 'translate(50%, 50%)',
              border: '2px solid white',
            }}
          ></Avatar>
        </CardOverflow>
        <CardOverflow
          variant="soft"
          sx={{
            background: 'white',
            display: 'flex-column',
            textAlign: 'start',
            // gap: 1.5,
            py: 3,
            px: 'var(--Card-padding)',
            // borderTop: '1px solid',
            // borderColor: 'neutral.outlinedBorder',
            // bgcolor: 'background.level1',
            marginTop: '0',
            paddingTop: '4vh',
          }}
        >
          <Nickname>{props.fullcourse.user.nickname}</Nickname>
          <CardTitle>{props.fullcourse.title}</CardTitle>
          <CardContent>{props.fullcourse.detail}</CardContent>
          <Tags className="scrollBar">
            {props.fullcourse.sharedFCTags.map((tag) => {
              return <Tag>#{tag.tagContent}</Tag>;
            })}
          </Tags>
          <CardFooter>
            <Like />
            <span>{props.fullcourse.likeCnt}</span>
            <Comment />
            <span>{props.fullcourse.commentCnt}</span>
          </CardFooter>
        </CardOverflow>
      </Card>
    </Wapper>
  );
};

export default CardComponent;
