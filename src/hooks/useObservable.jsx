import { useEffect } from 'react';

const useObservable = (observable, setter) => {
  useEffect(() => {
    const subscription = observable.subscribe(result => {
      console.log(result);
      setter(result);
    });

    return () => subscription.unsubscribe();
  }, [observable, setter]);
};

export default useObservable;
