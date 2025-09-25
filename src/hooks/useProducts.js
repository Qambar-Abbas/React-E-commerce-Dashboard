import { useEffect, useState } from 'react'
import { Api } from '../services/api'

export default function useProducts(){
  const [state,setState] = useState({ loading: true, data: [] });
  useEffect(()=>{
    let mounted = true;
    Api.fetchProducts().then(r=> mounted && setState({ loading:false, data: r.data }));
    return () => mounted = false;
  },[]);
  return state;
}
