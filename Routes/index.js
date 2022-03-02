import categoriesRouter from './categories.js';
import userRouter from './user.js';
import attributeRouter from './attribute.js';
import productRouter from './product.js'

const routes = (app) =>{ 
     app.use('/api/category', categoriesRouter);
     app.use('/api/attribute', attributeRouter); 
     app.use('/api/user', userRouter);
     app.use('/api/product', productRouter); 
} 

export default routes