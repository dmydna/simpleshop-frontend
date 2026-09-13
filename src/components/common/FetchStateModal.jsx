import FallbackError from "@/features/fallback/components/FallbackError";
import FallbackSuccess from "@/features/fallback/components/FallbackSuccess";
import PageLoading from "@/features/fallback/pages/PageLoading";
import { useUrlState } from "@/hooks/useUrlState";
import { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



export default function FetchStateModal({ children, hook, version = false, onSuccess = null }) {

    const { loading, error, setError, success, setSuccess } = hook;
    const { setSearchParams } = useUrlState()

    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        
        if (error?.code === 'TOKEN_EXPIRED'){
            navigate(`${window.location.pathname}?dialog=expiredsession`)
            return  <>{children}</>
        }

        if (success == true || error){
            setShow(true)
        }

    }, [error, success]);


    const versionHandle = () => {
        if(version)
        setSearchParams(prev => ({...prev, pageVersion: Date.now()}))
    }


    return (
        <>
            {children}
            <Modal
                backdrop="static" 
                keyboard={false}
                show={show}
                onHide={setShow}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body style={{overflowY: 'auto'}} className="p-3">
                    <>
                        {loading && <PageLoading />}
                        {error && !loading && 
                            <FallbackError error={error} handle={() => {
                                setShow(false)
                                setError(null) 
                            }} />}
                        {success && !error && !loading && 
                            <FallbackSuccess handle={() => {
                                typeof onSuccess === "function" ? onSuccess() : ()=>{} 
                                setShow(false)
                                setSuccess(null) 
                                versionHandle()
                            }} />}
                    </>
                </Modal.Body>
            </Modal>
        </>
    );
}
