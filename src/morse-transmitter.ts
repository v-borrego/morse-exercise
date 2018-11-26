import { mapMessageToLampStateArray, validateInputMessage } from "./mappers";
import { LampState } from "./model";

const TEMPORY_UNIT: number = 100;

export class MorseTransmitter {
  private lampList: LampState[];
  private started: boolean = false;

  public start = (message: string) => {
    if (this.started) {
      console.log("The transmitter is currently broadcasting");
    }

    if (!validateInputMessage(message)) {
      console.log("Invalid format message");
      return;
    }

    this.initializeLampStateArray(message);
    this.nextStep();
  };

  private initializeLampStateArray = (message: string) => {
    this.lampList = mapMessageToLampStateArray(message);
  };

  private nextStep = () => {
    const lamp: LampState = this.lampList.shift();

    if (lamp) {
      this.write(lamp);
      setTimeout(this.nextStep, lamp.time_units * TEMPORY_UNIT);
    } else {
      this.started = false;
      console.log("Finalized transmission");
    }
  };

  private write = (lamp: LampState) => {
    console.log(lamp.state, lamp.time_units * TEMPORY_UNIT + "ms");
  };
}
