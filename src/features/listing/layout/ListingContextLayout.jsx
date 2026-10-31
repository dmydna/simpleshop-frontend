import PageLoading from "@/features/fallback/pages/PageLoading.jsx";
import { useUrlParams } from "@/hooks/useUrlParams.js";
import { AppStatus } from "@common/AppStatus.jsx";
import { useEffect,useMemo } from "react";
import { useParams } from "react-router-dom";


export default function ListingContextLayout({children, placeholder, ...props}){
	
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, []);

    const { allParams } = useUrlParams()
    const { filter } = useParams()


	return(
	    <AppStatus
          loading={props.loading && !filter}
          onRetry={props.fetchData}
          error={props.error}
          placeholder={placeholder || <PageLoading />}
          isEmpty={ props.totalElements === 0 && (!allParams || allParams.length == 0)}
      	> {children}
      	</AppStatus>
	)
}