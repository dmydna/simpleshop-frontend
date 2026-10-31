import { useAuthContext } from "@/features/auth/contexts/AuthContext.jsx";
import PageLoading from "@/features/fallback/pages/PageLoading.jsx";
import RouteLayout from "@common/RouteLayout.jsx";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
    
    const { isAuth, loading, renewSession, expiredDate, sessionManager } = useAuthContext();

    window.scrollTo({ top: 0, behavior: 'instant'});

    
    if (loading) {
        sessionManager()
        return <PageLoading message='Cargando sesion...' />;
    }
     
    if(isAuth){
        return  <RouteLayout>{children}</RouteLayout>
    }

    return <Navigate to="/login" />;
}
