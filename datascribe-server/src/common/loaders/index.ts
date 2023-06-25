import expressLoader from './express';
import connectDB from './database';

export default async ({ expressApp }) => {
    // Establish a database connection for node's process
    await connectDB();
    console.info('-------------------Db connected successfully------------------');
    console.info('-------------------express loaded------------------');
    await expressLoader({ app: expressApp });
};
