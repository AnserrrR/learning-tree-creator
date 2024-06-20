import { Module } from '@nestjs/common';
import { TreeController } from './tree.controller';
import { TreeService } from './tree.service';
import { SectionModule } from '../section/section.module';

@Module({
  imports: [SectionModule],
  controllers: [TreeController],
  providers: [TreeService],
})
export class TreeModule {}
