import { useReducer } from "react";
import { MyContext } from "./useWorldWise";
const initialState = {
  email: null,
  password: null,
  login: false,
  locationInfo:[{
    city:"",
    country:"",
    position:null,
    date:"",
    note:""
  }],
  currentSelection: {
    city:"",
    country:"",
    position:null,
    date:"",
    note:"",
  },
};
function reducer(state, action) {
  switch (action.type) {
    case "login success":
      return {
        ...state,
        login: true,
      };
    case "login email":
      return {
        ...state,
        email: action.data,
      };
    case "login password":
      return {
        ...state,
        password: action.data,
      };
    case "set_location":
      return{
        ...state,
        locationInfo:[...state.locationInfo,action.currentSelection],
      };
    case "form trigger when clicked":
      return{
        ...state,
        currentSelection:{...state.currentSelection,city:action.city,country:action.country,position:action.position},
      }
    case "add clicked":
      return{
        ...state,
        currentSelection:{...state.currentSelection,date:action.date,note:action.note}
      }
    case "remove":
      return{
        ...state,
        locationInfo:state.locationInfo.map((info,idx)=>idx!==action.index && info),
      }
    case "logout":
      return{
        ...state,
        email:null,
        password:null,
        login:false,
      }
  }
}
export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MyContext.Provider
      value={{
        email: state.email,
        password: state.password,
        login: state.login,
        locationInfo:state.locationInfo,
        currentSelection:state.currentSelection,
        dispatch,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
