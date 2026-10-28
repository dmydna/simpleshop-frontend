import { http, HttpResponse } from 'msw';

export const baseHandlers = (BASE_ENDPOINT, SERVICE) => [

  // Metodos comunes para handlers

  // POST: CREATE
  http.post(`${BASE_ENDPOINT}`, async ({request}) => {
    const body = await request.json()
    const newUser = SERVICE.create(body);
    if (!newUser) {
      return HttpResponse.json(
        { message: 'No se pudo crear el item' }, 
        { status: 500 });
    }
    return HttpResponse.json(newUser);
  }),

  // GET: BY ID 
  http.get(`${BASE_ENDPOINT}/:id`, ({ params }) => {
    const id = String(params.id);
    const base = SERVICE.getById(id);
    if (!base) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(base);
  }),

  http.get(`${BASE_ENDPOINT}/me/:id`, ({ params }) => {
    const id = String(params.id);
    const base = SERVICE.getById(id);
    if (!base) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(base);
  }),


  // GET: PAGE 
  http.get(`${BASE_ENDPOINT}`, ({ request }) => {
    const list = SERVICE.filterPage(request);
    if (!list) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(list);
  }),


  // POST: UPLOAD
  http.post(`${BASE_ENDPOINT}/upload`, async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return HttpResponse.json({ mensague: 'No file' }, { status: 400 });
    }

    const fileId = crypto.randomUUID();
    const objectUrl = URL.createObjectURL(file);

    return HttpResponse.json({
      id: fileId,
      name: file.name,
      url: objectUrl,
      message: 'Archivo subido exitosamente'
    }, { status: 201 });
  }),

  // PUT: UPDATE BY ID
  http.put(`${BASE_ENDPOINT}/:id`, async ({ params, request }) => {
    
    const id = String(params.id);


    let updates;
    try {
      updates = await request.json();
    } catch (error) {
      return HttpResponse.json(
        { error: 'Cuerpo de la petición inválido', details: error.message },
        { status: 400 }
      );
    }

    const existingElem = SERVICE.existsById(id);

    if (!existingElem) {
      return HttpResponse.json(
        { error: 'Elemento no encontrado' },
        { status: 404 }
      );
    }
    const updatedData = SERVICE.updateById(id, updates)
    return HttpResponse.json(updatedData, { status: 200 });
  }),


  // PATCH: STATUS
  http.patch(`${BASE_ENDPOINT}/:id/status`, async ({ params, request }) => {
    const id = String(params.id);
    
    let updates;
    try {
      updates = await request.json();
    } catch (error) {
      return HttpResponse.json(
        { error: 'Cuerpo de la petición inválido', details: error.message },
        { status: 400 }
      );
    }

    const exists = SERVICE.existsById(id);

    if (!exists) {
      return HttpResponse.json(
        { error: 'Elemento no encontrado' },
        { status: 404 }
      );
    }

    const updatedData = SERVICE.updateStatus(id, updates)

    return HttpResponse.json( { ...updatedData }, { status: 200 });
  }),



  // DELETED: DELETE BY ID
  http.delete(`${BASE_ENDPOINT}/:id`, async ({ params, request }) => {
    const id = String(params.id);
    SERVICE.deleteById(id)
    return HttpResponse.json( null, { status: 200 });
  })


];