import { useCallback, useEffect, useState } from "react"
import { APIType, DataType } from "../types/data"

const apiUrl = import.meta.env.VITE_API_URL

const useFetch = (api: APIType, { limit = 5, offset = 0 }) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<DataType>()

    const fetchAll = useCallback(async () => {
        setLoading(true)
        const get = await fetch(`${apiUrl}${api}/records?limit=${limit}&offset=${offset}`)
        const res = await get.json()
        if (res) {
            console.log(res)
            setData(res)
            setLoading(false)
        }
    }, [api, limit, offset])

    useEffect(() => {
        fetchAll()
    }, [fetchAll])

    return { data, loading }
}

export default useFetch
