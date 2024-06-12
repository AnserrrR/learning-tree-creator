import {
  Body, Controller, Get, Logger, Param, Post, Res, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { ImageControllerEndpoints } from '../endpoints/image-controller-endpoints';
import { ImageService } from '../services/image.service';
import { IFileOrImageUploadBody } from '../interfaces/file-or-image-upload-body.interface';
import { ImageStoreEntity } from '../entities/image-store.entity';
import { MessagePattern } from '@nestjs/microservices';

/**
 * Image controller.
 */
@Controller(ImageControllerEndpoints.rootEndpoint)
export class ImageController {
  private readonly logger = new Logger(ImageController.name);

  constructor(private readonly imageService: ImageService) {}

  /**
   * View an image.
   * @param imageName - ID with or without ext. "<uuid>" or "<uuid>.<ext>".
   * @param res - Express response object.
   */
  @Get(ImageControllerEndpoints.childImageView)
  async imageView(
    @Param('imageName') imageName: string,
    @Res() res: Response,
  ): Promise<void> {
    this.logger.log(`imageView: ${imageName}`);
    await this.imageService.imageGet(imageName, res);
  }

  /**
   * Download an image.
   * @param imageName - ID with or without ext. "<uuid>" or "<uuid>.<ext>".
   * @param res - Express response object.
   */
  @Get(ImageControllerEndpoints.childImageDownload)
  async imageDownload(
    @Param('imageName') imageName: string,
    @Res() res: Response,
  ): Promise<void> {
    this.logger.log(`imageDownload: ${imageName}`);
    await this.imageService.imageGet(imageName, res, { doDownload: true });
  }

  /**
   * View an avatar.
   * @param imageName - ID with or without ext. "<uuid>" or "<uuid>.<ext>".
   * @param res - Express response object.
   */
  @Get(ImageControllerEndpoints.childAvatarGet)
  async avatarGet(
    @Param('imageName') imageName: string,
    @Res() res: Response,
  ): Promise<void> {
    this.logger.log(`avatarGet: ${imageName}`);
    await this.imageService.imageGet(imageName, res, { wantAvatar: true });
  }

  /**
   * Upload an image, avatar creates automatically.
   * @param file - Multer file object.
   * @param body - Request body.
   * @return ImageStoreEntity.
   */
  @Post(ImageControllerEndpoints.childImageUpload)
  @UseInterceptors(FileInterceptor('file'))
  async imageUpload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: IFileOrImageUploadBody,
  ): Promise<ImageStoreEntity> {
    this.logger.log(`imageUpload: ${file.originalname}`);
    return this.imageService.imageUpsert(file, body);
  }

  /**
   * Update an image.
   * @param imageName - ID with or without ext. "<uuid>" or "<uuid>.<ext>".
   * @param file - Multer file object.
   * @param body - Request body.
   * @param angle - Image rotation angle in degrees. "90", "135", "270".
   * @return ImageStoreEntity.
   */
  @MessagePattern(ImageControllerEndpoints.childImageUpdate)
  @UseInterceptors(FileInterceptor('file'))
  async updateImage(
    @Param('imageName') imageName: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: IFileOrImageUploadBody,
    @Param('angle') angle?: string,
  ): Promise<ImageStoreEntity> {
    this.logger.log(`updateImage: ${imageName}`);
    return this.imageService.imageUpsert(file, body, imageName, angle);
  }
}
