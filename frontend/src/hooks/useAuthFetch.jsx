import axios from 'axios';
import { useState } from 'react';

const useAuthFetch = ({ api }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    async function onFetchHandler(dataToPost) {
        setIsLoading(true); // Start loading
        setError(null); // Reset error state
        try {
            const res = await axios.post(api, dataToPost);
            setData(res.data);
           
        } catch (err) {
            console.log(err)
            if (err.response) {
                if (err.response.status === 422) {
                    setError("User not found");
                } else if (err.response.status === 401) {
                    setError("Unauthorized access");
                } else if (err.response.status === 409) {
                    setError("User has already signed up");
                } else {
                    setError("Server not responding, please try again!");
                }
            } else {
                setError("Network error, please check your connection.");
            }
        } finally {
            setIsLoading(false); // End loading
        }
    }

    return { onFetchHandler, data, error, isLoading };
};

export default useAuthFetch;
