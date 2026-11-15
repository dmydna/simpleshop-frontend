
// --- RELATIONS MAPPING DB  ---



export const configDB = {

  reviews: {
    id: { field: "id",  type: "string" },
    FK:   "username" , // HACK deberia ser "reviewId" por convencion
    relations: {
      // matchea "FK" en "collection" y lo mapea en reviews[key]
      oneToOne: [
        {  key: "user", collection: "users",  owner: true }
      ]
    }
  },

  listings: {
    // define el campo Id.
    id: { field: "id",  type: "string" },
    FK:   "listingId", 
    relations: {
      // busca y matchea listingId con item/s de collection: 
      // (e.i: collection.find(i -> i.listingId == listingId))
      oneToMany: [
        // mappea los item de collection en key 
        // (e.i: listing.reviews = [i,..] ) 
        { key: "reviews",  collection: "reviews", owner: false }
      ],
      oneToOne: [
        {  key: "product", collection: "products",  owner: true }
      ],
    },
    validation: {
      uniqueKeys: ["hash"], // define los campos unicos
      requiredKeys: ["title", "status"], // define los campos obligatorios
    },
    // define los campos destinados a meta datos 
    // toma por default : 
    // "createdAt", "updatedAt", "deletedAt"
    meta: [] 
  },

  orders: {
    id: { field: "id",  type: "string" },
    FK:   "orderId", 
    relations: {
      foreignKey: "orderId",
      oneToMany: [
         { key: "items",  collection: "orders_items", owner: false }
      ],
      oneToOne: [],
    },
    validation: {
      uniqueKeys: ["operationNumber"],
      requiredKeys: []
    },
    meta: []
  },

  products: {
    id: { field: "id",  type: "string" },
    FK:   "productId", 
    relations: {
      oneToMany: [],
      oneToOne: []
    },
    validation: {
      uniqueKeys: ["sku"],
      requiredKeys: []
    },
    meta: []
  },

  orders_items:{
    id: { field: "id", type: "string" },
    FK:   "orderItemId", 
    relations: {
      oneToMany: [],
      oneToOne: [
        { keys: "review", collection: "reviews", owner: false }
      ]
    }
  },


  users: {
    id: { field: "id", type: "string" },
    FK:   "userId", 
    relations: {
      foreignKey: "userId",
      oneToMany: [
        // { key: "orders",    collection: "orders" },
        // { key: "favorites", collection: "favorites" }
      ],
      oneToOne: []
    },
    validation: {
      uniqueKeys: ["email", "username"],
      // requiredKeys: ["email"]
    },
    meta: ["bannedAt", "banExpiresAt", "banReason"]
  }
};




export const  collectionByFK = Object.fromEntries(
    Object.entries(configDB).map(([k, v]) => [`${v?.FK}`, k])
);
