import { connect } from 'mongoose';
import endpoint from '../config/endpoints.config';

require('../Modules/partner/models/PartnerModel');

const connectToDatabase = async (): Promise<void> => {
  await connect(endpoint.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectToDatabase;
