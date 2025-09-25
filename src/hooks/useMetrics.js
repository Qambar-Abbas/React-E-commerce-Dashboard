import { useEffect, useState } from 'react'
import { Api } from '../services/api'

export default function useMetrics(rangeDays = 30) {
  const [metrics, setMetrics] = useState({ loading: true });
  useEffect(() => {
    let mounted = true;
    setMetrics({ loading: true });
    Api.fetchMetrics({ rangeDays }).then(m => mounted && setMetrics({ loading: false, ...m }));
    return () => mounted = false;
  }, [rangeDays]);
  return metrics;
}
