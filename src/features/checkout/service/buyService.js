// src/services/orderService.js
import { api } from "@/utils/api";
import { ENDPOINT } from "@utils/config.js";

const BASE_ENDPOINT = ENDPOINT.BUY


/**
 * Servicio para gestionar las peticiones API de **compras**.
 * - Proporciona metodos **CRUD** para recursos de `api/buy`.
 */
export const buyService = {

    // POST: Crear un nuevo pedido
    create: async (buyData) => {
        const finalEndpoint = `${BASE_ENDPOINT}`
        const response = await api.post(finalEndpoint, buyData)
        return response;
    }
};
