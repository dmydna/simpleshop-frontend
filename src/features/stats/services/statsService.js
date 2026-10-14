// src/statsService.js

import { api } from "@/utils/api";
import { ENDPOINT } from "@utils/config.js";

const BASE_ENDPOINT = ENDPOINT.STATS;

/**
 * Servicio para gestionar las peticiones API de **estadisticas y metricas**.
 * - Proporciona metodos **CRUD** para recursos de `api/stats`.
 */
export const statsService = {

    // GET: Obtener metricas generales (de todas las entidades)
	getStats: async () => {
        const finalEndpoint = `${BASE_ENDPOINT}`
        const response = await api.get(finalEndpoint);
        return response;
    },

    // GET: Obtener top de **type** especifico  
    getTop: async ({type, limit=0}) => {
    	// type :  visits || ranked || sales || on-sales
        const params = new URLSearchParams();
        params.append("limit", limit)
        const finalEndpoint = `${BASE_ENDPOINT}/top/${type}`
        const response = await api.get(finalEndpoint, params);
        return response;
    },
    
    getStatsByField: async ({entity, field, limit=1}) => {
        // field :  status || tags || category
        // entity : products || listings || users
        const params = new URLSearchParams();
        params.append("limit", limit)
        const finalEndpoint = `${BASE_ENDPOINT}/${entity}/${field}`
        const response = await api.get(finalEndpoint, params);
        return response; // [{name, count}, ...]
    }

}