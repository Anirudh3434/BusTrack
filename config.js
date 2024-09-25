const config = {
    url: import.meta.env.VITE_APPWRITE_URL,
    projectid: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseid: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    DriverCollectionId: import.meta.env.VITE_APPWRITE_DRIVER_COLLECTION_ID,
    BusCollectionId: import.meta.env.VITE_APPWRITE_BUS_COLLECTION_ID,
    Weather: import.meta.env.WEATHER_API_KEY,
    
    firebaseApiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    firebaseAuthDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    firebaseStorageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: import.meta.env.VITE_FIREBASE_APP_ID,
    firebaseMeasurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };
  
  export default config;
  