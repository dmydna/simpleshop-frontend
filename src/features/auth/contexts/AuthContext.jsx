import 'nprogress/nprogress.css';

import ModalConfirm from '@/components/common/ModalConfirm';
import FallbackExpiredSession from '@/features/fallback/components/FallbackExpiredSession';
import { useAuth } from "@features/auth/hooks/useAuth.js";
import { createContext, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null)

export function AuthProvider({ children }){

    const navigate = useNavigate();
    const authHook = useAuth()

    const {logout} = authHook;
    const [show, setShow] = useState();

    const expiredSessionHandle = () => {
        setShow(false); logout(); navigate('/')
    }

    return (

        <AuthContext.Provider value={{...authHook, renewSession: () => setShow(true)}}>
            {children}
        <ModalConfirm show={show} close={setShow}>
                <div className='p-3f'>
                   <FallbackExpiredSession  handle={expiredSessionHandle}  />
                </div>
            </ModalConfirm>
        </AuthContext.Provider>

    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);
