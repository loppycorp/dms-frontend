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

export function exportStringValues(obj: any, depth = 0) {
  // Base case: If depth is 3, check for string values and return the key-value pairs
  if (depth > 1 && typeof obj === "string") {
    return obj;
  }

  // Recursive case: If the current level is an object, iterate over its properties
  if (typeof obj === "object" && obj !== null) {
    let result: any = {};
    for (let key in obj) {
      const value = obj[key];
      const exported = exportStringValues(value, depth + 1);

      // Add the exported key-value pairs to the result object
      if (typeof exported === "object" && exported !== null) {
        for (let subKey in exported) {
          result[
            subKey == "from" || subKey == "to" ? `${key}.${subKey}` : subKey
          ] = exported[subKey];
        }
      } else if (typeof exported === "string") {
        result[key] = exported;
      }
    }
    return result;
  }

  // Default case: Return null for non-matching cases
  return null;
}
