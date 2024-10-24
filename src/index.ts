import 'dotenv/config';
import express from 'express';
import categoryRoutes from './routes/category';

// import postRoutes from './routes/post.js';
// import commentRoutes from './routes/comment.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use('/categories', categoryRoutes);
// app.use('/posts', postRoutes);
// app.use('/comments', commentRoutes);

app.listen(PORT, () => {
  console.log('Sunucu ayakta');
});
