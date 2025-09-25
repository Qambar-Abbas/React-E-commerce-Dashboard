import { useEffect, useState } from 'react'
import { Api } from '../services/api'

export default function useOrders({ page = 1, perPage = 10, status } = {}) {
  const [state, setState] = useState({ loading: true, data: [], total: 0 });
  useEffect(()=>{
    let mounted = true;
    setState(s => ({ ...s, loading: true }));
    Api.fetchOrders({ page, perPage, status }).then(r => mounted && setState({ loading: false, ...r }));
    return () => mounted = false;
  }, [page, perPage, status]);
  return state;
}
