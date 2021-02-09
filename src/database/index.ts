import { connect } from 'mongoose';

const connectToDatabase = async () => {
  await connect('mongodb://localhost:27017/LCC', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectToDatabase;
