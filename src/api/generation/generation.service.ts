import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGenerationDto } from './dto/create-generation.dto';
import { GenerationEntity } from './entity/generation.entity';
import { GenerationNotFoundException } from './exception/GenerationNotFoundException';

@Injectable()
export class GenerationService {
  constructor(private readonly prisma: PrismaService) {}

  public async getGenerationByUUID(uuid: string): Promise<GenerationEntity> {
    const generation = await this.prisma.generation.findUnique({
      include: {
        Group: true,
      },
      where: {
        uuid,
        Group: {
          deletedAt: null,
        },
        deletedAt: null,
      },
    });

    if (!generation) {
      throw new GenerationNotFoundException('Cannot find generation');
    }

    return GenerationEntity.createGenerationEntity(generation);
  }

  public async createGeneration(
    groupIdx: number,
    createDto: CreateGenerationDto,
  ): Promise<GenerationEntity> {
    const result = await this.prisma.generation.create({
      include: {
        Group: true,
      },
      data: {
        groupIdx,
        name: createDto.name,
      },
    });

    return GenerationEntity.createGenerationEntity(result);
  }

  public async getGenerationsByGroupIdx(
    groupIdx: number,
  ): Promise<GenerationEntity[]> {
    const generations = await this.prisma.generation.findMany({
      include: {
        Group: true,
      },
      where: {
        groupIdx,
        Group: {
          deletedAt: null,
        },
        deletedAt: null,
      },
      orderBy: {
        idx: 'desc',
      },
    });

    return generations.map((generation) =>
      GenerationEntity.createGenerationEntity(generation),
    );
  }
}
