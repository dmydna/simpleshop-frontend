import { gatewayService } from "@/features/checkout/service/gatewayService.js";
import { useProfile } from "@/features/profile/contexts/ProfileContext";
import { useFetch } from "@/hooks/useFetch";
import { useService } from "@hooks/useService.js";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const useGateway = () => {

    const {orderId} = useParams()
    const {profile} = useProfile()



    const { loading, setLoading, setSuccess, success, error, setError } = useFetch()

    const [tokenGateway, setTokenGateway] = useState(null)

    const {create: paymentRequest } = useService({service: gatewayService})

    const handleGatewayRequest = async() => {
        setLoading(true)
        setError(null)
        try {
            const token = await paymentRequest(
                { "orderId": orderId,  "userEmail": profile.email }
            )
            setTokenGateway(token)
            return  (
                { "orderId": orderId , "paymentToken" : token }
            )
        }catch(error){
            setError(true)
            throw new Error(error);
        }finally{
            setLoading(false)
        }
    }

    const handleValidateGateway = async(func, tokenRequest)=>{
        setLoading(true)
        setError(null)
        try{
           const response = await func(tokenRequest)
           // console.log(response, "-- FINISH BUY [OK] --")
           setLoading(false)
           setError(false)
        }catch(error){
           // console.log(error, "-- FINISH BUY [FAIL] --")
           setError(true)
           throw new Error(error);
        }finally{
           setLoading(false)
        }
    }




    return ({
      handleValidateGateway, handleGatewayRequest
    })

}
