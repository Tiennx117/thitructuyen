import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from 'store/counter/counterSlice';
const CounterExample =()=>{
    const dispatch = useDispatch();
    const counterValueStore = useSelector(state => state.counter.value) || 0;
    const incrementButton = ()=>{
        dispatch(increment());
    }
    const decrementButton = ()=>{
        console.log('aa',counterValueStore)
        dispatch(decrement());
    }
    return(<>
    {counterValueStore}

    <button onClick={incrementButton}>+</button>
    <button onClick={decrementButton}>-</button>
    </>)
}
export default CounterExample;