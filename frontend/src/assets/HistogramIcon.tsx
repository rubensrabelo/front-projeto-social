export default function HistogramIcon(props : React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <g fill="none">
            <path fill="currentColor" fillRule="evenodd" d="M4 42h40z" clipRule="evenodd"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M4 42h40"></path>
            <path fill="currentColor" stroke="currentColor" strokeLinejoin="round" strokeWidth={4} d="M8 28h6v14H8zm13-10h6v24h-6zM34 6h6v36h-6z"></path>
        </g>
    </svg>
  );
}