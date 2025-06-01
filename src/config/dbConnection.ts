import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions } from "@nestjs/mongoose";
import { Connection } from "mongoose";

export const databaseConfiguration = (
  configService: ConfigService,
): MongooseModuleOptions => {
  const uri = configService.get<string>('MONGO_URL');
  console.log('👉 MongoDB URI from config:', uri);

  return {
    uri,
   connectionFactory: (connection: Connection) => {
  console.log('🚀 connectionFactory executed');

  // Still attach the listeners
  connection.on('connected', () => {
    console.log('✅ MongoDB connected successfully! [event]');
  });

  connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
  });

  // Also manually check readyState
  setTimeout(() => {
    if (connection.readyState === 1) {
      console.log('✅ MongoDB connected successfully! [manual check]');
    } else {
      console.warn('⚠️ MongoDB connection not ready yet. readyState =', connection.readyState);
    }
  }, 2000); // give it a little delay

  return connection;
}

  };
};
