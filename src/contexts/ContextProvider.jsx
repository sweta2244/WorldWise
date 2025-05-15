import { useReducer } from "react";
import { MyContext } from "./useWorldWise";
const initialState = {
  email: "jack@example.com",
  password: "sweta",
  login: false,
  locationInfo: [],
  currentSelection: {
    city: "",
    country: "",
    position: null,
    countryCode: "",
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
      return {
        ...state,
        locationInfo: [
          ...state.locationInfo,
          {
            city: state.currentSelection.city,
            country: state.currentSelection.country,
            position: state.currentSelection.position,
            countryCode: state.currentSelection.countryCode,
            note: action.note,
            date: action.date,
          },
        ],
        currentSelection: {
          city: "",
          country: "",
          position: null,
          countryCode: "",
        },
      };
    case "form trigger when clicked":
      return {
        ...state,
        currentSelection: {
          ...state.currentSelection,
          city: action.city,
          country: action.country,
          position: action.position,
          countryCode: action.code,
        },
      };
    case "remove":
      return {
        ...state,
        locationInfo: state.locationInfo.filter(
          (_, idx) => idx !== action.index
        ),
      };
    case "logout":
      return {
        ...state,
        // email: null,
        // password: null,
        login: false,
      };
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
        locationInfo: state.locationInfo,
        currentSelection: state.currentSelection,
        dispatch,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}