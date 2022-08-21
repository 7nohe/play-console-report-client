# @7nohe/play-console-report-client

>  Node.js library for getting report data from Google Play Console

## Install

```bash
$ npm install @7nohe/play-console-report-client
```

## Usage

```ts
import { createClient } from "@7nohe/play-console-report-client";

const client = createClient({
  projectId: '<YOUR-PROJECT-ID>',
  credentials: {
    client_email: '<YOUR-CLIENT-EMAIL>',
    private_key: '<YOUR-PRIVATE-KEY>',
  },
});

const run = async () => {
  const statisticsReports = await client.getStatisticsReports({
    reportMonth: "202207",
    bucketName: '<YOUR-BUCKET-NAME>',
    packageName: '<YOUR-PACKAGE-NAME>',
  });
  console.log(statisticsReports); 
}

run();
```

### `credentials`

You can get credential information (`client_email` and `private_key`) from a service account key.

[Here](https://developers.google.com/android-publisher/getting_started) is a guide to creating a service account key.

Also, you need to enable Google Play Developer API.


### `bucketName`

You can find your bucket name in [Play Console](https://play.google.com/apps/publish/).

Click `Download reports Reports`, and select `Reviews`, `Statistics`, or `Financial`.

You can copy your Google Cloud Storage URI by clicking the `Copy Cloud Storage URI` button next to the corresponding section header on the Download reports pages.

![copy-cloud-storage-uri](/img/copy-cloud-storage-uri.png)

Your Google Cloud Storage URI should look like this.

```
gs://<YOUR-BUCKET-NAME>/stats/installs/
```

### Accessing to Google Cloud resources without using a service account key

If your environment supports OpenID Connect (OIDC), we recommend using [Workload identity federation](https://cloud.google.com/iam/docs/workload-identity-federation).

You will be able to access GCP resources without storing credentials in your environment.

```ts
import { createClient } from "@7nohe/play-console-report-client";

const client = createClient({
  projectId: '<YOUR-PROJECT-ID>',
  // No credentials required.
});
```

### Example

[Here](https://github.com/7nohe/play-console-slack-report-example) is an example of sending a statistics report to Slack.

## API Documentation

Currently, only Statistics Reports API is available.

```ts
declare const createClient: (clientOptions: ClientOptions) => {
    getStatisticsReports: (options: GetStatisticsReportsOptions) => Promise<StatisticsReportData[]>;
};
```
