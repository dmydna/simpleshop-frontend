import { http, HttpResponse } from 'msw';

import { baseHandlers } from '@/mocks/modules/handlers/baseHandler';
import { listing_service } from '@/mocks/modules/services/listing_service';
import { BASE_URL, ENDPOINT } from "@utils/config.js";
import { flatMapIn } from '../utils';

const [BASE_ENDPOINT, SERVICE] = [`${BASE_URL}/${ENDPOINT.LISTING}`, listing_service]


export const listingHandlers = [

  // POST: CREATE
  http.post(`${BASE_ENDPOINT}`, async ({ request }) => {
    const formData = await request.formData()

    const dataBlob = formData.get('data')
    const files = formData.get('files');

    const jsonString = await dataBlob.text();
    const data = JSON.parse(jsonString);

    const listObjectsUrl = []
    if (files) {
      // Normalizar a array si es un solo archivo
      const filesArray = Array.isArray(files) ? files : [files];

      for (const file of filesArray) {
        // Verificar que es realmente un objeto File
        if (file instanceof File) {
          try {
            const url = URL.createObjectURL(file);
            listObjectsUrl.push(url);
          } catch (e) {
            console.error("Error creando URL para archivo:", file.name, e);
          }
        }
      }
    }


    const newData = SERVICE.create({ ...data, images: [...data.images,...listObjectsUrl] });
    if (!newData) {
      return HttpResponse.json(
        { message: 'No se pudo crear el item' }, 
        { status: 500 });
    }
    return HttpResponse.json(newData, { status: 200 });
  }),


  http.get(`${BASE_ENDPOINT}/public/:id`, ({ params }) => {
    const id = String(params.id);
    const data = SERVICE.getById(id);
    if (!data) return new HttpResponse(null, { status: 404 });

    if(data.meta.status == "DRAFT"){
      return HttpResponse.json({ "listing": data });
    }
    const {product, ...base} = data
    const response = flatMapIn({...base}, product);
    response.productName = product.name;
    return HttpResponse.json({ "listing": response });
  }),


  http.put(`${BASE_ENDPOINT}/:id`, async ({ params, request }) => {
    const { id } = params;
    const formData = await request.formData();
    const dataBlob = formData.get('data')
    const files = formData.get('files');

    // 1. Generar un ID único para este archivo
    const fileId = crypto.randomUUID();
    
    const jsonString = await dataBlob.text();
    const data = JSON.parse(jsonString);

    const listObjectsUrl = []
    if (files) {
      for (let f in files) {
        const url = URL.createObjectURL(f)
        listObjectsUrl.push(url)
      }
    }

    const response = SERVICE.updateById(id, { ...data, images: [data.images, ...listObjectsUrl] })
    return HttpResponse.json(response, { status: 201 });
  }),


  ...(baseHandlers(BASE_ENDPOINT, SERVICE)),
];