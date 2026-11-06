import { db } from "@/mocks/modules/db.js";

export const baseService = (collection) => ({
  create: (data) => {
    return db.save(collection, data);
  },

  // GET: Obtener un status por Id
  getStatus: (id) => {
    const entity = db.__find(
      collection, (item) => item.id == id
    );
    return { status: entity?.status || null }
  },

  getById: (id) => {
    return db.findWithRelations(
      collection,
      (item) => item.id == id,
      (i) => db.__buildMeta(i, collection),
    );
  },

  getIndexDB: (id) => {
    return db.getIndex(collection, id);
  },

  filterPage: (request) => {
    const config = {
      mapper: (i) => db.__buildMeta(i, collection),
    };
    return db.findPage(collection, request, config);
  },

  updateById: (id, update) => {
    return db.update(
      collection,
      (item) => item.id == id,
      (item) => ({ ...item, ...update }),
    );
  },

  updateStatus: (id, { status }) => {
    return db.update(
      collection,
      (item) => item.id == id,
      (item) => ({ ...item, status: status }),
      true,
    );
  },

  deleteById: (id) => {
    return db.deleteFrom(collection, (i) => i.id == id);
  },

  existsById: (id) => {
    return db.exists(collection, (i) => i.id == id);
  },
});
