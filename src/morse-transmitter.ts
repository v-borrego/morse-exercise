import { mapMessageToLampStateArray } from "./mappers";
import { validateInputMessage } from "./business";
import { LampState } from "./model";

const TEMPORY_UNIT: number = 300;

export class MorseTransmitter {
  private lampList: LampState[];

  public start = (message: string) => {
    if (this.lampList && this.lampList.length > 0) {
      console.log("The transmitter is currently broadcasting");
      return;
    } else if (!validateInputMessage(message)) {
      console.log("Invalid format message");
      return;
    }

    this.initializeLampStateArray(message);
    this.nextStep();
  };

  public onCompleted = () => {};

  private initializeLampStateArray = (message: string) => {
    this.lampList = mapMessageToLampStateArray(message);
  };

  private nextStep = () => {
    const lamp: LampState = this.lampList.shift();

    if (lamp) {
      this.write(lamp);
      setTimeout(this.nextStep, lamp.time_units * TEMPORY_UNIT);
    } else {
      this.onCompleted();
    }
  };

  private write = (lamp: LampState) => {
    console.log(lamp.state);
  };
}
