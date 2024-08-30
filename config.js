const config = {
    url: import.meta.env.VITE_APPWRITE_URL,
    projectid: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseid: import.meta.env.VITE_APPWRITE_DATABASE_ID,
   DriverCollectionId: import.meta.env.VITE_APPWRITE_DRIVER_COLLECTION_ID,
   BusCollectionId: import.meta.env.VITE_APPWRITE_BUS_COLLECTION_ID,
   Weather: import.meta.env.WEATHER_API_KEY,

  };
  
  export default config;