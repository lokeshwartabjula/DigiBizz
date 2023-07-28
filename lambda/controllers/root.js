import axios from 'axios';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

AWS.config.update({ region: 'us-east-1' });

const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: 'us-east-1'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = 'Store';

const uploadImageToS3 = async (item) => {
  try {
    const matches = item.image_url.match(/^data:image\/(\w+);base64,(.*)$/);
    if (!matches) {
      throw new Error('Invalid base64 image data');
    }
    const [, imageFormat, base64Data] = matches;

    const buffer = Buffer.from(base64Data, 'base64');

    const uuid = uuidv4();

    const params = {
      Bucket: 'your-s3-bucket-name',
      Key: `images/${uuid}.${imageFormat}`,
      Body: buffer,
      ACL: 'public-read',
      ContentType: `image/${imageFormat}`
    };
    const uploadedImage = await s3.upload(params).promise();
    item.image_url = uploadedImage.Location;
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

const uploadDataToDynamoDB = async (storeData) => {
  try {
    const params = {
      TableName: 'your-dynamodb-table-name',
      Item: storeData
    };

    await dynamoDB.put(params).promise();

    console.log('Data uploaded to DynamoDB.');
  } catch (error) {
    console.error('Error uploading data to DynamoDB:', error);
  }
};

const storeData = async (req, res) => {
  const storeData = req.items.data;

  // ------------------------- 1. S3 Upload -------------------------

  await Promise.all(storeData.map(uploadImageToS3));

  // ------------------------- 2. DynamoDB -------------------------

  await uploadDataToDynamoDB(storeData);

  return res.json({
    message: 'Success'
  });
};

const getItemsDetail = async (req, res) => {
  const params = {
    TableName: tableName
  };

  try {
    const result = await dynamodb.scan(params).promise();

    res.json({
      message: 'Success',
      items: result.Items
    });
  } catch (err) {
    console.error('Error fetching data:', err);
    return [];
  }
};

export { getItemsDetail, storeData };
