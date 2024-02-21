import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

import appConfig from '../config/app-config';
import pgConfig from '../config/pg-config';

const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'prod').required(),
  PORT: Joi.number().default(3000),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
});

export default ConfigModule.forRoot({
  isGlobal: true,
  load: [pgConfig, appConfig],
  validationOptions: {
    allowUnknown: true,
    abortEarly: false,
  },
  validationSchema,
});
