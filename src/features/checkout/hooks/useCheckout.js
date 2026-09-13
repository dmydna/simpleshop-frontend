import { buyService } from '@/features/checkout/service/buyService.js';
import { orderService } from "@/features/order/services/orderService";
import { useFetch } from "@/hooks/useFetch";
import { useGateway } from "./useGateway";

export const useCheckout = () => {
  
    const {loading, setLoading, success, setSuccess, setError, error } = useFetch()
    
    const { handleGatewayRequest, handleValidateGateway, 
    loading: loadingGateWay, error: errorGateWay  }  = useGateway()

    const confirmPay = async(onSuccess=null) => {
        setLoading(true);
        setError(null)
        try {
          const tokenRequest = await handleGatewayRequest()
          await handleValidateGateway(buyService.create, tokenRequest)
          setSuccess(true)
          if(onSuccess) onSuccess();
        }
        catch(err){
            setError(err)
        }finally{
         setLoading(false)
        }

    }

   const cancelPay = async(orderId, onSuccess=null) =>{
       setError(null)
       setLoading(true)
       try{
          await orderService.cancel(orderId);
          if(onSuccess) onSuccess()
      }catch(err){
          setError(err)
      } finally {
          setLoading(false)
      }
    }


    return ({
      confirmPay, cancelPay, 
      setLoading, success, setSuccess, setError,
      loading: loading || loadingGateWay, 
      error: error || errorGateWay

   })
}
