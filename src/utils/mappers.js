export function toLocalDateTime(selectedDate){
    const dateObj = new Date(selectedDate);
    // Construcción manual del array
    const dateArray = [
        dateObj.getFullYear(),           // Año (ej: 2026)
        dateObj.getMonth() + 1,          // Mes (1-12). Nota: getMonth() devuelve 0-11
        dateObj.getDate(),               // Día (1-31)
        dateObj.getHours(),              // Hora (0-23)
        dateObj.getMinutes(),            // Minuto (0-59)
        dateObj.getSeconds(),            // Segundo (0-59)
        dateObj.getMilliseconds()        // Milisegundo (0-999)
    ];
   return dateArray
}



export function toBanUser(data){
    return ({
        banReason: toLocalDateTime(data.banReason),
        banExpiresAt: data.banExpiresAt,
    
    })
}




export const toPasswordChangeRequest = (passwData) => {
   return{
    "oldPassword" : passwData.oldPassword,
    "newPassword" : passwData.newPassword
   }
}

export const toCreateOrder = (cartItems) => {
    let totalAmount = 0;
    let totalQuantity = 0;
    // Nota: priceAtPurchase y totalAmount 
    // deben ser enviados como string para 
    // mantener precision.
    return {
        "items": cartItems.map((item) => {
            totalAmount += item?.finalPrice * item?.cantidad;
            totalQuantity += item?.cantidad;
            return {
                "productId": item?.productId,
                "listingId": item?.id,
                "name": item?.productName,
                "quantity": item?.cantidad,
                "priceAtPurchase": `${item?.finalPrice}`,
                "discountPercentageAtPurchase": item?.discountPercentage
            }
        }),
        "totalAmount": `${totalAmount.toFixed(2)}`,
        "totalQuantity": totalQuantity,
    }

}



export function toCreateProduct(data) {
    const dimensions = {
        width: data.width,
        height: data.height,
        depth: data.depth
    }

    return {
        name: data.name,
        sku: data.sku,
        brand: data.brand,
        weight: data.weight,
        dimensions: dimensions,
        category: data.category,
        tags: data.tags,
        status: data.status
    }
}



// TODO: implementar funcion toUpdateUser
export function toUpdateUser(data){
    return data
}

export function toUpdateProduct(data) {
    const dimensions = {
        width: data.width,
        height: data.height,
        depth: data.depth
    }

    return ({
        name: data.name,
        brand: data.brand,
        weight: data.weight,
        status: data.status,
        rating: data.rating,
        dimensions: dimensions,
        category: data.category,
        tags: data.tags
    })
}


export function toCreateListing(data) {
    const images = data?.images?.length != 0 ? data.images : []
    // descartar url temporales (preview) antes de enviar.
    const cleanImages = images.filter(url => !url.startsWith('data:') );

    return {
        title: data.title,
        description: data.description,
        price: data.price,
        stock: data.stock,
        discountPercentage: data.discountPercentage,
        warrantyInformation: data.warrantyInformation,
        shippingInformation: data.shippingInformation,
        returnPolicy: data.returnPolicy,
        minimumOrderQuantity: data.minimumOrderQuantity,
        images: cleanImages,
        thumbnail: data.thumbnail,
        sku: data.sku,
        status: data.status
    }
}


// FIXME: data.images deberia ser una lista de strings, no files 
export function toUpdateListing(data) {
    return {
        title: data.title,
        description: data.description,
        price: data.price,
        stock: data.stock,
        sku: data.sku,
        discountPercentage: data.discountPercentage,
        warrantyInformation: data.warrantyInformation,
        shippingInformation: data.shippingInformation,
        availabilityStatus: data.availabilityStatus,
        returnPolicy: data.returnPolicy,
        minimumOrderQuantity: data.minimumOrderQuantity,
        images: data.images,
        thumbnail: data.thumbnail
    }
}




export function arrayToDate(arr){
    if(!arr || arr?.length == 0){
        return null
    }
    const [yy, mm, dd, hh, xx] = arr;
    return new Date(
        yy,       // Año
        mm ,   // Mes (ajustado a 0-11)
        dd,       // Día
        hh,       // Hora
        xx,       // Minuto
    );        
}


export const mapToURLSearchParams = (urlParams, filters) => {
    Object.entries(filters).forEach(([key, value]) => {
        // // console.log(key, value);
        // Solo agregamos si el valor existe y no es un objeto/array vacío
        if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value) && value.length > 0) {
                urlParams.append(key, value.join(','));
            } else if (!Array.isArray(value)) {
                urlParams.append(key, value);
            }
        }
    })

}



export function formatDate([year, month, day, hour, min], time=false) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const dd = String(day).padStart(2, "0");
  const mmm = months[month - 1];

  const date = time ? 
    `${dd} ${mmm}, ${year}, ${hour}: ${min}` : 
    `${dd} ${mmm}, ${year}`

  return date;
}