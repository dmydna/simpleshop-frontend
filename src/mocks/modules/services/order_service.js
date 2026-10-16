import { currentLoggedUser, db } from '@/mocks/modules/db.js';
import { baseService } from '@/mocks/modules/services/baseService.js';
import { listing_service } from '@/mocks/modules/services/listing_service.js';
import { user_service } from '@/mocks/modules/services/user_service.js';
import { createMockDate } from '@/mocks/modules/utils.js';


const collection = 'orders';

export const order_service = {

    ...(baseService(collection)),

    // HACK: soluciona db._buildMeta borra status.
    getById: (id) => {
        const order = db.__find("orders", o => o.id == id);
        const response_order =  db.findWithRelations(collection,  o => o.id == String(id)  );
        response_order.status = order.status;
        return response_order;
    },


    create: async (data) => {
        
        const items = data.items;

        // guardado ligero (sin detalles)
        const savedOrder = db.save(
            "orders", 
            { ...data, failed: [], items:[], operationNumber: Date.now() }
        )
        
        // procesar los detalles del pedido (items de la compra)
        await order_service.processOrder(items, savedOrder);

        return savedOrder
    },


    filterPageItem: (request) => {
        const user = user_service.getMyProfile()
        const url = new URL(request.url);
        url.searchParams.set('userId', user.id );
        // url.searchParams.set('status', 'PAID' );
        const newRequest = new Request(url, request);
        return db.findPage("orders_items",newRequest);
    },


    processOrder: async (items, order) => {

        const failed = [];
        const valid =  [];

        for (let item of items) {

            if(!order_service.decreaseStock(item)){
                failed.push(item);
                continue;
            }
            valid.push(item)
        }

        // crear y guardar cada order item. 
        valid.forEach(item => {
            const orderItem = order_service.createOrderItems(item, order);
            const review = order_service.createReviewsForOrderItem(orderItem);
            db.update(
                "orders_items", 
                i => i.id == orderItem.id, 
                i => ({...i, reviewId : review.id})
            )
        }) 
        
        return true
    },


    createReviewsForOrderItem(orderItem){
        return db.save("reviews",{
            username: currentLoggedUser,
            title: orderItem.name,
            userPic: '',
            rating: null,
            thumbnail: orderItem.thumbnail,
            comment: '',
            productId: orderItem.id,
            orderItemId: orderItem.id,
            listingId: orderItem.listingId,
            status: "PENDING"
        })
    },

    updateOrderItem: (update) =>{
        console.log("update order item", update)
        return db.update("orders_items", i => i.id ==update.id  , () => update)
    },

    createOrderItems: (item, order) => {

        const user = user_service.getMyProfile()
        const listing = listing_service.getById(item.listingId)

        if (!listing) return false;

        return db.save("orders_items",{
            userId: user.id,
            orderId: order.id,
            listingId: listing.id,
            productId: null,
            reviewId:  null,
            rating: null,
            thumbnail: listing.thumbnail,
            name: listing.title,
            status: order.status,
            stock: listing.stock,
            quantity: item.quantity,
            priceAtPurchase: listing.finalPrice, 
            discountPercentageAtPurchase: listing.discountPercentage,
            createdAt: createMockDate( new Date() )
        })
    },

    decreaseStock: (item) => {

        let listing = listing_service.getById(item.listingId)

        if (!listing) return false;
        if (listing.stock < item.quantity) return false;

        listing.stock = item.quantity;

        listing = listing_service.setStatusForStock(listing);

        db.save("listings", listing);

        return true
   
    }

}