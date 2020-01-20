let responseValue1: any = [];
let responseValue2: any = [];
let responseValue: any = [];


export function searchAction(name: String) {
  //return the actual action to do
  return function (dispatch: (arg0: { type: string; payload: any; }) => void) {
    fetch('http://localhost:8080/find/victim/byName/' + name)
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
        if (response.map.victims.list.length === 0) {
          responseValue1 = {};
          responseValue2 = {};
          responseValue = { ...responseValue1, ...responseValue2 };
          dispatch({ type: "SUCCESS", payload: responseValue });
        } else {
          responseValue1 = response.map.victims.list[0].map;
          const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }
          let token = "pk.eyJ1IjoibWVnaGFuYXNrYW5hZ2FsIiwiYSI6ImNrMXExdmU5ZjEyYWczY3FvZmw2dm9oamwifQ.qDuxo-hNK1XTwOGDRsvSTA";
          let longitude = response.map.victims.list[0].map.lon;
          let latitude = response.map.victims.list[0].map.lat;
          let host = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?`

          const res = await fetch(host + new URLSearchParams({
            access_token: token || ""
          }), requestOptions);
          const responseValue2 = await res.json();

          responseValue = { ...responseValue1, ...responseValue2 };
          dispatch({ type: "SUCCESS", payload: responseValue });

        }
      })
      .catch((error) => {
        console.log(error)
      });
  }
}