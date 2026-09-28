// src/services/productService.js

import { api } from "@/utils/api";
import { mapToURLSearchParams, toCreateProduct, toUpdateProduct } from "@/utils/mappers.js";
import { ENDPOINT } from "@utils/config.js";

const BASE_ENDPOINT = ENDPOINT.PRODUCT

/**
 * Servicio para gestionar las peticiones API de **productos**.
 * - Proporciona metodos **CRUD** para recursos de `api/products`.
 */
export const productService = {

    // POST: Crear un nuevo producto.
    create: async (data) => {
        const productData = toCreateProduct(data);
        const finalEndpoint = `${BASE_ENDPOINT}`
        const response = await api.post(finalEndpoint, productData)
        return response;
    },


    // GET: Obtener productos paginados.
    getPage: async ({ page = 0, size = 10, ...filters } = {}) => {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('size', size);
        mapToURLSearchParams(params, filters)
        const finalEndpoint = `${BASE_ENDPOINT}`;
        const response = await api.get(finalEndpoint, params)
        return response;
    },


    // GET: Obtener un producto.
    getById: async (id) => {
        console.log("PRODUCT ID", id)
        const finalEndpoint = `${BASE_ENDPOINT}/${id}`
        const response =  await api.get(finalEndpoint)
        return {...response, ...response.dimensions}
    },


    // DELETE: Eliminar un producto.
    delete: async (id) => {
        const finalEndpoint = `${BASE_ENDPOINT}/${id}`
        const response = await api.delete(finalEndpoint)
        return response
    },

    // PATCH: Actualizar status = {ACTIVE, INACTIVE, DRAFT, DELETED}
    // NEW_FEAT_API
    updateStatus: async (id, status) => {
        const finalEndpoint = `${BASE_ENDPOINT}/${id}/status`
        const response = await api.patch(finalEndpoint, { status: status })
        return response;
    },

    // GET: Obtener un status por Id
    getStatus: async (id) => (await api.get(`${BASE_ENDPOINT}/${id}/status`)),

}
