function pollConditionAsync (isConditionMet, intervalMs, maxRetries) {
  return new Promise(resolve => {
    let remaining = maxRetries;

    const interval = setInterval(() => {
      const conditionMet = isConditionMet();

      if (conditionMet) {
        clearInterval(interval);
        resolve(true);
      } else {
        remaining--;

        if (remaining === 0) {
          clearInterval(interval);
          resolve(false);
        }
      }
    }, intervalMs);
  });
}

export default pollConditionAsync;
