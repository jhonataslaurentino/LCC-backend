import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

mongoose.connect('mongodb://localhost:27017/LCC', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
