import styled from 'styled-components';

const MemoBlock = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  background-image: url('/img/memo.jpg');
`;

const PlaceWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 15%;
  margin: 10px 15px;
  align-items: center;
  justify-content: space-around;
  div {
    width: 100%;
    text-align: left;
  }
  .day {
    font-size: 1.2rem;
  }
  .name {
    font-size: 1.5rem;
  }
  .visit {
    width: 100%;
    text-align: left;
    width: fit-content;
    left: 0;
    padding: 5px;
    border-radius: 1rem;
    font-size: 0.8rem;
    background-color: #fff;
    box-shadow: 3px 3px 5px rgba(164, 216, 255, 0.64);
    color: #0aa1dd;
  }
`;
const MemoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 85%;
  padding: 0 15px;
  padding-bottom: 15px;
  border-top: 2px solid #0aa1dd;
`;

const Img = styled.div`
  height: 50%;
  margin-top: 15px;
  .img {
    height: 100%;
  }
  img {
    border-radius: 1rem;
    height: 100%;
    width: 100%;
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.3);
    object-fit: cover;
  }
`;

const Comment = styled.div`
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  border-radius: 1rem;
  border: 3px dashed #0aa1dd;
  background-color: #fff;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.3);
  font-size: 1.2rem;
`;

const FullcourseMemo = ({ placeKey, place }) => {
  return (
    <MemoBlock>
      <PlaceWrapper>
        <div className="day">1 Day</div>
        <div className="name">자갈치시장</div>
        <div>
          <span className="visit">방문 인증완료 </span>
        </div>
      </PlaceWrapper>
      <MemoWrapper>
        <Img>
          <div className="img">
            <img src="/img/boogie.jpg" />
          </div>
        </Img>
        <Comment>
          <div className="commnet">
            부기와 함께하는 자갈치 시장
            <br /> 오이소보이소사이소!
          </div>
        </Comment>
      </MemoWrapper>
    </MemoBlock>
  );
};

export default FullcourseMemo;
