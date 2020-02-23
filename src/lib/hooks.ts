import { useState, useEffect, Dispatch, SetStateAction } from "react";

import Storage from "lib/StorageAdapter";

export function useCachedState<T>(
  cacheKey: string,
  defaultState: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(Storage.read(defaultState, cacheKey));

  useEffect(() => {
    Storage.persist<T>(state, cacheKey);
  }, [state, cacheKey]);

  return [state, setState];
}
