import AbortController from "abort-controller";

export const abortControllers: any = new Map<string, AbortController>();

export const controller = new AbortController();

export const abortAPI = (keyName: string) => {
  if (abortControllers.has(keyName)) {
    abortControllers.get(keyName)?.abort();
    abortControllers.delete(keyName);
  }
};

export const setControllerSignal = (keyName: string, controller: any) => {
  return abortControllers.set(keyName, controller);
};
