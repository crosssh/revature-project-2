import { aws } from "aws-sdk";
import { ConfigurationOptions } from "aws-sdk/lib/config";
const awsConfig: ConfigurationOptions = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

aws.config.update(awsConfig);
const docClient = new aws.DynamoDB.DocumentClient();

const newPop = {
  auctionEndTime: 0,
  buyNowPrice: 26,
  category: "movies",
  condition: "good",
  currentBidPrice: 15,
  currentBidder: "gem95",
  minimumBidPrice: 15,
  name: "Guardians of the Galaxy: Rocket",
  photos: "urls",
  status: "available",
  timePosted: 1529069926562,
  type: "vinyls",
  username: "Crosssh"
};

export function saveReim(newstuff: any): Promise<any> {
  return docClient
    .put({
      Item: newstuff,
      TableName: "Product"
    })
    .promise();
}

export function getAllItems(): Promise<any> {
  return docClient
    .scan({
      TableName: "Product"
    })
    .promise();
}

saveReim(newPop);

getAllItems()
  .then(data => {
    console.log(data.Items);
  })
  .catch(err => {
    console.log(err);
  });
