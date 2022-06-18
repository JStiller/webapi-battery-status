interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

interface BatteryOptions {
  level: number;
  callback: Function;
}

export const safeSomeBattery = (
  navigator: Navigator,
  options: BatteryOptions
) => {
  let safeMode = false;

  if ("getBattery" in navigator === false) return;

  navigator.getBattery().then((battery: BatteryManager) => {
    if (safeMode === true) return;

    if (battery.charging === true) return;

    if (battery.level >= options.level) return;

    options.callback && options.callback();

    battery.addEventListener("levelchange", () => {
      if (battery.level >= options.level) return;

      options.callback && options.callback();
    });
  });
};
