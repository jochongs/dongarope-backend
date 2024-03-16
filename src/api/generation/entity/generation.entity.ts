import { Generation } from '@prisma/client';

export class GenerationEntity {
  uuid: string;
  name: string;
  createdAt: Date;

  constructor(data: { uuid: string; name: string; createdAt: Date }) {
    this.uuid = data.uuid;
    this.name = data.name;
    this.createdAt = data.createdAt;
  }

  static createGenerationEntity(generation: Generation): GenerationEntity {
    return new GenerationEntity({
      uuid: generation.uuid,
      name: generation.name,
      createdAt: generation.createdAt,
    });
  }
}
