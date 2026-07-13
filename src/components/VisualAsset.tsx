type VisualAssetProps = {
  tone: string;
  label?: string;
  image?: string;
};

export function VisualAsset({ tone, label, image }: VisualAssetProps) {
  return (
    <div className={`visual-asset visual-${tone}${image ? " visual-has-image" : ""}`} aria-label={label}>
      {image ? (
        <img className="visual-image" src={image} alt={label ?? ""} loading="lazy" decoding="async" />
      ) : null}
      <div className="visual-grid" />
      <div className="visual-slab visual-slab-one" />
      <div className="visual-slab visual-slab-two" />
      <div className="visual-orbit" />
      <div className="visual-caption">{label}</div>
    </div>
  );
}
