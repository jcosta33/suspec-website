export function TerminalCursor({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block w-2.5 h-5 bg-suspec-yellow animate-blink ${className}`}
      aria-hidden="true"
    />
  );
}
