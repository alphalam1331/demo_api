import { join } from 'path';

import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

import { appConfig, pgConfig } from '@/config/configurations';

const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('local', 'dev', 'prod').required(),
  PORT: Joi.number().default(3000),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
});

export default ConfigModule.forRoot({
  isGlobal: true,
  envFilePath:
    process.env.NODE_ENV == 'local'
      ? [join(__dirname, '..', '..', 'env', '.env.local')]
      : null,
  load: [pgConfig, appConfig],
  validationOptions: {
    allowUnknown: true,
    abortEarly: false,
  },
  validationSchema,
});
