import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type AnyObject = { [key: string]: any };

export function renameKeyInNestedObject<T extends AnyObject>(
  obj: T,
  oldKey: string,
  newKey: string
): T {
  // If it's not an object or is null, return as is.
  if (typeof obj !== "object" || obj === null) return obj;
  // If it's an array, map over its elements recursively.
  if (Array.isArray(obj)) {
    return obj.map((item) =>
      renameKeyInNestedObject(item, oldKey, newKey)
    ) as unknown as T;
  }

  const updatedEntries = Object.entries(obj).map(([key, value]) => {
    // Replace the key if it matches oldKey.
    const updatedKey = key === oldKey ? newKey : key;
    // Recursively process the value.
    return [updatedKey, renameKeyInNestedObject(value, oldKey, newKey)];
  });

  return Object.fromEntries(updatedEntries) as T;
}

export function setNestedValue<T extends object>(
  obj: T,
  path: string,
  value: any
): T {
  const keys = path.split(".");
  // Clone the original object so we don't mutate it.
  const result = { ...obj } as any;
  let current = result;

  keys.forEach((key, i) => {
    if (i === keys.length - 1) {
      // Set the value at the final key
      current[key] = value;
    } else {
      // Clone the nested object if it exists and is an object; otherwise, initialize as an empty object.
      current[key] =
        current[key] && typeof current[key] === "object"
          ? { ...current[key] }
          : {};
      current = current[key];
    }
  });

  return result;
}

export const getAvatarUrl = (temp: string) => {
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${temp}`;
};
