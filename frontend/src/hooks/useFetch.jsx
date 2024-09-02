import React, { useEffect, useState } from "react";
import axios from "axios";

const useFetch = ({ api, data }) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(api, data);
        setFetchedData(res.data);
      } catch (err) {
        console.error(err);
        setError(
          err.response ? err.response.data : { message: "An error occurred" }
        );
      }
    };
console.log(fetchData)
    fetchData();
  }, [api, JSON.stringify(data)]); // Use JSON.stringify to create a stable reference for objects

  return { fetchedData, error };
};

export default useFetch;
