import { useReducer } from "react"

const initialState: InitialStateOfUseFetchHook = {
   data: [],
   loading: false,
   error: "",
}

const reducer: ReducerType<InitialStateOfUseFetchHook, ActionsTypeOfUseFetchHook> = (state, action) => {
   switch (action.type) {
      case "FETCH_START":
         return {
         ...state,
            error: "",
            loading: true,
         }
      case "FETCH_SUCCESS":
         return {
         ...state,
            loading: false,
            data: action.payload,
         }
      case "FETCH_ERROR":
         return {
         ...state,
            loading: false,
            error: action.payload,
         }
      default:
         return state
   }
}

const useFetch: UseFetchHookType = () => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const fetchData: FetchDataType = async (url, method = "GET", data) => {
      try{
         dispatch({type: "FETCH_START"})
         const response = await fetch(url, {
            method,
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
         })
         const responseData = await response.json();
         dispatch({type: "FETCH_SUCCESS", payload: responseData})
         return responseData;
      } catch (error: any) {
         dispatch({type: "FETCH_ERROR", payload: error.message})
         throw new Error(error.message);
      }
   }
   return [state, fetchData]
}

export default useFetch;



// const fetchData: FetchDataType = (url, method = "GET", data) => {
   //    dispatch({type: "FETCH_START"})
   //    return fetch(url, {
   //       method,
   //       headers: {
   //          'Content-Type': 'application/json',
   //       },
   //       body: JSON.stringify(data),
   //    })
   //       .then(res => res.json())
   //       .then((data: object[] | object) => dispatch({type: "FETCH_SUCCESS", payload: data}))
   //       .catch(error => {
   //          console.warn("hi", error.message)
   //          dispatch({type: "FETCH_ERROR", payload: error.message})
   //       });
   // }