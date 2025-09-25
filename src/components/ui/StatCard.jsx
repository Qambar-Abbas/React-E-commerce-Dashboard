import React from 'react'
import Card from './Card'

export default function StatCard({ title, value, trend }) {
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{
            fontSize: 14,
            color: '#64748b',
            fontWeight: 500,
            marginBottom: 8
          }}>
            {title}
          </div>
          <div style={{
            fontSize: 24,
            fontWeight: 700,
            color: '#1e293b',
            letterSpacing: '-0.025em'
          }}>
            {value}
          </div>
          {trend && (
            <div style={{
              fontSize: 12,
              color: '#10b981',
              fontWeight: 600,
              marginTop: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}>
              <span>↑</span>
              {trend}
            </div>
          )}
        </div>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          color: 'white'
        }}>
          📈
        </div>
      </div>
    </Card>
  )
}