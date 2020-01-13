const initState = {
    name: "VICTIM_NAME"
  }
  
  const mapReducers = (state = initState, action: any) => {
    switch (action.type) {
      case "SUCCESS":
        return {
              ...state, 
              name: action.payload
        }
        case "HTTP_STATUS_RESPONSE_ERROR":
        return {
          ...state, 
              name: action.payload
        }
      default:
        return state;
    }
  };
  
  export default mapReducers;