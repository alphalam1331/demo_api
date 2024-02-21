import { Provider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Repository } from 'typeorm';

export function getRepositoryTokens(
  entities: EntityClassOrSchema[],
): Provider[] {
  const repos = entities.map((e) => ({
    provide: getRepositoryToken(e),
    useValue: Repository,
  }));

  return repos;
}
