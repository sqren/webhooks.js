import { EventState } from "../index.d";

export function removeListener(
  state: EventState,
  webhookNameOrNames: string | string[],
  handler: Function
) {
  if (Array.isArray(webhookNameOrNames)) {
    webhookNameOrNames.forEach((webhookName) =>
      removeListener(state, webhookName, handler)
    );
    return;
  }

  if (!state.hooks[webhookNameOrNames]) {
    return;
  }

  // remove last hook that has been added, that way
  // it behaves the same as removeListener
  for (let i = state.hooks[webhookNameOrNames].length - 1; i >= 0; i--) {
    if (state.hooks[webhookNameOrNames][i] === handler) {
      state.hooks[webhookNameOrNames].splice(i, 1);
      return;
    }
  }
}