import { Generation, Prisma } from '@prisma/client';

const generationWithInclude = Prisma.validator<Prisma.GenerationDefaultArgs>()({
  include: {
    Group: true,
  },
});

type GenerationWithInclude = Prisma.GenerationGetPayload<
  typeof generationWithInclude
>;

export class GenerationEntity {
  idx: number;
  uuid: string;
  name: string;
  createdAt: Date;
  group: {
    idx: number;
    uuid: string;
    name: string;
  };

  constructor(data: {
    idx: number;
    uuid: string;
    name: string;
    createdAt: Date;
    group: {
      idx: number;
      uuid: string;
      name: string;
    };
  }) {
    this.idx = data.idx;
    this.uuid = data.uuid;
    this.name = data.name;
    this.createdAt = data.createdAt;
    this.group = data.group;
  }

  static createGenerationEntity(
    generation: GenerationWithInclude,
  ): GenerationEntity {
    return new GenerationEntity({
      idx: generation.idx,
      uuid: generation.uuid,
      name: generation.name,
      createdAt: generation.createdAt,
      group: {
        idx: generation.Group.idx,
        uuid: generation.Group.uuid,
        name: generation.Group.name,
      },
    });
  }
}
