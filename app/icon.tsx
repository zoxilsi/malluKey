import { ImageResponse } from 'next/og'

export const contentType = 'image/png'
export const size = { width: 32, height: 32 }

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#B3F023',
          borderRadius: '50%',
          border: '2px solid #171717',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#171717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 6m0 2a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2z" />
          <path d="M6 10l0 .01" />
          <path d="M10 10l0 .01" />
          <path d="M14 10l0 .01" />
          <path d="M18 10l0 .01" />
          <path d="M6 14l0 .01" />
          <path d="M18 14l0 .01" />
          <path d="M10 14l4 0" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
