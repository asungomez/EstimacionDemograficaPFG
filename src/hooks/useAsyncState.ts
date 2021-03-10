import { useCallback, useState } from 'react';

import useIsMounted from './useIsMounted';

interface AsyncStateArray<T>
  extends Array<T | React.Dispatch<React.SetStateAction<T>>> {
  0: T;
  1: React.Dispatch<React.SetStateAction<T>>;
}
/**
 * Use this hook instead of useState when the state might be updated by
 * an async task, such as an AJAX request, a timeout or an interval
 */
function useAsyncState<S>(initialState?: S | (() => S)): AsyncStateArray<S> {
  const isMounted = useIsMounted();
  const [value, setRawValue] = useState(initialState);
  const setValue = useCallback(
    newValue => {
      if (isMounted()) {
        setRawValue(newValue);
      }
    },
    [isMounted]
  );
  return [value, setValue];
}

export default useAsyncState;
