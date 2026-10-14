import { buyService } from '@/features/checkout/service/buyService.js';
import { orderService } from "@/features/order/services/orderService";
import { useFetch } from "@/hooks/useFetch";
import { useGateway } from "./useGateway";

export const useCheckout = () => {
  
    // TODO: unificar useFetch en una variable para compatibilizar con <FetchState> 
    
    const usefetch = useFetch()

    const { handleGatewayRequest, handleValidateGateway }  = useGateway()

    const confirmPay = async(onSuccess=null) => {
        usefetch.setLoading(true);
        usefetch.setError(null)
        try {
          const tokenRequest = await handleGatewayRequest()
          await handleValidateGateway(buyService.create, tokenRequest)
          usefetch.setSuccess(true)
          if(onSuccess) onSuccess();
        }
        catch(err){
            usefetch.setError(err)
        }finally{
            usefetch.setLoading(false)
        }
    }

   const cancelPay = async(orderId, onSuccess=null) =>{
       usefetch.setError(null)
       usefetch.setLoading(true)
       try{
          await orderService.cancel(orderId);
          usefetch.setSuccess(true)
          if(onSuccess) onSuccess()
      }catch(err){
          usefetch.setError(err)
      } finally {
          usefetch.setLoading(false)
      }
    }


    return ({ usefetch, confirmPay, cancelPay })
}
