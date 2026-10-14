// Marca de Questly: brote dentro de un rombo rúnico. Trazo con currentColor
// para heredar el color del contexto (acento en header, apagado en footers).
export function BrandMark({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2 22 12 12 22 2 12Z" />
      <path d="M12 18v-6" />
      <path d="M12 13.5C8.5 13.5 7.5 11 7.5 8.5 10.5 8.5 12 10 12 13.5Z" />
      <path d="M12 11.5C12 8.5 13.5 7 16.5 7 16.5 9.5 15 11.5 12 11.5Z" />
    </svg>
  )
}
