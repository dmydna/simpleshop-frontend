import FallbackEmpty from '@/features/fallback/components/FallbackEmpty.jsx';
import FallbackError from '@/features/fallback/components/FallbackError';
import FallbackNotSearchResults from "@features/fallback/components/FallbackNotSearchResults.jsx"
import PageLoading from '@/features/fallback/pages/PageLoading';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ListEmpty from './ListEmpty';



export default function TableView({ 
    children, 
    data, 
    error,
    onRetry,
    loading,
}) {

    const [searchParams, setSearchParams] = useSearchParams();
    const allParams = searchParams.toString();

    const isEmpty = data?.length === 0 ;
    const navigate = useNavigate();
 
    if (loading) return (
        <div className="py-5">
            <PageLoading />
        </div>
    )

    if (error?.code === 'TOKEN_EXPIRED') {
      navigate('/home?dialog=expiredsession')
      return  <>{children}</>
    }

    if(error) return (
        <div className="py-5">
            <FallbackError fixes error={error}  handle={() => onRetry()} />
        </div>    
    )
    
   if(isEmpty && allParams){
        return ( 
            <div className="py-5">
                <FallbackNotSearchResults /> 
            </div>
        ) 
    } 
    
    if(isEmpty){  return ( <ListEmpty />) }

    return <>  {children} </>;
}