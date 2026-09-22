// src/services/userService.js
import { api } from "@/utils/api";
import { ENDPOINT } from "@utils/config.js";
import { mapToURLSearchParams, toUpdateUser } from "@utils/mappers.js";

const BASE_ENDPOINT = ENDPOINT.USER;

/**
 * Servicio para gestionar las peticiones API de **usuario**.
 * - Proporciona metodos **CRUD** para recursos de `api/listings`.
 */
export const userService = {

    // GET: Obtener paginas de usuarios
    getPage : async ({ page = 0, size = 10, ...filters } = {}) => {
        const finalEndpoint = `${BASE_ENDPOINT}`
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('size', size);
        mapToURLSearchParams(params, filters)
        const response = await api.get(finalEndpoint, params.toString());
        return response;
    },

    //  GET: Obtener perfil de usuario autenticado
    getMyProfile: async () => {
        const finalEndpoint = `${BASE_ENDPOINT}/me`;
        const response = await api.get(finalEndpoint);
        return response;
    },

    // NEW_API_FEAT
    getMySummary: async () => {
        const finalEndpoint = `${BASE_ENDPOINT}/me/summary`
        const response = await api.get(finalEndpoint);
        return response;
    },


    // (ADMIN) GET: obtener usuario
    getById: async (id) => {
        const finalEndpoint = `${BASE_ENDPOINT}/${id}`;
        const response =  await api.get(finalEndpoint);
        return response
    },


    // (ADMIN) DELETE: eliminar usuario
    delete: async (id) => {
        const finalEndpoint = `${BASE_ENDPOINT}/${id}`;
        const response =  await api.delete(finalEndpoint);
        return response;
    },

    // (ADMIN) PATCH: actualizar estatus de usuario
    updateStatus: async (id, status) => {
        const finalEndpoint = `${BASE_ENDPOINT}/${id}/status`;
        const response = await api.patch(finalEndpoint, {status: status});
        return response;  
    },



    // (ADMIN) PATCH: aplicar baneo de usuario
    banUser: async (id, banRequest) => {
        const finalEndpoint = `${BASE_ENDPOINT}/${id}/ban-user`
        const response = api.patch(finalEndpoint, banRequest)
        return response; // {success: true}
    },
    

    // (ADMIN) PATCH: quitar baneo de usuario
    unbanUser: async (id) => {
        const finalEndpoint = `${BASE_ENDPOINT}/${id}/unban-user`
        const response = await api.patch(finalEndpoint)
        return response;  // {success: true}
    },


    // PUT: subir/cambiar imagen de perfil
    imageUploadProfile: async (selectedFile) => {
        const endpoint = `${BASE_ENDPOINT}/me/upload-image`;
        const formData = new FormData();
        // "file" debe coincidir con el @RequestParam de Java
        formData.append("file", selectedFile); 
        const response = await api.put(endpoint, formData)
        return response;
    },

    // GET: Obtener un status por Id
    getStatus: async (id) => (await api.get(`${BASE_ENDPOINT}/${id}/status`)),

    // (ADMIN) PUT: update user
    update: async (id, data) => {
        const endpoint = `${BASE_ENDPOINT}/${id}`;
        const userData = toUpdateUser(data);
        const response = await api.put(endpoint, userData)
        return response;
    }, 

    // PUT: actualizar/editar datos de perfil de usuario
    updateMyProfile: async (profileData) => {
        const endpoint = `${BASE_ENDPOINT}/me`;
        const response = await api.put(endpoint, profileData)
        return response;
    },
};
