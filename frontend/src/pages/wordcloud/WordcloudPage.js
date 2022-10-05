import React,{useState, useEffect} from 'react';
import ReactWordcloud from "react-wordcloud";
import { useDispatch } from 'react-redux/es/exports';
import { createWordCloud } from '../../features/wordcloud/wcAction';

const options = {
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [5, 60],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 1,
  rotations: 3,
  rotationAngles: [0, 90],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000
};


const WordcloudPage = () => {
  const dispatch = useDispatch()
  const [placeName, setPlaceName] = useState('')
  const [words, setWords] = useState('')

  const onClick = () => {
    dispatch(createWordCloud(placeName))
      .then((result) => {
        // setWords(result.payload.entries)
        let data = Object.entries(result.payload).map((entry) => {
          return {
            text: entry[0],
            value: entry[1]
          };
        });

        setWords(data);
      })
  }

  useEffect(() => {
    console.log(words)
  }, [words])

  return (
    <div>
      효재를 위한 페이지
    
        <input
          onChange={(e) => setPlaceName(e.target.value)}
        >
          
        </input>
      <button onClick={onClick}>테스트</button>
      
      <div style={{ height: 400, width: 600 }}>
        <ReactWordcloud options={options} words={words} />
      </div>
    
    </div>
  );
};

export default WordcloudPage;