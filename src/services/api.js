// Minimal mock API: exports fetchOrders, fetchProducts, fetchCustomers, fetchMetrics

function createMockDataset({ days = 90, products = 30, customers = 120 } = {}) {
  const dates = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    dates.push(d);
  }
  const categories = ['Clothing','Electronics','Home','Toys','Books','Beauty'];
  const productsList = Array.from({ length: products }, (_,i) => ({ id: `P${1000+i}`, name: `Product ${i+1}`, price: Math.floor(10+Math.random()*490), category: categories[i%categories.length], stock: Math.floor(Math.random()*500) }));
  const customersList = Array.from({ length: customers }, (_,i) => ({ id: `C${2000+i}`, name: `Customer ${i+1}`, email: `cust${i+1}@mail.test`, lifetimeValue: Math.floor(20+Math.random()*5000) }));
  const orders = [];
  for (const d of dates) {
    const dailyOrders = Math.floor(5 + Math.random() * 20);
    for (let i=0;i<dailyOrders;i++) {
      const product = productsList[Math.floor(Math.random()*productsList.length)];
      const customer = customersList[Math.floor(Math.random()*customersList.length)];
      const qty = 1 + Math.floor(Math.random()*3);
      const amount = product.price * qty;
      const statuses = ['paid','pending','refunded','fulfilled'];
      orders.push({ id: `O${100000+orders.length}`, date: new Date(d).toISOString(), productId: product.id, productName: product.name, category: product.category, customerId: customer.id, customerName: customer.name, qty, amount, status: statuses[Math.floor(Math.random()*statuses.length)] });
    }
  }
  return { products: productsList, customers: customersList, orders, dates, categories };
}

const MOCK = createMockDataset({ days: 90, products: 30, customers: 120 });

export const Api = {
  fetchOrders: ({ page = 1, perPage = 10, sortBy = 'date', sortDir = 'desc', status } = {}) => new Promise(res => {
    setTimeout(()=>{
      let data = [...MOCK.orders];
      if (status) data = data.filter(o => o.status === status);
      data.sort((a,b)=> sortDir==='desc' ? (a[sortBy] < b[sortBy] ? 1 : -1) : (a[sortBy] > b[sortBy] ? 1 : -1));
      const start = (page-1)*perPage;
      res({ data: data.slice(start, start+perPage), total: data.length })
    }, 200)
  }),
  fetchProducts: () => new Promise(res => setTimeout(()=>res({ data: MOCK.products }), 150)),
  fetchCustomers: () => new Promise(res => setTimeout(()=>res({ data: MOCK.customers }), 150)),
  fetchMetrics: ({ rangeDays = 30 } = {}) => new Promise(res => setTimeout(()=>{
    const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - rangeDays + 1);
    const recent = MOCK.orders.filter(o => new Date(o.date) >= cutoff);
    const totalRevenue = recent.reduce((s,o)=>s+o.amount,0);
    const totalOrders = recent.length;
    const avgOrderValue = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;
    const returningCustomers = new Set(recent.map(o=>o.customerId)).size;
    const byDay = {};
    for (const o of recent) {
      const day = new Date(o.date).toISOString().slice(0,10);
      byDay[day] = (byDay[day]||0)+o.amount;
    }
    const series = Object.entries(byDay).map(([date,value])=>({date,value})).sort((a,b)=>a.date<b.date?-1:1);
    const revenueByCategory = {};
    for (const o of recent) revenueByCategory[o.category] = (revenueByCategory[o.category]||0) + o.amount;
    res({ totalRevenue, totalOrders, avgOrderValue, returningCustomers, series, revenueByCategory });
  }, 250))
}
