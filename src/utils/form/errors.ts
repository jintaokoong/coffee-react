import { Intent } from '@blueprintjs/core';

export const getIntentFromError = (formikError: string | undefined) => {
  if (formikError === undefined) {
    return Intent.NONE;
  }

  return Intent.DANGER;
}
