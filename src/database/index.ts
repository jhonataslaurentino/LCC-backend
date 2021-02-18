import { connect } from 'mongoose';

const connectToDatabase = async (): Promise<void> => {
  await connect('mongodb://localhost:27017/LCC', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectToDatabase;
