import type { StorageOptions } from "@google-cloud/storage";

export type ClientOptions = {} & StorageOptions;

export interface GetStatisticsReportsOptions {
  reportMonth?: string;
  bucketName: string;
  packageName: string;
}

export interface CSVRowData {
  [name: string]: string;
}

export interface StatisticsReportData {
  Date: string;
  "Package Name": string;
  "Daily Device Installs": string;
  "Daily Device Uninstalls": string;
  "Daily Device Upgrades": string;
  "Total User Installs": string;
  "Daily User Installs": string;
  "Daily User Uninstalls": string;
  "Active Device Installs": string;
  "Install events": string;
  "Update events": string;
  "Uninstall events": string;
}
