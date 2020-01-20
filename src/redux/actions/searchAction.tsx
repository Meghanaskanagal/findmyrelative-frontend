export function searchAction(name: String) {
  //return the actual action to do
  return function(dispatch: (arg0: { type: string; payload: any }) => void) {
    fetch("http://localhost:8080/find/victim/byName/" + name)
      .then(response => {
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

          dispatch({
            type: "HTTP_STATUS_RESPONSE_ERROR",
            payload: response.status.toString()
          });
          throw new Error(response.status.toString());
        }
      })
      .then(async response => {
        console.log(response);
        //   setVictimList(response.map.victims.list);
        //   setIsResponseOk(true);
        dispatch({ type: "SUCCESS", payload: response });
      })
      .catch(error => {
        console.log(error);
      });
  };
}
