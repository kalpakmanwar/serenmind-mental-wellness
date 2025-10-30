// Decorative Floral Element
export const FloralDecor = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <g transform="translate(50 50)">
      {/* Center circle */}
      <circle cx="0" cy="0" r="4" fill="#F6D7C3" />
      
      {/* Petals */}
      <ellipse cx="0" cy="-15" rx="6" ry="12" fill="#E8D9F2" opacity="0.8" />
      <ellipse cx="15" cy="0" rx="12" ry="6" fill="#E8D9F2" opacity="0.8" />
      <ellipse cx="0" cy="15" rx="6" ry="12" fill="#CFEFE6" opacity="0.8" />
      <ellipse cx="-15" cy="0" rx="12" ry="6" fill="#CFEFE6" opacity="0.8" />
      
      {/* Diagonal petals */}
      <ellipse cx="10" cy="-10" rx="8" ry="10" fill="#F6D7C3" opacity="0.6" transform="rotate(45)" />
      <ellipse cx="10" cy="10" rx="8" ry="10" fill="#F6D7C3" opacity="0.6" transform="rotate(135)" />
      <ellipse cx="-10" cy="10" rx="8" ry="10" fill="#E8D9F2" opacity="0.6" transform="rotate(225)" />
      <ellipse cx="-10" cy="-10" rx="8" ry="10" fill="#CFEFE6" opacity="0.6" transform="rotate(315)" />
    </g>
  </svg>
);

