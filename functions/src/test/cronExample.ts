import { firebaseFunctions } from "../firebase";

export const exampleOfCronJob = firebaseFunctions.pubsub
  .schedule("every 10 minutes")
  .onRun(async () => {
    console.log("This action is happening 1 time per 10 min");
  });
