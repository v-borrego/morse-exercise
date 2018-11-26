import { MorseTransmitter } from "./morse-transmitter";

const message: string = "MasterLemon 5!";

const transmitter: MorseTransmitter = new MorseTransmitter();

transmitter.onCompleted = () => {
  console.log("Transmission completed");
};

transmitter.start(message);
