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
   function fetchData (url: string) {
      fetch(url).
         then(res => res.json()).
         then(data => dispatch({type: "FETCH_SUCCESS", payload: data})).
         catch(error => dispatch({type: "FETCH_ERROR", payload: error.message}));
   }
   return [state, fetchData]
}

export default useFetch;