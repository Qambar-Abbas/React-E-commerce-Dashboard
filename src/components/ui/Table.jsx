import React from 'react'

export default function Table({ columns = [], data = [], loading = false }) {
  return (
    <div style={{
      overflowX: 'auto',
      borderRadius: 8,
      border: '1px solid #e2e8f0'
    }}>
      <table className="table" style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 14
      }}>
        <thead>
          <tr style={{ background: '#f8fafc' }}>
            {columns.map(c => (
              <th
                key={c.key}
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: 600,
                  color: '#374151',
                  borderBottom: '1px solid #e2e8f0',
                  fontSize: 13,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} style={{
                padding: 40,
                textAlign: 'center',
                color: '#64748b'
              }}>
                Loading data...
              </td>
            </tr>
          ) : data && data.length ? data.map((r, index) => (
            <tr
              key={r.id}
              style={{
                background: index % 2 === 0 ? 'white' : '#fafafa',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f1f5f9'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = index % 2 === 0 ? 'white' : '#fafafa'
              }}
            >
              {columns.map(c => (
                <td
                  key={c.key}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f1f5f9',
                    color: '#374151'
                  }}
                >
                  {c.key === 'amount' ? `$${r[c.key]}` :
                    c.key === 'status' ? (
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 600,
                        background:
                          r[c.key] === 'paid' ? '#d1fae5' :
                            r[c.key] === 'pending' ? '#fef3c7' :
                              r[c.key] === 'refunded' ? '#fee2e2' : '#e0e7ff',
                        color:
                          r[c.key] === 'paid' ? '#065f46' :
                            r[c.key] === 'pending' ? '#92400e' :
                              r[c.key] === 'refunded' ? '#991b1b' : '#3730a3'
                      }}>
                        {r[c.key]}
                      </span>
                    ) : r[c.key]}
                </td>
              ))}
            </tr>
          )) : (
            <tr>
              <td colSpan={columns.length} style={{
                padding: 40,
                textAlign: 'center',
                color: '#64748b'
              }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}