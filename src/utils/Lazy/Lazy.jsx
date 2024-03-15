import { lazy, Suspense } from "react";
import Loading from "./components/Loading/Loading";

const Lazy = (importFunc) => {
  const LazyComponent = lazy(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(importFunc());
      }, 10);
    });
  });

  return () => (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
};

export default Lazy;
