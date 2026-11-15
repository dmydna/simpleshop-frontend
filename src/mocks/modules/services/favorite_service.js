import { db } from '@/mocks/modules/db.js';
import { baseService } from '@/mocks/modules/services/baseService.js';
import { listing_service } from '@/mocks/modules/services/listing_service.js';
import { user_service } from '@/mocks/modules/services/user_service.js';


const collection = 'favorites';

export const favorite_service = {

    ...(baseService(collection)),


    create: (listingId, userId) =>{
        const existingFavorite = db.exists(collection, (item) => item.userId == userId && item.listingId == listingId);
        const existingListing = listing_service.getById(listingId);
        const existingUser = user_service.getById(userId);

        if(existingFavorite){ return existingFavorite }
        if(!existingListing){ return null }
        if(!existingUser) {return null}    
 
        return db.save(collection ,{ 
            listingId: listingId,
            userId: userId, // <-- relacion favorite/user
        })          
    },

    getById(id){
        const auth = user_service.getMyProfile()
        if(auth){
            return db.find(collection, f => f.userId === auth.id && f.listingId == id)
        }

    },

    existsById: (id) => {
        const auth = user_service.getMyProfile()
        const fav = db.exists(collection, f => f.userId === auth.id && f.listingId == id)
        console.log(db[collection], fav)
        return {"isFavorite": fav }
    },

    filterPage: (request) => {
        return db.findPage(collection, request, { mapper: favoriteMapper })
    },

    deleteById:(listingId) => {
        return db.deleteFrom(collection, i => i.listingId == listingId)
    },

}


export const favoriteMapper = ({userId, listingId}) => {
    const { id, title, price, stock,  finalPrice, discountPercentage,
        availabilityStatus, thumbnail } 
        = listing_service.getById(listingId)
    return { id, title, price, stock,  finalPrice, discountPercentage,
        availabilityStatus, thumbnail, userId }
}
