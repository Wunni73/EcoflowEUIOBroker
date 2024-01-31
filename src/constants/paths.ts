import { ISolarFlowPaths } from "../models/ISolarFlowPaths";

/* eslint-disable @typescript-eslint/indent */
const hostname = `app.zendure.tech`;
const versionGlobal = `eu`; // v2 old Global
const versionEu = `eu`; // currently not used! Only the global server is ready at the moment

const solarFlowDevRegisterPath = `developer/api/apply`;
const solarFlowTokenPath = `auth/app/token`;
const solarFlowDeviceListPath = `productModule/device/queryDeviceListByConsumerId`;

export const pathsGlobal: ISolarFlowPaths = {
  solarFlowDevRegisterUrl: `https://${hostname}/${versionGlobal}/${solarFlowDevRegisterPath}`,
  solarFlowTokenUrl: `https://${hostname}/${versionGlobal}/${solarFlowTokenPath}`,
  solarFlowQueryDeviceListUrl: `https://${hostname}/${versionGlobal}/${solarFlowDeviceListPath}`,
  mqttUrl: "mqtteu.zen-iot.com",  //mq.zen-iot.com old Global
  mqttPort: 1883,
};

export const pathsEu: ISolarFlowPaths = {
  solarFlowDevRegisterUrl: `https://${hostname}/${versionEu}/${solarFlowDevRegisterPath}`,
  solarFlowTokenUrl: `https://${hostname}/${versionEu}/${solarFlowTokenPath}`,
  solarFlowQueryDeviceListUrl: `https://${hostname}/${versionEu}/${solarFlowDeviceListPath}`,
  mqttUrl: "mqtteu.zen-iot.com",
  mqttPort: 1883,
};
