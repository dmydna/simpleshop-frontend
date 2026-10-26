import 'nprogress/nprogress.css';

import ModalConfirm from '@/components/common/ModalConfirm';
import FallbackExpiredSession from '@/features/fallback/components/FallbackExpiredSession';
import { useAuth } from "@features/auth/hooks/useAuth.js";
import { createContext, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ModalParam from '@/components/common/ModalParam';

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {

    const navigate = useNavigate();
    const authHook = useAuth()

    const { logout, expiredDate } = authHook;

    const renewSession = () => {
       setSearchParams(prev => ({...prev, dialog: 'expiredsession'}))
    }

    return (

        <AuthContext.Provider value={{ 
            ...authHook, 
            renewSession: renewSession 
        }}>
            {children}
            {expiredDate && Date.now() > expiredDate && 
                <ModalParam size="sm" param="dialog=expiredsession">
                    {(close) =>
                        <div className='p-3f'>
                            <FallbackExpiredSession 
                                handle={ () => { close(); logout(); navigate('/') }} 
                            />
                        </div>
                    }
                </ModalParam>
            }
        </AuthContext.Provider>

    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);
