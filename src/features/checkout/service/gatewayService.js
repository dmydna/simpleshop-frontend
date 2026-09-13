import { api } from "@/utils/api";
import { ENDPOINT } from "@utils/config.js";

const BASE_ENDPOINT = ENDPOINT.GATEWAY 


/**
 * Servicio para gestionar las peticiones API de **pasarela de pago falsa**.
 * - Proporciona metodos **CRUD** para recursos de `api/toy-gateway`.
 */
export const gatewayService = {

    // POST: Crear un nuevo un nuevo token de la pasarela
    create: async (paymentData) => {
        const finalEndpoint = `${BASE_ENDPOINT}/initiate`
        const response = await api.post(finalEndpoint, paymentData);
        return response; 
    }

};
