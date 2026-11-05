export const bi_icons = {
    "bi-person":       "F4E1",
    "bi-person-fill":  "F4DA",
    "bi-braces":       "F1C9",    // { }
    "bi-code":         "F2C8",    // < >
    "bi-code-slash":   "F2C6",    // </>
    "bi-hash":         "F40A",    // #
    "bi-at":           "F152",    // @
    "default":         "F152"
}
export const color = {
    ".melon"    : "FFE5B4",
    ".menta"    : "B2F2BB",
    ".lavanda"  : "C7CEEA",
//  ".limon"    : "FFFACD",
    ".rosa"     : "FFD6E0",
    ".cielo"    : "B5D8F7",
    ".lila"     : "E6CCFF",
    ".coral"    : "FFCBA4",
    ".aqua"     : "B2EBF2",
    ".manteca"  : "FFF5B7",
    ".salmon"   : "FFB7B2",
    ".pera"     : "D4F1A0",
    ".malva"    : "F2C4CE",
    ".celeste"  : "C9E8FF",
    ".durazno"  : "FFDAC1",
}

export const hexColor = {
    ".melon"    : "#FFE5B4",
    ".menta"    : "#B2F2BB",
    ".lavanda"  : "#C7CEEA",
//  ".limon"    : "#FFFACD",
    ".rosa"     : "#FFD6E0",
    ".cielo"    : "#B5D8F7",
    ".lila"     : "#E6CCFF",
    ".coral"    : "#FFCBA4",
    ".aqua"     : "#B2EBF2",
    ".manteca"  : "#FFF5B7",
    ".salmon"   : "#FFB7B2",
    ".pera"     : "#D4F1A0",
    ".malva"    : "#F2C4CE",
    ".celeste"  : "#C9E8FF",
    ".durazno"  : "#FFDAC1",
}


export const role = Object.freeze({
    ADMIN: "ADMIN",
    CLIENT: "CLIENT"
});

export const category = Object.freeze({
    GROCERIES: "groceries",
    FURNITURE: "furniture",
    FRAGRANCES:"fragrances",
    BEAUTY:"beauty"
});

export const tags = Object.freeze({
    GROCERIES: "groceries",
    FURNITURE: "furniture",
    FRAGRANCE:"fragrances",
    BEAUTY:"beauty",
    FRUITS: "fruits",
    VEGATBLES: "vegetables",
    BEVERAGES: "beverages ",
    DESSERTS: "desserts",
    CONDIMENTS: "condiments",
    SEAFOOD: "seafood"

});



export const userTypeQuery  = Object.freeze({
    mail:      "mail",
    username:  "username",
    firstname: "firstName",
    lastname:  "lastName",
    clientname:"clientname"
})

export const productTypeQuery  = Object.freeze({
  sku: "sku",
  brand: "brand",
  id: "id"
})



export const availabilityStock = Object.freeze({
    InStock: "In Stock",
    OutStock: "Out Stock",
    LowStock: "Low Stock",
    Pending: "Pending"
})


export const status = Object.freeze({
    ACTIVE:   "ACTIVE",
    INACTIVE: "INACTIVE",
    DRAFT:    "DRAFT",
    DELETED:  "DELETED",
});



export const userStatus = Object.freeze({
    ACTIVE:   "ACTIVE",
    INACTIVE: "INACTIVE",
    BANNED:  "BANNED",
});

export const CRUD = Object.freeze({
    CREATE: 'create',
    READ:   'read',
    UPDATE: 'update',
    DELETE: 'delete',
    EDIT:   'update',
    DRAFT:  'draft',
    VIEW:   'read',
    COPY:   'copy',
    CREATE_DRAFT: 'create.draft',
    EDIT_DRAFT: 'edit.draft'
});

export const mode = Object.freeze({
    INIT: '',
    CREATE: 'create',
    READ:   'read',
    UPDATE: 'update',
    DELETE: 'delete',
    SELECT: 'select',
});



export const pillColor = Object.freeze({
   "ADMIN":   "pill-dark",
   "CLIENT":  "pill-success",
/* --------------------------------- */
   "ACTIVE":   "pill-primary",
   "INACTIVE": "pill-secondary",
   "DELETED":  "pill-danger",
/* --------------------------------- */
   "BANNED":   "pill-danger",
   "DRAFT":    "pill-dark",
/* --------------------------------- */
   "In Stock": "pill-success",
   "Low Stock": "pill-warning",
   "Out Stock": "pill-danger",
   "Pending":   "pill-secondary"
})
