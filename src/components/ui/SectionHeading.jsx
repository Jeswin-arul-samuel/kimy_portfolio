export default function SectionHeading({ children }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy mb-4">
        {children}
      </h2>
      <div className="mx-auto w-16 h-0.5 bg-gold" />
    </div>
  )
}
