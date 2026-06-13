// Renders a JSON-LD <script> for structured data. Server component — safe to
// drop into any page. Keep the object schema.org-valid (validator.schema.org).
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
