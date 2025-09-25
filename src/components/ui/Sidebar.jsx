import React from 'react'
import Card from './Card'

export default function Sidebar({ rangeDays, onRangeChange, ordersStatus, onStatusChange }) {
  return (
    <Card>
      <h4 style={{
        margin: '0 0 20px 0',
        fontSize: 16,
        fontWeight: 600,
        color: '#1e293b'
      }}>
        Filters & Settings
      </h4>
      <div style={{ display: 'grid', gap: 20 }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: 14,
            fontWeight: 500,
            color: '#374151',
            marginBottom: 6
          }}>
            Date Range
          </label>
          <select
            className="input"
            value={rangeDays}
            onChange={e => onRangeChange(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #d1d5db',
              fontSize: 14,
              background: 'white'
            }}
          >
            <option value={7}>Last 7 days</option>
            <option value={14}>Last 14 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>
        <div>
          <label style={{
            display: 'block',
            fontSize: 14,
            fontWeight: 500,
            color: '#374151',
            marginBottom: 6
          }}>
            Order Status
          </label>
          <select
            className="input"
            value={ordersStatus || 'all'}
            onChange={e => onStatusChange(e.target.value === 'all' ? null : e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #d1d5db',
              fontSize: 14,
              background: 'white'
            }}
          >
            <option value="all">All Orders</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="refunded">Refunded</option>
            <option value="fulfilled">Fulfilled</option>
          </select>
        </div>
      </div>
    </Card>
  )
}