/// <reference types="vite/client" />

interface InitialStateOfUseFetchHook {
   data: object[] | object | {
      success: boolean;
      statusCode: number;
      message: string;
   };
   loading: boolean;
   error: string;
}

// type FetchDataType = (url: string, method: string, data: object[] | object) => Promise<any>;
type FetchDataType = (url: string, method: string, data: object[] | object) => Promise<any>;
// type UseFetchHookType = () => [InitialStateOfUseFetchHook, FetchDataType];

type ActionsTypeOfUseFetchHook = 
   | {type: "FETCH_START"}
   | {type: "FETCH_SUCCESS", payload: object[]}
   | {type: "FETCH_ERROR", payload: string}

type ReducerType<S,A> = (state: S, action: A) => S;