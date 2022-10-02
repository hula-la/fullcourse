import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { createSharedFc } from '../../../features/share/shareActions';
import EditIcon from '@mui/icons-material/Edit';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { initializeConnect } from 'react-redux/es/components/connect';

const AlertDiv = styled.div`
  .modal {
    text-align: center;
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .modal button {
    outline: none;
    cursor: pointer;
    border: 0;
  }
  .modal > section {
    width: 90%;
    max-width: 450px;
    margin: 0 auto;
    border: solid 3px;
    border-radius: 1rem;
    border-color: #4b94ca;
    /* background-color: black; */
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show 0.3s;
    overflow: hidden;
  }
  .modal > section > header {
    position: relative;
    padding: 16px 50px 16px 50px;
    background-color: #ffffff;
    font-weight: 700;
    border-bottom: solid 2px #e3e3e3;
  }
  .modal > section > header button {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    background-color: transparent;
  }
  .modal > section > main {
    padding: 16px;
    background-color: #ffffff;
    border-top: 1px solid #ffffff;
  }
  .modal > section > main form {
    display: flex;
    flex-direction: column;
  }
  .modal > section > main form > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px;

    input,
    textarea {
      margin-top: 10px;
      outline: none;
      font-size: 15px;
      font-family: Tmoney;
      text-align: center;
    }
    label {
      display: flex;
      align-items: center;
      margin-right: 20px;
      text-align: left;
      span {
        margin-left: 8px;
        font-size: 1.2rem;
      }
      .msg {
        font-size: 0.8rem;
      }
      .err {
        color: red;
      }
    }

    #title,
    #content {
      height: 3vh;
      border: none;
      border-bottom: 2px solid #000;
    }
    #title:focus,
    #content:focus {
      border: none;
      border-bottom: 2px solid #4b94ca;
    }
    #content {
      height: 10vh;
    }
  }

  .modal > section > main button {
    padding: 6px 12px;
    background-color: #ffffff;
    border-radius: 5px;
    font-size: 13px;
    margin: 10px;
  }
  .modal > section > footer {
    padding: 0px 16px 16px;
    background-color: #ffffff;

    text-align: right;
  }
  .modal > section > footer button {
    padding: 6px 12px;
    background-color: #ffffff;
    border-radius: 5px;
    font-size: 13px;
  }
  .modal.openModal {
    display: flex;
    align-items: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.3s;
  }
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const Button = styled.button`
  margin-bottom: 4vh;
  outline: 0;
  padding: 5px;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  font-size: 0.8rem;
  background: linear-gradient(
    90deg,
    rgba(217, 239, 255, 1) 100%,
    rgba(164, 216, 255, 1) 100%
  );
  box-shadow: 3px 3px 5px rgba(164, 216, 255, 0.64);
  color: darkslategray;
  border: solid 2px #ffffff00;
  &:hover {
    background: #ffffff;
    color: #4b94ca;
    border-color: #4b94ca;
    transition: 0.3s;
  }
`;
const MyFullcourseShare = (props) => {
  const { open, close, header, fullcourse } = props;
  const dispatch = useDispatch();
  const [fullcourseTags, setFullcourseTags] = useState(['부산']);
  const [inputs, setInPuts] = useState({
    title: '',
    content: '',
  });
  const [days, setDays] = useState(null);
  const [inputMessage, setInputMessage] = useState('(0/500)');
  const [isErr, setIsErr] = useState(false);

  useEffect(() => {
    const startDate = fullcourse.startDate.slice(0, 10);
    const endDate = fullcourse.endDate.slice(0, 10);

    const arr1 = startDate.split('-');
    const arr2 = endDate.split('-');

    const start = new Date(arr1[0], arr1[1], arr1[2]);
    const end = new Date(arr2[0], arr2[1], arr2[2]);

    const tmp = days_between(start, end);
    setDays(tmp);
    setInputMessage('(0/500)');
  }, [fullcourse]);

  //일 수 세기
  const days_between = (date1, date2) => {
    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;
    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1 - date2);
    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY) + 1;
  };

  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setInPuts({ ...inputs, [name]: value });
  };

  const checkContent = (e) => {
    setInputMessage('(' + e.target.value.length + '/500)');
    if (e.target.value.length > 500) {
      setIsErr(true);
    } else {
      setIsErr(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createSharedFc({
        day: days,
        fcId: fullcourse.fcId,
        title: inputs.title,
        detail: inputs.content,
        tags: fullcourseTags,
        thumbnail: fullcourse.thumbnail,
      }),
    );
  };

  const initInputMsg = () => {
    setInputMessage('(0/500)');
  };
  return (
    <AlertDiv>
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <header>
              {header}
              <button
                className="close"
                onClick={() => {
                  close();
                  initInputMsg();
                }}
              >
                <CloseIcon />
              </button>
            </header>
            <main>
              <form onSubmit={onSubmit}>
                <div>
                  <label>
                    <EditIcon />
                    <span>제목</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={onChangeInputs}
                  />
                </div>
                <div>
                  <label>
                    <CommentOutlinedIcon />
                    <span>내용</span>
                    <span className={isErr ? 'msg err' : 'msg'}>
                      {inputMessage}
                    </span>
                  </label>
                  <textarea
                    type="text"
                    id="content"
                    name="content"
                    onChange={(e) => {
                      onChangeInputs(e);
                      checkContent(e);
                    }}
                  />
                </div>
                <footer>
                  <Button>공유하기</Button>
                </footer>
              </form>
            </main>
          </section>
        ) : null}
      </div>
    </AlertDiv>
  );
};
export default MyFullcourseShare;
