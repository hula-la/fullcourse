import React from 'react';
import styled from 'styled-components';
import './main.css';

const Container = styled.div`
  animation: fadeInUp 2s;
`;


const FullCourseList = () => {
  return (
    <div>
      {/* card fadeinup 시도해보자 */}
      <Container>
        <p>

          풀코스리스트
        </p>
      </Container>
    </div>
  );
};

export default FullCourseList;