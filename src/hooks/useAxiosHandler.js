import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { store } from "store";

const useAxiosHandler = (timeout = 30000) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const controller = useRef(new AbortController());
  useEffect(() => {
    return function cleanup() {
      controller.current.abort();
    };
  }, [timeout]);

  const post = (url, data) => {
    setLoading(true);
    controller.current = new AbortController();
    const requestOptions = {
      method: "POST",
      url: url,
      data: data,
      signal: controller.current.signal,
      timeout: timeout,
      headers: {
        Authorization: "Bearer " + store.getState().oauth.token,
      },
    };
    setLoading(true);
    axios
      .request(requestOptions)
      .then((response) => {
          setData(response.data);
      })
      .catch(function (e) {
        
          setError(true);
          setErrorMessage(e.message);
          setLoading(false);
          if (axios.isCancel(e)) {
            console.log(`Request cancelled: ${e.message}`);
            post(url,data);
            
          } else {
            console.log("Another error happened: " + e.message);
          }
        
      }).finally(()=>{
        setLoading(false);
      })
  };

  const onCancel = () => {
    controller.current.abort();
  };

  return {
    data,
    loading,
    error,
    errorMessage,
    handlers: {
      post,
      onCancel,
    },
  };
};
export { useAxiosHandler }