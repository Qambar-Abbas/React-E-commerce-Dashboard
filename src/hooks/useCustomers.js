import { useEffect, useState } from 'react'
import { Api } from '../services/api'

export default function useCustomers(){
  const [state,setState] = useState({ loading: true, data: [] });
  useEffect(()=>{
    let mounted = true;
    Api.fetchCustomers().then(r=> mounted && setState({ loading:false, data: r.data }));
    return () => mounted = false;
  },[]);
  return state;
}
