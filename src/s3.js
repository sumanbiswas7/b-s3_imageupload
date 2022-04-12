import aws from "aws-sdk";

// ! PUT EVERYTHING IN YOUR ENVIRONMENT VARIABLES
const region = "ap-south-1";
const bucketName = "movizine-imageupload";
const accessKeyId = "AKIAZV2QUBWRZ4O4QMVR";
const secretAccessKey = "56vy5ArV4zsvA+0+VEzZcteDlwc/YAeVk8qt4fDJ";

aws.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
});

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

export async function getSecureS3Url() {
  const imageName = "random-image-name";

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}
