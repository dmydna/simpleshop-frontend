import { baseService } from '@/mocks/modules/services/baseService.js';
import { db } from '../db';

const collection = 'products';

export const product_service = {

    ...(baseService(collection)),

    filterPage: (request) => {
      const config = {
        filter: { keyword: 'name' },
        mapper: i => db.__createDTO(i, collection)
      };
          return db.findPage(collection,request, config);
      },



}
