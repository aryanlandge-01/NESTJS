import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Express } from 'express';
import { Repository } from 'typeorm';
import { Upload } from '../upload.entity';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { ConfigService } from '@nestjs/config';
import { UploadFile } from '../interfaces/upload-file.interface';
import { fileTypes } from '../enums/file-types.enum';


@Injectable()
export class UploadsService {
    constructor(
        /**
         * Inject the uploadRepository
         */
        @InjectRepository(Upload)
        private readonly uploadsRepository: Repository<Upload>,

        /**
         * Inject uploadToAwsProvider
         */
        private readonly uploadToAwsProvider: UploadToAwsProvider,

        /**
         * Inject configService
         */
        private readonly configService: ConfigService,
    ){}

    public async uploadFile(file: Express.Multer.File){
        try {
            // throw error for unsupported MIME types
            if(!['image/gif','image/jpeg','image/jpg','image/png'].includes(file.mimetype)){
            throw new BadRequestException('MIME Type not supported.')}
            // upload to the file to aws
            const name = await this.uploadToAwsProvider.fileUpload(file);
            // Generate new entry in database
            const uploadFile: UploadFile = {
               name: name,
               path: `https://${this.configService.get('appConfig.awsCloudFrontUrl')}/${name}`,
               type: fileTypes.IMAGE,
               mime: file.mimetype,
               size: file.size,
            }

            const upload = this.uploadsRepository.create(uploadFile);

            return await this.uploadsRepository.save(upload);
        } catch (error) {
            throw new ConflictException(error);
        }


    }
}
