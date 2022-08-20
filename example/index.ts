import * as dotenv from "dotenv";
import { createClient } from "../dist";
dotenv.config();

const client = createClient({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY,
  },
});

const statisticsReports = await client.getStatisticsReports({
  reportMonth: "202207",
  bucketName: process.env.BUCKET_NAME!,
  packageName: process.env.PACKAGE_NAME!,
});

// eslint-disable-next-line no-console
console.log(statisticsReports);
