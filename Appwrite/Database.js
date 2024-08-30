import { queryEqual } from 'firebase/firestore';
import config from '../config';
import { Client, Databases, Storage, ID, Query } from 'appwrite';

export class Service {
    client = new Client();
    database;
    storage;

    constructor() {
        this.client.setEndpoint(config.url).setProject(config.projectid);
        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);
    }



    async createDriver({ name, DL, age, email }) {
        try {
            const documentData = {
                driver_name: name,
                DL: DL,
                age: age,
                driver_email: email,
            };
            return await this.database.createDocument(
                config.databaseid,
                config.DriverCollectionId,
                ID.unique(),
                documentData
            );
        } catch (error) {
            console.error('Error creating driver:', error);
            throw error;
        }
    }

    async updateDriver(driverId, { name, DL, age, email }) {
        try {
            const documentData = {
                driver_name: name,
                DL: DL,
                age: age,
                driver_email: email,
            };
            return await this.database.updateDocument(
                config.databaseid,
                config.DriverCollectionId,
                driverId,
                documentData
            );
        } catch (error) {
            console.error('Error updating driver:', error);
            throw error;
        }
    }

    async deleteDriver(driverId) {
        try {
            return await this.database.deleteDocument(
                config.databaseid,
                config.DriverCollectionId,
                driverId
            );
        } catch (error) {
            console.error('Error deleting driver:', error);
            throw error;
        }
    }

    async getDriver(email) {
        try {
            return await this.database.listDocuments(
                config.databaseid,
                config.DriverCollectionId,
                [
                    Query.equal('driver_email', email)
                ]
            );
        } catch (error) {
            console.error('Error retrieving driver:', error);
            throw error;
        }
    }

    async getAllDrivers() {
        try {
            const response = await this.database.listDocuments(
                config.databaseid,
                config.DriverCollectionId,
                

                
            );
            return response;
        } catch (error) {
            console.error('Error retrieving drivers:', error);
            throw error;
        }
    }

    // Bus-related methods

  
}

const service = new Service();
export default service;
