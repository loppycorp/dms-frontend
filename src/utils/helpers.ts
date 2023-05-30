export function traverseField(obj: any, keys: string) {
  let currentObj = obj;
  const keysArray = keys.split(".");

  for (let i = 0; i < keysArray.length; i++) {
    const key = keysArray[i].trim();
    if (currentObj?.hasOwnProperty(key)) {
      currentObj = currentObj[key];
    } else {
      currentObj = undefined;
    }
  }

  return currentObj;
}
