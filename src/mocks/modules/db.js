import { configDB } from "@/mocks/modules/config";
import listingData from "@/mocks/modules/data/listings.snapshot.json";
import productData from "@/mocks/modules/data/products.snapshot.json";
import reviewsData from "@/mocks/modules/data/reviews.snapshot.json";
import userData from "@/mocks/modules/data/users.snapshot.json";
import { applyFilters, applyFiltersWidthRelation, applySorting, buildPageResponse, createMockDate, extractPaginationParams } from "@/mocks/modules/utils";


// Variable en memoria para simular el usuario logueado actualmente en el mock
export let currentLoggedUser = 'admin'; 
export const setCurrentLoggedUser = (username) => {
  currentLoggedUser = username;
};

// Asignar password dinamico a users
export const processUser = (u) => ({
  ...u, password: u.username + "1234"
})


export const db = {

  users: [...userData.content.map(processUser)],
  products: [...productData.content],
  listings: [...listingData.content],
  reviews: [...reviewsData.content],
  favorites: [],
  orders: [],
  orders_items: [],
  product_tags: [],

  
  configDB: configDB,


  /**metodos privados**/

  __generateId(collection) {
    return this[collection].length;
  },

  __getIndex(collection, id) {
    return this[collection].findIndex(i => i.id == id);
  },


  __create(collection, data) {


    //console.log(this)

    const config = this.configDB[collection];
    if (!config) {
      //console.warn(`[DB.CREATE] No hay configuracion para ${collection}`);
      return this.__saveItem(collection, data);
    }


    if (config.validation && config.validation.uniqueKeys) {
      const { validation } = config
      for (const field of validation.uniqueKeys) {
        if (data[field] !== undefined) { // Solo verificar si el campo viene en data
          const exists = this[collection].find(
            (item) => field in item && item[field] === data[field]
          );
          if (exists) {
            throw new Error(`El valor '${field}' ya existe en otro registro.`)
          }
        }
      }

    }

    return this.__saveItem(collection, data);
  },


  __saveItem(collection, data) {
    // Generar ID
    const id = this.__generateId(collection);
    
    // Generar fecha
    const DATE = createMockDate(new Date());

    // Crear objeto con estructura base
    const status = data.status == "DRAFT" ? "DRAFT" : data.status 

    const newItem = {
      id: id,
      ...data,
      status:  status,
      createdAt: DATE,
      updatedAt: null,
      deletedAt: null 
    };
    this[collection].push(newItem);
    return newItem;
  },



  __update(collection, filterFn, update) {
    const data = this[collection].find(filterFn);
    if (!data) return null;
    const DATE = createMockDate(new Date());
    const { id, meta } = data;
    const index = this.__getIndex(collection, id);
    this[collection][index] = {
      id, ...update, 
      meta: { ...meta, ...update?.meta, updatedAt: DATE }
    }
    return this[collection].find((item) => item.id === id)
  },

  __delete(collection, filterFn) {
    const data = this[collection].find(filterFn);
    //console.log("DELTED ITEM:", data)
    if (!data) return false;
    const DATE = createMockDate(new Date());
    const index = this.__getIndex(collection, data.id);
    const meta = { deletedAt: DATE, status: "HARD_DELETED" }
    this[collection][index] = { ...data, ...meta }
    return true;
  },


  _loadRelations(entity, parentCol) {
    const meta = db.configDB[parentCol];
  
    if (!meta) return entity;
    if (!meta.relations) return entity;

    const parentId = entity.id;   // id del padre

    /* ----------  oneToMany (el hijo posee la FK) ---------- */
    if (meta.relations.oneToMany) {
      meta.relations.oneToMany.forEach(rel => {
        const childCol = db[rel.collection];
        if (!Array.isArray(childCol)) return;

        // FK que se guarda en la colección hija
        const fkField = rel.FK || meta.FK;

        entity[rel.key] = childCol.filter(item => item[fkField] === parentId);
      });
    }

    /* ---------- oneToOne (puede ser cualquiera) ---------- */
    if (meta.relations.oneToOne) {
      meta.relations.oneToOne.forEach(rel => {
        const childCol = db[rel.collection];
        const childMeta = db.configDB[rel.collection];
      
        if (!Array.isArray(childCol)) return;

        const fkField = childMeta.FK || rel.FK || meta.FK; // nombre del campo FK

        if (rel.owner) {
          /* 2.a  El padre posee la FK  */
          const fkVal = entity[fkField];    
          //console.log("fkVal:",fkVal)  
          //console.log("childCol:",childCol)       // valor de la FK en el padre
          entity[rel.key] = childCol.find(item => item.id === fkVal) || null;
          //console.log(`entity[${rel.key}]:`,entity[rel.key] )  
        } else {
          /* 2.b  El hijo posee la FK  */
          entity[rel.key] = childCol.find(item => item[fkField] === parentId) || null;
        }
      });
    }

    /* ----------  manyToOne (el padre posee la FK) ---------- */
    if (meta.relations.manyToOne) {
      meta.relations.manyToOne.forEach(rel => {
        const childCol = db[rel.collection];
        if (!Array.isArray(childCol)) return;

        const fkField = rel.FK || meta.FK;
        const fkVal = entity[fkField];  // valor que el padre lleva

        entity[rel.key] = childCol.find(item => item.id === fkVal) || null;
      });
    }

    //console.log(entity)

    return entity;
  },


  __buildMeta(entity, collection) {
    const config = this.configDB[collection];
    if (!config) return entity;
    if (!config.meta) return entity;
    const metaFields = ["createdAt", "updatedAt", "deletedAt", "status"];
    const { meta } = config;
    // 2. Fusionar campos dinámicos de meta
    if (Array.isArray(meta)) {
      meta.forEach(field => {
        if (!metaFields.includes(field)) {
          metaFields.push(field);
        }
      });
    }

    // 3. Crear el objeto de salida
    const responseEntity = {};
    // 3.1. Crear el objeto 'meta' separado
    const separateMeta = {};
    // 3.2. Rellenar el objeto 'meta' separado
    metaFields.forEach(field => {
      if (entity[field] !== undefined) {
        separateMeta[field] = entity[field];
      }
    });
    // 3.3. Agregar el objeto 'meta' completo al resultado
    responseEntity.meta = separateMeta;

    // 4. Rellenar los campos normales del entity que NO son de meta
    Object.keys(entity).forEach(field => {
      if (!metaFields.includes(field)) {
        responseEntity[field] = entity[field];
      }
    });

    return responseEntity;
  },


  /**metodos publicos**/


  save(collection, data) {
    if (data?.id) {
      return this.__update(collection, i => i.id == data?.id, data)
    }
    return this.__create(collection, data)
  },

  find(collection, filterFn, mapperFn = null) {
    let entity = this[collection].find(filterFn);
    if (entity && entity.status == "HARD_DELETED") {
      return null
    }
    if (mapperFn) { 
      return mapperFn(entity) 
    }
    return this.__buildMeta(entity, collection);
  },
  

  // obtiene de forma segura la colleccion
  collection(collection, limit = null) {
    let copy = null
    if (limit) {
      copy = this[collection].slice(0, limit)
    } else {
      copy = this[collection]
    }
    return copy
  },

  sort(collection, sortFn, limit = null) {
    return this.collection(collection, limit).sort(sortFn)
      .map(i => this.__buildMeta(i, collection))
  },

  __find(collection, filterFn, mapperFn = null) {
    let entity = this[collection].find(filterFn);
    if (entity && entity.status == "HARD_DELETED") {
      return null
    }
    if (mapperFn) { 
      return mapperFn(entity) 
    }
    return entity;
  },
  
  findWithRelations(collection, filterFn, mapperFn = null) {
    //console.log(this)
    const entity = this[collection].find(filterFn);
    if (mapperFn) { return mapperFn(this._loadRelations(entity, collection)) }
    return this.__buildMeta(this._loadRelations(entity, collection), collection)
  },


  deleteFrom(collection, filterFn) {
    return this.__delete(collection, filterFn)
  },

  findAll(collection, filterFn, mapperFn = null) {
    if (mapperFn) { 
      return this[collection]
        .filter(filterFn || (() => true))
        .map(mapperFn)  
    }
    return this[collection].filter(filterFn || (() => true));
  },


  exists(collection, filterFn) {
    if (this.find(collection, filterFn)) { return true; }
    return false;
  },


  findPage(collection, request, mapperFn = null) {
    console.log("HOLA")
    if (!request || !request.url) {
      return { content: [], totalElements: 0, totalPages: 0 };
    }
    const url = new URL(request.url);
    // 1. Extraer parámetros
    const { page, size, sortParam, filters } = extractPaginationParams(url);
    // 2. Obtener datos base (de la colección o del array mapeado)
    const baseData = this[collection]
      .filter(i => i.status != "HARD_DELETED")
      .toReversed();
    if (!Array.isArray(baseData)) {
      //console.warn(`Datos no son un array en ${collection}`);
      return { content: [], totalElements: 0, totalPages: 0 };
    }
    // 3. Aplicar filtros
    const filteredData = applyFiltersWidthRelation(baseData, filters);
    // 4. Aplicar ordenamiento
    const sortedData = applySorting(filteredData, sortParam);
    // 5. Calcular paginación
    const totalElements = sortedData.length;
    const start = page * size;
    const end = start + size;
    let pageContent = sortedData.slice(start, end);
    if (mapperFn) {
      pageContent = pageContent.map(mapperFn)
    }
    // 6. Construir respuesta (Pasamos sortParam explícitamente para evitar scope issues)
    return { ...buildPageResponse(pageContent, page, size, totalElements, sortParam) };
  },

  update(collection, filterFn, updateFn, meta = false) {
    const data = this[collection].find(filterFn)
    if (!data) return null;
    const index = this.__getIndex(collection, data.id);
    if (index > -1) {
      this[collection][index] = updateFn(this[collection][index])
    }
    if (meta) {
      return this.__buildMeta(this[collection][index], collection)
    }
    return this[collection][index];
  },


}
