import { useAuthContext } from "@/features/auth/contexts/AuthContext";
import { useUrlState } from "@/hooks/useUrlState";
import { URL_LOGIN, URL_CART } from "@utils/links"


export default function ProtectedAction({redirect, children}){

    const { isAuth, loading } = useAuthContext()
    const { setSearchParams } = useUrlState()

    const handleNavigate = (isAuth, loading) => {
        if(loading) return;
        if(!isAuth &&
            window.location.pathname != URL_LOGIN){
            setSearchParams({dialog: 'login', redirect: redirect || window.location.pathname})
        }
    }

    if(isAuth){
    	return <>{children}</>
    }

	return(
		<div onClick={() => handleNavigate(isAuth, loading)}>
			{children}
		</div>
	)
}
