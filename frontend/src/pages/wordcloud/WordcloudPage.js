import React,{useState} from 'react';

import { useDispatch } from 'react-redux/es/exports';
import { createWordCloud } from './wcAction';

const WordcloudPage = () => {
  const dispatch = useDispatch()
  const [placeName, setPlaceName] = useState('')
  const handleSubmit= (e) => {
    
    dispatch(createWordCloud(placeName))
  }
  return (
    <div>
      효재를 위한 페이지
     
        <input
          onChange={(e) => setPlaceName(e.target.value)}
        >
          
        </input>
        <button onClick={handleSubmit}>테스트</button>
     
    </div>
  );
};

export default WordcloudPage;