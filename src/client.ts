import dayjs from "dayjs";
import { Storage } from "@google-cloud/storage";
import chardet from "chardet";
import type { ClientOptions, GetStatisticsReportsOptions } from "./interfaces";
import { parseCSV } from "./utils";

export const createClient = (clientOptions: ClientOptions) => {
  const { projectId, keyFilename, keyFile } = clientOptions;
  const storage = new Storage({ projectId, keyFilename, keyFile });
  return {
    getStatisticsReports: async (options: GetStatisticsReportsOptions) => {
      const { bucketName, packageName } = options;
      let { reportMonth } = options;
      if (!reportMonth) {
        reportMonth = dayjs().format("YYYYMM");
      }

      if (!dayjs(reportMonth, "YYYYMM", true).isValid())
        throw new Error(
          "Invalid report date. The input date must be `YYYYMM`."
        );

      const contents = await storage
        .bucket(bucketName)
        .file(
          `stats/installs/installs_${packageName}_${reportMonth}_overview.csv`
        )
        .download();

      const result = chardet.detect(contents[0]);
      const encoding = result?.toLowerCase().replace("-", "") as BufferEncoding;
      const data = await parseCSV(contents[0], encoding ?? "utf8");
      return data;
    },
  };
};
