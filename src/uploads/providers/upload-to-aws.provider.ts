import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import * as path from 'path';
import {v4 as uuid4} from 'uuid';

@Injectable()
export class UploadToAwsProvider {
    constructor(
        /**
         * Inject the configservice
         */
        private readonly configService: ConfigService,
    ){}

    public async fileUpload(file: Express.Multer.File){
      const s3 = new S3();

      try {
        const uploadResult = await s3.upload({
            Bucket: this.configService.get('appConfig.awsBucketName'),
            Body: file.buffer,
            Key: this.generateFileName(file),
            ContentType: file.mimetype,
        }).promise();
    
        return uploadResult.Key;
      } catch (error) {
        throw new RequestTimeoutException(error)
      }

    }

    private generateFileName(file: Express.Multer.File){
        // extract the file name
        let name = file.originalname.split(".")[0]
        // remove white speces
        name.replace(/\s/g,'').trim()
        //extract the extension
        let extension = path.extname(file.originalname);
        //generate the timestamp
        let timestamp = new Date().getTime().toString().trim();

        return `${name}-${timestamp}-${uuid4()}${extension}`;
    }
}
