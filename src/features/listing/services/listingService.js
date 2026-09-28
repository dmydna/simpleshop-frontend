// src/services/listingService.js
import { api } from '@/utils/api';
import { ENDPOINT } from "@utils/config.js";
import { mapToURLSearchParams, toCreateListing, toUpdateListing } from '@utils/mappers.js';



const BASE_ENDPOINT = ENDPOINT.LISTING;

/**
 * Servicio para gestionar las peticiones API de **publicaciones**.
 * - Proporciona metodos **CRUD** para recursos de `api/listings`.
 */
export const listingService = {


    // GET: Obtener un listing por Id
    getById: async (id) => (await api.get(`${BASE_ENDPOINT}/${id}`)),

    // GET: Obtener un listing.status por Id
    getStatus: async (id) => (await api.get(`${BASE_ENDPOINT}/${id}/status`)),

    // GET: Obtener un listing por Id
    getByHash: async (id, fallow=false) => {
        const finalEndpoint = `${BASE_ENDPOINT}/public/${id}?fallow=${fallow}`;
        const  {listing} = await api.get(finalEndpoint);
        return listing;  
    },

    // GET: Obtener paginas de listing 
    getPage: async ({ page = 0, size = 10, ...filters } = {}) => {

        const params = new URLSearchParams();
        params.append('page', isNaN(page) ? 0 : page);
        params.append('size', size);
        mapToURLSearchParams(params, filters);

        const finalEndpoint = `${BASE_ENDPOINT}`;
        const response = await api.get(finalEndpoint, params);
        return response;  
    },

    // POST: crear listing (admite imagenes)
    create: async (data, selectedFile) => {

        // console.log("listingService", data)

        const listingData = toCreateListing(data);
        const formData = new FormData();

        formData.append('data', new Blob([JSON.stringify(listingData)], {
            type: 'application/json'
        }));

        if (selectedFile && selectedFile?.length !== 0) {
            selectedFile?.forEach((file) => {
                formData.append('files', file);
            });
        }

        const finalEndpoint = `${BASE_ENDPOINT}`
        const response = await api.post(finalEndpoint, formData);
        return response;  
    },


    // PATCH: actualizar status de listing
    updateStatus: async (id, status) => {
        const finalEndpoint = `${BASE_ENDPOINT}/${id}/status`;
        const response = await api.patch(finalEndpoint, {status: status});
        return response;  
    },

    // POST: Subir imagen para listing
    imageUpload: async (id, selectedFile) => {
        const formData = new FormData();
        formData.append("file", selectedFile); 
        const finalEndpoint = `${BASE_ENDPOINT}/${id}/upload-image`;
        const response = await api.post(finalEndpoint, formData);
        return response;  
    },


    // PUT: Editar Listing (permite editar las imagenes)
    update: async (id, data, selectedFiles = null) => {

        const TOKEN = localStorage.getItem("token");
        const listingData = toUpdateListing(data);
        const formData = new FormData();
        // console.log("listingService.update : ",data)
        formData.append('data', new Blob([JSON.stringify(listingData)], {
            type: 'application/json'
        }));

        if (selectedFiles?.length !== 0) {
            selectedFiles?.forEach((file) => {
                formData.append('files', file); 
            });
        }

        const finalEndpoint = `${BASE_ENDPOINT}/${data.id}`
        const response = await api.put(finalEndpoint, formData)
        return response;  
    },


    // DELETE: Eliminar un producto por ID
    delete: async (id) => {
        const finalEndpoint = `${BASE_ENDPOINT}/${id}`
        const response = await api.delete(finalEndpoint)
        return response;  
    },


};
