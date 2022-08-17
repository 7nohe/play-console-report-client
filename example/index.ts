import { createClient } from "../dist";
import * as dotenv from "dotenv";
dotenv.config();

const client = createClient({
  projectId: process.env.PROJECT_ID,
  keyFilename: "./play-console-report-key.json",
});

const statisticsReports = await client.getStatisticsReports({
  reportMonth: "202207",
  bucketName: process.env.BUCKET_NAME!,
  packageName: process.env.PACKAGE_NAME!,
});

console.log(statisticsReports);
