/// <reference types="vite/client" />

interface InitialStateOfUseFetchHook {
   data: object[]; 
   loading: boolean;
   error: string;
}

type UseFetchHookType = () => [InitialStateOfUseFetchHook, (url: string) => void];

type ActionsTypeOfUseFetchHook = 
   | {type: "FETCH_START"}
   | {type: "FETCH_SUCCESS", payload: object[]}
   | {type: "FETCH_ERROR", payload: string}

type ReducerType<S,A> = (state: S, action: A) => S;