import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { GenerationController } from './generation.controller';
import { GenerationService } from './generation.service';

@Module({
  imports: [PrismaModule],
  providers: [GenerationService],
  controllers: [GenerationController],
  exports: [GenerationService],
})
export class GenerationModule {}
