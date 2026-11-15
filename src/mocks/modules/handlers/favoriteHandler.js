import { http, HttpResponse } from 'msw';

import { currentLoggedUser } from '@/mocks/modules/db';
import { baseHandlers } from '@/mocks/modules/handlers/baseHandler';
import { favorite_service } from '@/mocks/modules/services/favorite_service';
import { user_service } from '@/mocks/modules/services/user_service';
import { BASE_URL, ENDPOINT } from "@utils/config.js";

const [BASE_ENDPOINT, SERVICE] = [`${BASE_URL}/${ENDPOINT.FAVORITE}`, favorite_service]


export const favoriteHandlers = [

  
  // POST: CREATE
  http.post(`${BASE_ENDPOINT}/:id`, ({ params }) => {
    const user = user_service.getMyProfile();
    if (!currentLoggedUser || !user) {
      return HttpResponse.json({ message: 'No autenticado' }, { status: 401 });
    }
    const listingId = String(params.id);
    const newFavorite = favorite_service.create(listingId, user.id)
    return HttpResponse.json(newFavorite);
  }),

  // GET: EXISTS BY ID
  http.get(`${BASE_ENDPOINT}/:id/check`, ({ params }) => {
    const id = String(params.id);
    const user = SERVICE.existsById(id);
    if (!user) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(user);
  }),

  ...(baseHandlers(BASE_ENDPOINT, SERVICE)),
];