import { useState, useCallback, useRef, useEffect } from 'react';
import nprogress from 'nprogress';

export const useAsync = (asyncFunction, options = {}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    // Guardamos la función y las opciones en refs para evitar recrear execute en cada render
    const asyncFnRef = useRef(asyncFunction);
    const optionsRef = useRef(options);

    useEffect(() => {
        asyncFnRef.current = asyncFunction;
        optionsRef.current = options;
    }, [asyncFunction, options]);

    const execute = useCallback(async (...args) => {
        nprogress.start();
        setLoading(true);
        setError(null);

        try {
            const result = await asyncFnRef.current(...args);
            setData(result);
            optionsRef.current.onSuccess?.(result);
            optionsRef.current.onRefresh?.();
            return result;
        } catch (err) {
            setError(err);
            optionsRef.current.onError?.(err);
            throw err;
        } finally {
            setLoading(false);
            nprogress.done();
        }
    }, []);

    return { execute, loading, error, data };
};