import { useAuthContext } from "@/features/auth/contexts/AuthContext.jsx";
import Page403Forbidden from "@/features/fallback/pages/Page403Forbidden.jsx";
import PageLoading from "@/features/fallback/pages/PageLoading.jsx";
import RouteLayout from "@common/RouteLayout.jsx";
import { useEffect } from "react";

export default function ProtectedRouteAdmin({ children }) {
    const { isAuth, loading, isAdmin, sessionManager  } = useAuthContext();

    // Mientras se verifica el token en localStorage, mostramos un spinner o nada
    if (loading) {
        sessionManager()
        return <PageLoading message='Cargando sesion...' />
    }
    
    window.scrollTo({ top: 0, behavior: 'instant'});

    return isAuth && isAdmin ? 
    <RouteLayout>
        {children}
    </RouteLayout> : 
    <Page403Forbidden />;
}
