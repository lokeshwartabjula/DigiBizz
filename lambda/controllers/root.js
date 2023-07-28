import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = 'Store';

const uploadDataToDynamoDB = async (storeData) => {
  try {
    const params = {
      TableName: 'Store',
      Item: storeData
    };

    await dynamodb.put(params).promise();

    console.log('Data uploaded to DynamoDB.');
  } catch (error) {
    console.error('Error uploading data to DynamoDB:', error);
  }
};

const storeData = async (req, res) => {
  const storeDataObj = req.body;

  // ------------------------- DynamoDB -------------------------
  await uploadDataToDynamoDB(storeDataObj);

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
