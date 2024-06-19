import { Injectable } from '@nestjs/common';
import { IStorage } from './storage';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { FileDto } from 'src/modules/user/dto/user.dto';

@Injectable()
export default class AwsStorage implements IStorage {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: 'us-east-2',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
      },
    });
  }

  async upload(file: FileDto): Promise<string> {
    const uploadObject = new Upload({
      client: this.client,
      params: {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ACL: 'public-read',
        ContentDisposition: 'inline',
      },
    });

    uploadObject.on('httpUploadProgress', (progress) => console.log(progress));

    const { Location } = await uploadObject.done();

    return Location;
  }

  async delete(url: string): Promise<void> {
    const key = url.split('.com/')[1];
    const deletCommand = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    });

    await this.client.send(deletCommand);
  }
}
