import { ImageResponse } from 'next/og'

export const alt = 'MalluKey - Malayalam Typing Speed Test'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a', // Deep dark black/gray
          color: '#ffffff',
          fontFamily: '"Geist", "Inter", sans-serif',
        }}
      >
        {/* Outer green border / glow container */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '4px solid #22c55e', // Next.js standard green or their green #22c55e
          borderRadius: '32px',
          padding: '60px',
          boxShadow: '0px 0px 80px rgba(34, 197, 94, 0.2)',
        }}>
          {/* Logo / Icon */}
          <div style={{ display: 'flex', marginBottom: '40px' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 8h.01" />
              <path d="M12 12h.01" />
              <path d="M14 8h.01" />
              <path d="M16 12h.01" />
              <path d="M18 8h.01" />
              <path d="M6 8h.01" />
              <path d="M7 16h10" />
              <path d="M8 12h.01" />
              <rect width="20" height="16" x="2" y="4" rx="2" />
            </svg>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '84px',
              fontWeight: '900',
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '20px',
              display: 'flex',
            }}
          >
            Mallu<span style={{ color: '#22c55e' }}>Key</span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              display: 'flex',
              fontSize: '36px',
              fontWeight: '500',
              color: '#a3a3a3',
              textAlign: 'center',
              maxWidth: '800px',
            }}
          >
            The Ultimate Malayalam Typing Speed Test
          </div>

          {/* Badges */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '50px' }}>
            <div style={{
              display: 'flex',
              padding: '12px 24px',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              border: '2px solid rgba(34, 197, 94, 0.5)',
              borderRadius: '100px',
              color: '#22c55e',
              fontSize: '24px',
              fontWeight: 'bold',
            }}>
              WPM Tracking
            </div>
            <div style={{
              display: 'flex',
              padding: '12px 24px',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              border: '2px solid rgba(34, 197, 94, 0.5)',
              borderRadius: '100px',
              color: '#22c55e',
              fontSize: '24px',
              fontWeight: 'bold',
            }}>
              Top 10 Global Leaderboard
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
