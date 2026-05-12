import nexusLabsIcon from '../assets/logos/nexus-labs-icon.png'
import nexusLabsWatermarkText from '../assets/logos/nexus-labs-watermark-text.png'

export default function BrandWatermark() {
  return (
    <div
      aria-hidden="true"
      style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 30 }}
      className="brand-watermark-wrapper"
    >
      <img
        src={nexusLabsIcon}
        alt=""
        loading="lazy"
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          width: '34px',
          height: 'auto',
          objectFit: 'contain',
          opacity: 0.52,
        }}
      />
      <img
        src={nexusLabsWatermarkText}
        alt=""
        loading="lazy"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '172px',
          height: 'auto',
          objectFit: 'contain',
          opacity: 0.52,
        }}
      />
      <style>{`
        @media (max-width: 767px) {
          .brand-watermark-wrapper { display: none !important; }
        }
      `}</style>
    </div>
  )
}
