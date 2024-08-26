import { registerEnumType } from '@nestjs/graphql';

export enum NodeTypeEnum {
  SectionNode = 'sectionNode',

  ChapterNode = 'chapterNode',
}
registerEnumType(NodeTypeEnum, {
  name: 'NodeTypeEnum',
  description: 'Node type enum',
});
