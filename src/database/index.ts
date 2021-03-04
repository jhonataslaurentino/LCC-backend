import { connect } from 'mongoose';
import endpoint from '../config/endpoints.config';

const connectToDatabase = async (): Promise<void> => {
  await connect(endpoint.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectToDatabase;
