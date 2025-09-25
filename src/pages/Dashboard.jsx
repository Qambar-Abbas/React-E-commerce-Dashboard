import React, { useMemo, useState } from 'react'
import Header from '../components/ui/Header'
import Sidebar from '../components/ui/Sidebar'
import StatCard from '../components/ui/StatCard'
import ChartCard from '../components/ui/ChartCard'
import Table from '../components/ui/Table'
import TopProducts from '../components/ui/TopProducts'
import RecentCustomers from '../components/ui/RecentCustomers'
import useMetrics from '../hooks/useMetrics'
import useOrders from '../hooks/useOrders'
import useProducts from '../hooks/useProducts'
import useCustomers from '../hooks/useCustomers'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from 'recharts'

function currency(n) { return `$${n.toLocaleString()}` }

export default function Dashboard() {
  const [rangeDays, setRangeDays] = useState(30)
  const [ordersPage, setOrdersPage] = useState(1)
  const [ordersPerPage] = useState(10)
  const [ordersStatus, setOrdersStatus] = useState(null)

  const metrics = useMetrics(rangeDays)
  const orders = useOrders({ page: ordersPage, perPage: ordersPerPage, status: ordersStatus })
  const products = useProducts()
  const customers = useCustomers()

  const kpis = useMemo(() => {
    if (metrics.loading) return []
    return [
      { id: 'revenue', label: 'Total Revenue', value: currency(metrics.totalRevenue), trend: '+12.5%' },
      { id: 'orders', label: 'Total Orders', value: metrics.totalOrders, trend: '+8.2%' },
      { id: 'aov', label: 'Avg Order Value', value: currency(metrics.avgOrderValue), trend: '+4.3%' },
      { id: 'customers', label: 'Returning Customers', value: metrics.returningCustomers, trend: '+15.7%' }
    ]
  }, [metrics])

  const salesSeries = metrics.loading ? [] : metrics.series.map(s => ({ date: s.date, value: s.value }))
  const revenueByCategory = metrics.loading ? [] : Object.entries(metrics.revenueByCategory || {}).map(([k, v]) => ({ name: k, value: v }))

  function exportCsv(rows = [], columns = []) {
    if (!rows.length) return
    const header = columns.map(c => c.label || c.key).join(',')
    const body = rows.map(r => columns.map(c => r[c.key]).join(',')).join('\n')
    const csv = header + '\n' + body
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `export_${new Date().toISOString().slice(0, 10)}.csv`; a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div className="app-container" style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Header title="E-Commerce Dashboard" subtitle="Overview & analytics" />

      <div className="grid cols-12" style={{ marginTop: 24, gap: 24 }}>
        <div className="col-span-12 lg-col-span-3">
          <Sidebar rangeDays={rangeDays} onRangeChange={setRangeDays} ordersStatus={ordersStatus} onStatusChange={setOrdersStatus} />
        </div>

        <div className="col-span-12 lg-col-span-9">
          {/* KPI Cards */}
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {kpis.length ? kpis.map(k => (
              <div key={k.id}>
                <StatCard title={k.label} value={k.value} trend={k.trend} />
              </div>
            )) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>Loading KPIs...</div>
            )}
          </div>

          {/* Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24, marginTop: 24 }}>
            <ChartCard title={`Sales Trend (Last ${rangeDays} Days)`}>
              {metrics.loading ? (
                <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div>Loading chart...</div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={salesSeries} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      formatter={v => currency(Math.round(v))}
                      contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#1d4ed8' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            <ChartCard title="Revenue by Category">
              {metrics.loading ? (
                <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div>Loading chart...</div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={revenueByCategory} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      formatter={v => currency(Math.round(v))}
                      contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </ChartCard>
          </div>

          {/* Orders Table */}
          <div style={{ marginTop: 32 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20
            }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: '#1e293b' }}>Recent Orders</h3>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <select
                  value={ordersStatus || 'all'}
                  onChange={e => setOrdersStatus(e.target.value === 'all' ? null : e.target.value)}
                  className="input"
                  style={{
                    padding: '8px 12px',
                    borderRadius: 6,
                    border: '1px solid #d1d5db',
                    fontSize: 14
                  }}
                >
                  <option value="all">All Orders</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="refunded">Refunded</option>
                  <option value="fulfilled">Fulfilled</option>
                </select>
                <button
                  className="btn"
                  onClick={() => exportCsv(orders.data, [
                    { key: 'id', label: 'Order ID' },
                    { key: 'date', label: 'Date' },
                    { key: 'customerName', label: 'Customer' },
                    { key: 'productName', label: 'Product' },
                    { key: 'qty', label: 'Qty' },
                    { key: 'amount', label: 'Amount' },
                    { key: 'status', label: 'Status' }
                  ])}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    padding: '8px 16px',
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#e2e8f0'}
                  onMouseOut={(e) => e.target.style.background = '#f1f5f9'}
                >
                  Export CSV
                </button>
              </div>
            </div>

            <Table
              loading={orders.loading}
              columns={[
                { key: 'id', label: 'Order ID' },
                { key: 'date', label: 'Date' },
                { key: 'customerName', label: 'Customer' },
                { key: 'productName', label: 'Product' },
                { key: 'qty', label: 'Quantity' },
                { key: 'amount', label: 'Amount' },
                { key: 'status', label: 'Status' }
              ]}
              data={orders.data}
            />

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
              padding: '16px 0'
            }}>
              <div style={{ color: '#64748b', fontSize: 14 }}>
                Showing page {ordersPage} of {Math.ceil(orders.totalCount / ordersPerPage)}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className="btn"
                  onClick={() => setOrdersPage(p => Math.max(1, p - 1))}
                  disabled={ordersPage === 1}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #d1d5db',
                    background: ordersPage === 1 ? '#f3f4f6' : 'white',
                    borderRadius: 6,
                    cursor: ordersPage === 1 ? 'not-allowed' : 'pointer',
                    opacity: ordersPage === 1 ? 0.6 : 1
                  }}
                >
                  Previous
                </button>
                <button
                  className="btn"
                  onClick={() => setOrdersPage(p => p + 1)}
                  disabled={ordersPage >= Math.ceil(orders.totalCount / ordersPerPage)}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #d1d5db',
                    background: ordersPage >= Math.ceil(orders.totalCount / ordersPerPage) ? '#f3f4f6' : 'white',
                    borderRadius: 6,
                    cursor: ordersPage >= Math.ceil(orders.totalCount / ordersPerPage) ? 'not-allowed' : 'pointer',
                    opacity: ordersPage >= Math.ceil(orders.totalCount / ordersPerPage) ? 0.6 : 1
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Products & Customers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginTop: 32 }}>
            <TopProducts products={products.data} />
            <RecentCustomers customers={customers.data} />
          </div>
        </div>
      </div>
    </div>
  )
}