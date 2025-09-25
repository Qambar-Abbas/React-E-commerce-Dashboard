import React from 'react'
import Card from './Card'

export default function RecentCustomers({ customers = [] }) {
  return (
    <Card>
      <h4 style={{
        margin: '0 0 16px 0',
        fontSize: 16,
        fontWeight: 600,
        color: '#1e293b'
      }}>
        Recent Customers
      </h4>
      <div style={{ display: 'grid', gap: 12 }}>
        {customers.slice(0, 6).map(c => (
          <div
            key={c.id}
            style={{
              padding: 12,
              background: '#f8fafc',
              borderRadius: 8,
              border: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f1f5f9'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f8fafc'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: 14
            }}>
              {c.name.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#1e293b' }}>
                {c.name}
              </div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
                {c.email}
              </div>
            </div>
            <div style={{
              fontSize: 12,
              fontWeight: 600,
              color: '#059669',
              background: '#d1fae5',
              padding: '4px 8px',
              borderRadius: 12
            }}>
              ${c.lifetimeValue}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}