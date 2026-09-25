// src/services/orderService.js
import { api } from "@/utils/api";
import { mapToURLSearchParams, toCreateOrder } from "@/utils/mappers.js";
import { ENDPOINT } from "@utils/config.js";

const BASE_ENDPOINT = ENDPOINT.ORDER;

/**
 * Servicio para gestionar las peticiones API de **pedidos**.
 * - Proporciona metodos **CRUD** para recursos de `api/orders`.
 */
export const orderService = {

    // (ADMIN) GET: Obtener pedido
    getById: async (id) => {
        const finalEndpoint = `${BASE_ENDPOINT}/${id}`
        const response = await api.get(finalEndpoint)
        return response
    },

    // GET: Obtener pedido de usuario autenticado 
    getMyOrder: async (id) => {
        const finalEndpoint = `${BASE_ENDPOINT}/me/${id}`
        const response = await api.get(finalEndpoint)
        return response
    },

    // GET: Obtener pedido por HASH
    getByHash: async (id) => {
        const finalEndpoint = `${BASE_ENDPOINT}/${id}`
        const response = await api.get(finalEndpoint)
        return response;
    },

    // (ADMIN) POST: Crear pedido para usuario
    create: async (data, clientId) => {
        const orderData = toCreateOrder(data)
        const finalEndpoint = `${BASE_ENDPOINT}/${clientId}`
        const response = await api.post(finalEndpoint, orderData)
        return response;
    },

    // POST: Crear pedido de usuario autenticado
    createMyOrder: async (data) => {
        const orderData = toCreateOrder(data)
        const finalEndpoint = `${BASE_ENDPOINT}/me`
        const response = await api.post(finalEndpoint, orderData)
        return response;
    },

    // PUT: Actualizar pedido por ID
    update: async (id, orderData) => {
        const finalEndpoint = `${BASE_ENDPOINT}/${id}`
        const response = await api.put(finalEndpoint, orderData)
        return response;
    },

    // DELETE: Eliminar un pedido por ID
    delete: async (id) => {
        const finalEndpoint = `${BASE_ENDPOINT}/${id}`
        const response = await api.delete(finalEndpoint)
        return response;
    },

    // PUT: cancelar orden de usuario por id (por default cancela ultima orden registrada)
    cancel: async (id) => {
        const params = new URLSearchParams();
        params.append('id', id)
        const finalEndpoint =  `${BASE_ENDPOINT}/me/cancel/${id}`
        const response = await api.put(finalEndpoint)
        return response;
    },


    // POST: obtener paginas de ordenes
    getPage: async ({ page = 0 , size = 8, ...filters } = {}) => {
        const cleanParams = new URLSearchParams();
        cleanParams.append('page', page < 0 ? 0 : page);
        cleanParams.append('size', size);
        mapToURLSearchParams(cleanParams, filters);
        const finalEndpoint = `${BASE_ENDPOINT}`
        const response = api.get(finalEndpoint, cleanParams);
        return response;
    },

    // GET: obtener pagina de historial de compras de usuario autenticado
    getMyPurchases: async ({ page = 0 , size = 8, ...filters } = {}) => {
        const endpoint = `${BASE_ENDPOINT}/me/history`;
        const cleanParams = new URLSearchParams();
        cleanParams.append('page', page < 0 ? 0 : page);
        cleanParams.append('size', size);
        mapToURLSearchParams(cleanParams, filters);
        const response = await api.get(endpoint, cleanParams)
        return response;
    }



}
