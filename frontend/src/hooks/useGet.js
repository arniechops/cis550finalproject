import {useState, useEffect} from 'react';

const useGet = (url) => {
    const [loading, setLoading] = useState(true)
    const [response, setResponse] = useState()
    fetch(url)
        .then(res => res.json())
        .then(data => {
            setLoading(false)
            setResponse(data)
        })
        return {response, loading}
    }


export default useGet;