import PageLoading from "@/features/fallback/pages/PageLoading";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



export default function FetchStateToast({ children, hook, spinned=false, to }) {
    const { loading, error, setError, success, setSuccess } = hook;
    const navigate = useNavigate()

    // FIXME: hace falta useEffect en este caso?
    useEffect(() => {
        if (error?.code === 'TOKEN_EXPIRED'){
            navigate(`${window.location.pathname}?dialog=expiredsession`)
            return  <>{children}</>
        }

        if (error) {
            toast.error(error.message || 'Ocurrió un error');
            setError(null); // Limpiar el error después de mostrarlo
        }
    }, [error, setError]);

    useEffect(() => {
        if (success) {
            toast.success('Operación exitosa');
            setSuccess(false); // Limpiar el estado de éxito
        }
    }, [success, setSuccess]);

    if(spinned){
        return (
            <>
                {loading && <PageLoading />}
                {!success && !error && !loading && children}
            </>
        );
    }

    return (
        <>
            {children}
        </>
    );
}
