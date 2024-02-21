import {useEffect, useState} from "react";
import {profileType} from "@/components/Types/ProfileType";

export function useProfile(){
    const [data, setData] = useState<profileType>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch('/api/profile').then(response => {
            response.json().then(data => {
                setData(data)
                setLoading(false)
            })
        })
    }, [])

    return {loading, data}
}