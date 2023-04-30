import {useState, useEffect} from 'react';

const useGet = (url, set) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                set(data)
            })
    })

    return {loading}
}

export default useGet;