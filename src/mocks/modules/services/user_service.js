import { baseService } from '@/mocks/modules/services/baseService.js';
import { currentLoggedUser, db } from '@/mocks/modules/db.js';
import { createMockDate } from '../utils';


const collection = 'users';

export const user_service = {

    ...(baseService(collection)),

    create: (data) => {
        return db.save(collection, data)
    },

    getMyProfile: () => {
        return  db.find(collection, item => item.username === currentLoggedUser);
    },

    updateMyProfile: (update) => {
        const user = this.getMyProfile();
        return db.update(collection, user.id, update) 
    },

    updateProfile: (id, update) => {
        return db.update(collection, id, update) 
    },

    banUser: (id, request) =>{

        const user = user_service.getById(id);
        if(!user) throw new Error("Usuario no encontrado");
        user.banExpiresAt = request.banExpiresAt || request.unbanDate;
        user.bannedAt = new Date();
        user.meta.status = "BANNED"
        user.banReason = request.banReason;
        return db.save(collection, user)  
    },
 
    unbanUser: (id) =>{
        const user = user_service.getById(id);
        if(!user) throw new Error("Usuario no encontrado");
        user.status.meta = "ACTIVE";
        user.banExpiresAt = null;
        return db.save(collection, user)  
    },

    updateProfileImage: (url) => {
        return db.update(collection, item => item.username === currentLoggedUser, u => ({...u, image: url}) )   
    },

    changeEmail: (username, password, newEmail) => {
        const user = db.find(collection,  u => u.username == username)
        if(user){
            if(user.password == password){
                return db.update(collection, u => u.username == username, u => ({...u, email: newEmail}))
            }
            return null;
        } 
        return null;
     },


    changePassword: (username, oldPassword, newPassword) => {
        const user = db.find(collection,  u => u.username == username)
        if(user){
            if(user.password == oldPassword){
                return db.update(collection, u => u.username == username, u => ({...u, password: newPassword}))
            }
            return null;
        } 
        return null;
     },


    // HACK: soluciona db._buildMeta() borra campos de meta
    getById: (id) => {
        const user = db.__find(collection, u => u.id == id);
        const response = db.findWithRelations(collection, item => item.id == id, i => db.__buildMeta(i, collection) ) ; 
        
        response.meta.banExpiresAt = createMockDate(user.banExpiresAt);
        response.meta.bannedAt = createMockDate(user.bannedAt || null);
        response.meta.banReason = user.banReason;
        
        return response;
    },


}