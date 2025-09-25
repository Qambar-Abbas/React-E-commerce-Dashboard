import React from 'react'
import Card from './Card'

export default function TopProducts({ products = [] }) {
  return (
    <Card>
      <h4 style={{
        margin: '0 0 16px 0',
        fontSize: 16,
        fontWeight: 600,
        color: '#1e293b'
      }}>
        Top Products
      </h4>
      <div style={{ display: 'grid', gap: 12 }}>
        {products.slice(0, 6).map((p, index) => (
          <div
            key={p.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 12,
              background: index < 3 ? '#f0f9ff' : 'transparent',
              borderRadius: 8,
              border: index < 3 ? '1px solid #e0f2fe' : '1px solid transparent',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f1f5f9'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = index < 3 ? '#f0f9ff' : 'transparent'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {index < 3 && (
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: index === 0 ? '#fef3c7' :
                    index === 1 ? '#e0e7ff' :
                      '#d1fae5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  color: index === 0 ? '#92400e' :
                    index === 1 ? '#3730a3' :
                      '#065f46'
                }}>
                  {index + 1}
                </div>
              )}
              <div>
                <div style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: '#1e293b'
                }}>
                  {p.name}
                </div>
                <div style={{
                  fontSize: 12,
                  color: '#64748b',
                  marginTop: 2
                }}>
                  {p.category}
                </div>
              </div>
            </div>
            <div style={{
              fontWeight: 700,
              color: '#059669',
              fontSize: 14
            }}>
              ${p.price}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}