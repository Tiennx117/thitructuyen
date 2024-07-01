import { Card } from "primereact/card";
import { BsFlagFill } from "react-icons/bs";
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { setindex30s } from "store/perFormExam/perFormExam";
import PropTypes from 'prop-types';
import './exam.scss';
import { upDateDataLocal } from "./upDateLocalTime";
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';
import { setTextCountDown,settime5s } from "store/perFormExam/perFormExam";
const ClockInner = forwardRef((props, _ref) => {
  const [useID] = useState(getCurrentUserDefault().UserId)
  const [count, setCount] = useState(props.time || 0);
  const [count5, setCount5] = useState(props.time || 0);
  const [count30, setCount30] = useState(props.time || 0);
  const offautosb = useSelector(state => state.exam.offautosb);
  const nodeID = useSelector(state => state.exam.NodeIDRedux);
  const dispatch = useDispatch();
  const textCountDown = useSelector(state => state.exam.textCountDown);
  const visibleDialog1 = useSelector(state => state.exam.visibleDialog);
  //const [index, setindex] = useState(0);
  const index30ssub = useSelector(state => state.exam.index30s);
  useEffect(() => {
    setCount(props.time)
    setCount5(props.time)
    setCount30(props.time)
  }, [props.time]);

  useEffect(() => {

    const interval = setInterval(() => {
      setCount((data) => {
        let newCount = data - 1;
        //index++
        //newCount = newCount >= 0 ? newCount : 0
        upDateDataLocal(useID,nodeID,newCount,visibleDialog1)
        if (newCount == 0) {
          props.onChange(newCount)
        }
        if ((props.timdeDF - newCount) == 5) {
          props.setautosubmissionlefttime(newCount)
        }
        return newCount;
      })
    }, 1000);
    const interval1 = setInterval(() => {
      setCount5((data) => {
        let newCount = data - 5;
        // const action = setindex30s(index30ssub+1)
        // dispatch(action);
        //index++
        //newCount = newCount >= 0 ? newCount : 0

        // const action = settime5s(newCount)
        // dispatch(action);
        // console.log('newCount',newCount)
        // upDateDataLocal(useID,nodeID,newCount,visibleDialog1)
        // props.settimelocal(newCount)
        return newCount;
      })
    }, 5000);
    const interval2 = setInterval(() => {
      setCount30((data) => {
        let newCount = data - 30;
        // const action = setindex30s(index30ssub+1)
        // dispatch(action);
        //index++
        //newCount = newCount >= 0 ? newCount : 0
        props.settime30s(newCount)
        return newCount;
      })
    }, 30000);
    // const interval1 = setInterval(() => {
    //   setCount5((data) => {
    //     let newCount = data - 5;
    //     // const action = setindex30s(index30ssub+1)
    //     // dispatch(action);
    //     //index++
    //     //newCount = newCount >= 0 ? newCount : 0
        
        
    //     props.settimelocal(newCount)
    //     return newCount;
    //   })
    // }, 5000);


    return () => {
      clearInterval(interval);
      clearInterval(interval1);
      clearInterval(interval2);
    };

  }, [props.time]);

  useImperativeHandle(_ref, () => ({
    getTimeCountDown: () => {
      return count;
    }
  }));

  function format(time) {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    let m = minutes
    let s = seconds
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    if (s > 0 || m > 0) {
      const action = setTextCountDown(minutes + ':' + seconds)
      dispatch(action);
      return minutes + ':' + seconds;
    }
    else {
      const action = setTextCountDown('HẾT GIỜ')
      dispatch(action);
      return 'HẾT GIỜ'
    }

  }
  return (
    <div className="displayedTime" style={{ }}>
      <h2>{format(count)}</h2>
    </div>
  )
})

const CountDown = (props) => {
  const { time } = props
  console.log('time', time)
  //const [ datacountdown,setdatacountdown]=useState()
  const [datatimes, setdatatimes] = useState(parseInt(time))
  function startTimer(times) {
    let seconds = times % 60;
    let minutes = Math.floor(times / 60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    setInterval(() => {
      const newCount = times - 1;
      setdatatimes(newCount)
      //props.onChange(newCount)
    }, 1000);
    return minutes + ':' + seconds;
  }
  //props.onChange(datatime)
  // useEffect(() => {
  //     console.log(datatime)
  //     //props.onChange()
  // }, [startTimer])
  useEffect(() => {
    startTimer(datatimes);
    //props.onChange()
  }, [time])
  return (
    <>
      <span className="text-time">{startTimer(datatimes)}</span>
    </>
  )
}
ClockInner.propTypes = {
  onChange: PropTypes.func,
  setautosubmissionlefttime: PropTypes.func,
  settimelocal: PropTypes.func,
  settime30s: PropTypes.func,
};
ClockInner.defaultProps = {
  onChange: () => { },
  setautosubmissionlefttime: () => { },
  settimelocal: () => { },
  settime30s: () => { },
}
const Clock = React.memo(ClockInner);
export { Clock, CountDown }
//export default CountDown;
