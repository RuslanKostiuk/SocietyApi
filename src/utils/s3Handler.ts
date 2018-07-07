import * as AWS from "aws-sdk";
import {ErrorHandler} from "../shared/errorHandler";
import {ErrorStatuses} from "../shared/enums";
import {FileOptions} from "../shared/types";

export default class S3Handler {
    private s3: AWS.S3;
    private fileBaseUrl: string = "http://localhost:4569";

    constructor() {
        this.s3 = new AWS.S3({
            s3ForcePathStyle: true,
            endpoint: this.fileBaseUrl,
            sslEnabled: false,
            accessKeyId: "123",
            secretAccessKey: "abc"
        })
    }

    public async saveToBucket(data: Buffer, fileOptions: FileOptions): Promise<string> {
        let bucketPrefix: string = `/storrage/${fileOptions.bucket}`;

        try {
            await this.s3.putObject({
                Bucket: fileOptions.bucket,
                Key: `${bucketPrefix}/${fileOptions.key}`,
                ContentDisposition: `attachment; filename=${fileOptions.name}`,
                Body: data,
                ACL: "public-read",
                ServerSideEncryption: "AES256"
            }).promise();
        } catch (error) {
            throw ErrorHandler.BuildError(ErrorStatuses.s3Error, error.message);
        }

        return `${this.fileBaseUrl}/${bucketPrefix}/${fileOptions.key}`;
    }

    public async createBucket(bucketName: string): Promise<void> {
        await this.s3.createBucket({Bucket: "" + bucketName}).promise();
    }
}