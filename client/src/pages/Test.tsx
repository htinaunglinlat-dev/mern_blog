import { decrement, increment } from "../redux/slices/countSlice";
import { useAppSelector, useAppDispatch } from "../redux/reduxHooks";

const Test = () => {
  const dispatch = useAppDispatch();
  // const count = useSelector((state: RootState) => state.counter.count)
  const count = useAppSelector(state => state.counter.count)
  console.log(count)
  console.log("Test rendered ...")
  return (
      <div className="h-32 flex justify-center items-center bg-slate-300 w-32 mx-auto my-5">
        <div className="p-3 bg-fuchsia-300 cursor-pointer" onClick={() => dispatch(decrement())}>-</div>
        <div className="p-3 bg-fuchsia-300 border-x-2 border-slate-500">{count}</div>
        <div className="p-3 bg-fuchsia-300 cursor-pointer" onClick={() => dispatch(increment())}>+</div>
      </div>
  )
}

export default Test