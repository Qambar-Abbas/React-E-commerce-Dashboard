import React from 'react'
import Card from './Card'

export default function ChartCard({ title, children }) {
  return (
    <Card>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottom: '1px solid #f1f5f9'
      }}>
        <div style={{
          fontSize: 16,
          fontWeight: 600,
          color: '#1e293b'
        }}>
          {title}
        </div>
        <div style={{
          fontSize: 12,
          color: '#64748b',
          background: '#f1f5f9',
          padding: '4px 8px',
          borderRadius: 12,
          fontWeight: 500
        }}>
          Live
        </div>
      </div>
      <div style={{ height: 260 }}>{children}</div>
    </Card>
  )
}