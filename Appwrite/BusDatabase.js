import config from '../config';
import { Client, Databases, Storage, ID, Query } from 'appwrite';

export class BusService {
    client = new Client();
    database;
    storage;

    constructor() {
        this.client.setEndpoint(config.url).setProject(config.projectid);
        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createBus({ busNo, model, current_latitude, current_longitude,  from, to , driver , time , date }) {
        try {
            const documentData = {
                model: model,
                From: from,
                To: to,
                busNo: busNo,
                driver: driver,
                time: time,
                date: date,
                current_lat: current_latitude,
                current_long: current_longitude,

            };
            const uniqueId = ID.unique();
            console.log('Creating bus with unique ID:', uniqueId);
            console.log('Document data:', documentData);
    
            const response = await this.database.createDocument(
                config.databaseid,
                config.BusCollectionId,
                uniqueId,
                documentData
            );
            console.log('Bus created with response:', response);
            return response;
        } catch (error) {
            console.error('Error creating bus:', error);
            throw error;
        }
    }
    
    async updateBus(busId, { current_latitude, current_longitude }) {
        try {
           
            const existingDocument = await this.database.getDocument(
                config.databaseid,
                config.BusCollectionId,
                busId
            );
    
            // Prepare the update object with only the fields to update
            const updatedDocumentData = {
                current_lat: current_latitude,
                current_long: current_longitude
            };
    
        
            return await this.database.updateDocument(
                config.databaseid,
                config.BusCollectionId,
                busId,
                updatedDocumentData
            );
        } catch (error) {
            console.error('Error updating bus:', error);
            throw error;
        }
    }
    
    

    async deleteBus(busId) {
        try {
            return await this.database.deleteDocument(
                config.databaseid,
                config.BusCollectionId,
                busId
            );
        } catch (error) {
            console.error('Error deleting bus:', error);
            throw error;
        }
    }

    async getBus(busId) {
        try {
            return await this.database.getDocument(
                config.databaseid,
                config.BusCollectionId,
                busId
            );
        } catch (error) {
            console.error('Error retrieving bus:', error);
            throw error;
        }
    }

    async getAllBuses() {
        try {
            const response = await this.database.listDocuments(
                config.databaseid,
                config.BusCollectionId
            );
            return response;
        } catch (error) {
            console.error('Error retrieving buses:', error);
            throw error;
        }
    }

    async getAllBusesNo(busNo) {
        try {
            const response = await this.database.listDocuments(
                config.databaseid,
                config.BusCollectionId,
                [
                    Query.equal('busNo',busNo) 
                ]
            );
            return response;
        } catch (error) {
            console.error('Error retrieving buses:', error);
            throw error;
        }
    }

    async getAllBusesRoute(From , To) {
        try {
            const response = await this.database.listDocuments(
                config.databaseid,
                config.BusCollectionId,
                [
                    Query.equal('From', From),
                    Query.equal('To', To)
                ]
            );
            return response;
        } catch (error) {
            console.error('Error retrieving buses:', error);
            throw error;
        }
    }


    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.bucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(
                config.bucketId,
                fileId
            );
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    }

    async getFilePreview(fileId) {
        try {
            return await this.storage.getFilePreview(
                config.bucketId,
                fileId
            );
        } catch (error) {
            console.error('Error getting file preview:', error);
            throw error;
        }
    }
}

const busService = new BusService();
export default busService;
