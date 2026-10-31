
import { db } from "@/mocks/modules/db";
import { collectionByFK } from "./config";

// --- PAGINATION UTILS ---

/**
 * Extrae parámetros de paginación, ordenamiento y filtros de negocio de la URL.
 */
export const extractPaginationParams = (url) => {
  const paginationKeys = new Set(['page', 'size', 'sort', 'includeTags', 'query']);
  const allParams = Object.fromEntries(url.searchParams.entries());
  
  const page = Math.max(0, parseInt(allParams.page) || 0);
  const size = parseInt(allParams.size) || 10;
  const sortParam = allParams.sort;
  
  // Filtrar solo los parámetros de negocio (los que no son de paginación)
  const filters = {};
  for (const [key, value] of Object.entries(allParams)) {
    if (!paginationKeys.has(key)) {
      filters[key] = decodeURIComponent(value.replace(/\+/g, " "));
    }
  }

  return { page, size, sortParam, filters };
};

/**
 * Aplica filtros dinámicos a un array de datos.
 */
export const applyFilters = (data, filters) => {
  if (!filters || Object.keys(filters).length === 0) return data;

  return data.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      const itemValue = item[key];

      // 1. Manejo de Rangos (minPrice, maxPrice)
      // Detectamos si la clave empieza con "min" o "max"
      if (key.startsWith('min')) {
        const field = key.replace('min', '').toLowerCase(); // Ej: "minPrice" -> "price"
        const itemPrice = parseFloat(item[field]); // Convertir a número para comparar

        // Retornar false si no es un número válido
        if (isNaN(itemPrice)) return false;

        // Comparar si el precio es mayor o igual al límite
        return itemPrice >= parseFloat(value);
      }

      if (key.startsWith('max')) {
        const field = key.replace('max', '').toLowerCase(); // Ej: "maxPrice" -> "price"
        const itemRange = parseFloat(item[field]);

        if (isNaN(itemRange)) return false;

        // Comparar si el precio es menor o igual al límite
        return itemRange <= parseFloat(value);
      }

      // 2. Filtro Estándar (String o Comparación Simple)
      if (itemValue === undefined) return false;

      if (typeof value === 'string') {
        return String(itemValue).toLowerCase().includes(value.toLowerCase());
      }
      return itemValue == value;
    });
  });
};



export default function findRelation(FK, value){
  if(collectionByFK[FK]){
    const collection = collectionByFK[FK];
    return db[collection].find(i => i.id == value) 
  } 
  return null
}


export function getRelations(item){
  const relations = [] 
  Object.entries(item).forEach( ([key, value])  => {
      const rel = findRelation(key, value);
      if(rel) relations.push(rel) 
    })
  return relations;
}



export const applyFiltersWidthRelation = (data, filters) => {
  if (!filters || Object.keys(filters).length === 0) return data;

  return data.filter(item => {

    const relations = getRelations(item);

    return Object.entries(filters).every(([key, value]) => {
  

    // HACK: si no encuentra en item busca el filtro en su primer relacion  
      const relItem = relations.length != 0 ? relations[0] : {}

      const itemValue = item[key] || relItem[key];

      // 1. Manejo de Rangos (minPrice, maxPrice)
      // Detectamos si la clave empieza con "min" o "max"
      if (key.startsWith('min')) {
        const field = key.replace('min', '').toLowerCase(); // Ej: "minPrice" -> "price"
        const itemPrice = parseFloat(item[field] || relItem[field]); // Convertir a número para comparar

        // Retornar false si no es un número válido
        if (isNaN(itemPrice)) return false;

        // Comparar si el precio es mayor o igual al límite
        return itemPrice >= parseFloat(value);
      }

      if (key.startsWith('max')) {
        const field = key.replace('max', '').toLowerCase(); // Ej: "maxPrice" -> "price"
        const itemRange = parseFloat(item[field] || relItem[field]);

        if (isNaN(itemRange)) return false;

        // Comparar si el precio es menor o igual al límite
        return itemRange <= parseFloat(value);
      }

      // 2. Filtro Estándar (String o Comparación Simple)
      if (itemValue === undefined) return false;

      if (typeof value === 'string') {
        return String(itemValue).toLowerCase().includes(value.toLowerCase());
      }
      return itemValue == value;
    });
  });
};


/**
 * Aplica ordenamiento a un array de datos.
 */
export const applySorting = (data, sortParam) => {
  if (!sortParam || data.length === 0) return data;

  const [field, direction] = sortParam.split(',');
  if (!field || !Object.prototype.hasOwnProperty.call(data[0], field)) return data;

  return [...data].sort((a, b) => {
    const valA = a[field];
    const valB = b[field];
    
    if (typeof valA === 'string') {
      return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    
    if (valA < valB) return direction === 'asc' ? -1 : 1;
    if (valA > valB) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Construye el objeto de respuesta estilo Spring Page.
 */
export const buildPageResponse = (content, page, size, totalElements, sortParam) => {
  const totalPages = totalElements === 0 ? 0 : Math.ceil(totalElements / size);
  const start = page * size;

  return {
    content,
    pageable: {
      pageNumber: page,
      pageSize: size,
      sort: { empty: !sortParam, sorted: !!sortParam, unsorted: !sortParam }, // Nota: sortParam debe estar en scope o pasarla
      offset: start,
      paged: true,
      unpaged: false
    },
    last: page === totalPages - 1,
    totalPages,
    totalElements,
    size,
    number: page,
    sort: { empty: !sortParam, sorted: !!sortParam, unsorted: !sortParam },
    numberOfElements: content.length,
    first: page === 0,
    empty: content.length === 0
  };
};



// --- DATE UTILS ---

export const createMockDate = (date, month1Index = false) => {

  if(!date) return null;

  const d = new Date(date);

  if (isNaN(d.getTime())) {
    throw new Error('Fecha inválida proporcionada a createMockDate');
  }

  const year = d.getFullYear();
  // month1Index: si es true, sumamos 1 a d.getMonth()
  const month = month1Index ? d.getMonth() + 1 : d.getMonth();
  const day = d.getDate();
  const hour = d.getHours();
  const min = d.getMinutes();

  return [year, month, day, hour, min];
};


export const dateFromMockArray = (arr, month1Index = false) => {
  if (!Array.isArray(arr) || arr.length < 5) {
    throw new Error('El array debe tener al menos 5 elementos: [year, month, day, hour, min]');
  }

  const [year, monthInput, day, hour, min] = arr;
  
  // Si el mes viene en formato 1-12, restamos 1 para que JS lo entienda (0-11)
  const month = month1Index ? monthInput - 1 : monthInput;

  return new Date(year, month, day, hour, min);
};



// --- STATS UTILS ---


export const listCountByField = async (collection, field, limit) => {

  const baseCollection = db[collection];


  const group = {};

  for (const item of baseCollection) {

    // HACK: si no encuentra en item busca el filtro en su primer relacion  
    const relations = getRelations(item)
    const relItem = relations.length == 0 ? {} : relations[0] 

    const value          = item[field] || relItem[field]
    if (value === undefined || value === null) continue;

    // Si el valor es un array (ej: status: ["active", "pending"]), contamos cada elemento individualmente
    if (Array.isArray(value)) {
      value.forEach(val => {
        if (val !== undefined && val !== null) {
          const keyName = String(val); // Convertir a string para usar como clave
          group[keyName] = (group[keyName] || 0) + 1;
        }
      });
    } else {
      // Si es un valor simple (ej: status: "active"), lo contamos directamente
      const keyName = String(value);
      group[keyName] = (group[keyName] || 0) + 1;
    }
  }

  return Object.keys(group)
    .map(k => ({ name: k, count: group[k] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};


export function isValidEmail(email) {
  // Patrón estricto para formato estándar
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}



// -- utils ---


// aplana flat en base
export function flatMapIn(base, flat){
  // quitamos compos que no puede ser aplanados (cubre caso general)
  const {id, created, updatedAt, deletedAt, ...map} = flat;
  return {...base,...map}
}
