import React from 'react'

export default function Card({ children, style = {} }) {
  return (
    <div
      className="card"
      style={{
        background: 'white',
        borderRadius: 12,
        padding: 20,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        transition: 'box-shadow 0.2s ease-in-out',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      {children}
    </div>
  )
}