import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SectionService } from './section.service';
import { ISection } from './interfaces/section.interface';

@Controller('section')
export class SectionController {
  constructor(
    private readonly sectionService: SectionService,
  ) {}

  @MessagePattern('section_get_by_id')
  async getSectionById(id: string) {
    return this.sectionService.getById(id);
  }

  @MessagePattern('section_update')
  async updateSection(section: ISection) {
    return this.sectionService.updateSection(section);
  }
}
