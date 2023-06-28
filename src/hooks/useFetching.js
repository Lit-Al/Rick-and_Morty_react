import { useState } from "react";

export const useFetching = (cb) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetching = async () => {
        try {
            setIsLoading(true)
            await cb()
        } catch (e) {
            setError(e.message)
        }
    }
    return [fetching, isLoading, error]
}