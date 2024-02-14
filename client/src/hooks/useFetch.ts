// import { useReducer } from "react"
import { useAppDispatch } from "../redux/reduxHooks";
import { fetch_fail, fetch_start, fetch_success } from "../redux/slices/userSlice";

// const initialState: InitialStateOfUseFetchHook = {
//    data: [],
//    loading: false,
//    error: "",
// }

// const reducer: ReducerType<InitialStateOfUseFetchHook, ActionsTypeOfUseFetchHook> = (state, action) => {
//    switch (action.type) {
//       case "FETCH_START":
//          return {
//          ...state,
//             error: "",
//             loading: true,
//          }
//       case "FETCH_SUCCESS":
//          return {
//          ...state,
//             loading: false,
//             data: action.payload,
//          }
//       case "FETCH_ERROR":
//          return {
//          ...state,
//             loading: false,
//             error: action.payload,
//          }
//       default:
//          return state
//    }
// }

// const useFetch: UseFetchHookType = () => {
//    const [state, dispatch] = useReducer(reducer, initialState);
//    const fetchData: FetchDataType = async (url, method = "GET", data) => {
//       try{
//          dispatch({type: "FETCH_START"})
//          const response = await fetch(url, {
//             method,
//             headers: {
//                'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//          })
//          const responseData = await response.json();
//          dispatch({type: "FETCH_SUCCESS", payload: responseData})
//          return responseData;
//       } catch (error: any) {
//          dispatch({type: "FETCH_ERROR", payload: error.message})
//          throw new Error(error.message);
//       }
//    }
//    return [state, fetchData]
// }

// export default useFetch;

const useFetch = () => {
   const dispatch = useAppDispatch();
   const fetchData: FetchDataType = async (url, method = "GET", data) => {
      try {
         dispatch(fetch_start())
         const response = await fetch(url, {
            method,
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
         })
         const userData = await response.json()
         
         if(userData.success == false) {
            dispatch(fetch_fail(userData.message))
         } else {
            dispatch(fetch_success(userData))
         }
         return userData;
      } catch (error: any) {
         dispatch(fetch_fail(error.message))
         return error.message
      }
   }
   return fetchData
}

export default useFetch;

// 13AT