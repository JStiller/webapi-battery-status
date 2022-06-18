import { safeSomeBattery } from "./battery";

safeSomeBattery(navigator, {
  level: 0.33,
  callback: () => {
    // go to dark mode
  },
});
