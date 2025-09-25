import React from 'react'

export default function Header({ title, subtitle }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px 0',
      borderBottom: '1px solid #e2e8f0',
      marginBottom: 8
    }}>
      <div>
        <h1 style={{
          margin: 0,
          fontSize: 28,
          fontWeight: 700,
          color: '#1e293b',
          letterSpacing: '-0.025em'
        }}>
          {title}
        </h1>
        <div style={{
          fontSize: 14,
          color: '#64748b',
          marginTop: 4,
          fontWeight: 500
        }}>
          {subtitle}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{
          fontSize: 14,
          color: '#64748b',
          fontWeight: 500
        }}>
          Admin User
        </div>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          fontSize: 16,
          boxShadow: '0 2px 8px rgba(102, 126, 234, 0.4)'
        }}>
          A
        </div>
      </div>
    </div>
  )
}