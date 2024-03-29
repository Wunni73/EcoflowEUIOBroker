/* eslint-disable @typescript-eslint/indent */
/*
 * Created with @iobroker/create-adapter v2.5.0
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
import * as utils from "@iobroker/adapter-core";
import { connectMqttClient, setChargeLimit, setDischargeLimit, setOutputLimit } from "./services/mqttService";
import { getDeviceList, login } from "./services/webService";
import { ISolarFlowDeviceDetails } from "./models/ISolarFlowDeviceDetails";
import { ISolarFlowPaths } from "./models/ISolarFlowPaths";
import { pathsGlobal } from "./constants/paths";
import { startCheckStatesTimer } from "./services/adapterService";

export class ZendureSolarflow extends utils.Adapter {
  public constructor(options: Partial<utils.AdapterOptions> = {}) {
    super({
      ...options,
      name: "zendure-solarflow",
    });
    this.on("ready", this.onReady.bind(this));
    this.on("stateChange", this.onStateChange.bind(this));
    this.on("unload", this.onUnload.bind(this));
  }

  public accessToken: string | undefined = undefined; // Access Token for Zendure Rest API
  public deviceList: ISolarFlowDeviceDetails[] = [];
  public paths: ISolarFlowPaths | undefined = undefined;
  public interval: ioBroker.Interval | undefined = undefined;

  /**
   * Is called when databases are connected and adapter received configuration.
   */
  private async onReady(): Promise<void> {
    // Currently only global Zendure Server are supported!
    this.paths = pathsGlobal;

    // If Username and Password is provided, try to login and get the access token.
    if (this.config.userName && this.config.password) {
      login(this)
        ?.then((_accessToken: string) => {
          this.accessToken = _accessToken;

          this.connected = true;

          // Try to get the device list
          getDeviceList(this)
            .then((result: ISolarFlowDeviceDetails[]) => {
              if (result) {
                // Device List found. Save in the adapter properties and connect to MQTT
                this.deviceList = result;
                connectMqttClient(this);
                startCheckStatesTimer(this);
              }
            })
            .catch(() => {
              this.connected = false;
              this.log?.error("Retrieving device failed!");
            });
        })
        .catch((error) => {
          this.connected = false;
          this.log.error(
            "Logon error at Zendure cloud service! Error: " + error.toString(),
          );
        });
    } else {
      this.connected = false;
      this.log.error("No Login Information provided!");
      //this.stop?.();
    }
  }

  /**
   * Is called when adapter shuts down - callback has to be called under any circumstances!
   */
  private onUnload(callback: () => void): void {
    try {
      if (this.interval) {
        this.clearInterval(this.interval);
      }
      callback();
    } catch (e) {
      callback();
    }
  }

  /**
   * Is called if a subscribed state changes
   */
  private onStateChange(
    id: string,
    state: ioBroker.State | null | undefined,
  ): void {
    if (state && !state.ack) {
      // The state was changed
      this.log.debug(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
      if (
        id.includes("setOutputLimit") &&
        state.val != undefined &&
        state.val != null
      ) {
        const splitted = id.split(".");
        const productKey = splitted[2];
        const deviceKey = splitted[3];
        setOutputLimit(this, productKey, deviceKey, Number(state.val));
      }
      else if (
        id.includes("dischargeLimit") &&
        state.val != undefined &&
        state.val != null
      ) {
        const splitted = id.split(".");
        const productKey = splitted[2];
        const deviceKey = splitted[3];
        setDischargeLimit(this, productKey, deviceKey, Number(state.val));
      }
      else if (
        id.includes("chargeLimit") &&
        state.val != undefined &&
        state.val != null
      ) {
        const splitted = id.split(".");
        const productKey = splitted[2];
        const deviceKey = splitted[3];
        setChargeLimit(this, productKey, deviceKey, Number(state.val));
      }
    } else {
      // The state was deleted
      this.log.debug(`state ${id} deleted`);
    }
  }
}

if (require.main !== module) {
  // Export the constructor in compact mode
  module.exports = (options: Partial<utils.AdapterOptions> | undefined) =>
    new ZendureSolarflow(options);
} else {
  // otherwise start the instance directly
  (() => new ZendureSolarflow())();
}
