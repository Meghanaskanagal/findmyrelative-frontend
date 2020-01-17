export function shelterAction(props:any) {
  let responseValue: any = [];
  let properties = props;
  
  //return the actual action to do
  return function (dispatch: (arg0: { type: string; payload: any; }) => void) {
    fetch("http://localhost:8080/find/shelter/"+ properties.id)
      .then((response) => {
        if (response.ok) {
          // Returning the JSON response if HTTP status response code is 200/201
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            // Returns JSON object if the response is of type JSON.
            return response.json();
          } else {
            // Returns string if the response is of type string.
            return response.text();
          }
        } else {
          // Catch other HTTP status response.
          dispatch({ type: "HTTP_STATUS_RESPONSE_ERROR", payload: response.status.toString() });
          throw new Error(response.status.toString());
        }
      })
      .then(async (response) => {

          responseValue = {...properties, ...response.map.shelter.map};
          dispatch({ type: "SUCCESS", payload: responseValue });
      })
      .catch((error) => {
        console.log(error)
      });
  }

}