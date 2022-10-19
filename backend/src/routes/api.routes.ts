import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './swaggerOptions';
import friendsRouter from './friends.routes';

const apiRouter = express.Router();

apiRouter.use(cors());
apiRouter.use(express.json());
apiRouter.use('/friends-api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
apiRouter.use('/friends', friendsRouter);

export default apiRouter;
