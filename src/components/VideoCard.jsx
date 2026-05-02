function PlaceholderVideo({ title, label }) {
  return (
    <div className="video-placeholder" aria-label={`${title} ${label}`}>
      <div className="video-placeholder__play" />
    </div>
  );
}

function MediaSlot({ videoUrl, title, label }) {
  if (!videoUrl) return <PlaceholderVideo title={title} label={label} />;

  return (
    <video
      className="card-video"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={`${title} ${label}`}
    >
      <source src={videoUrl} />
    </video>
  );
}

function getBeforeUrl(card) {
  return card.beforeVideoUrl || '';
}

function getAfterUrl(card) {
  return card.afterVideoUrl || card.videoUrl || '';
}

export default function VideoCard({ card, index }) {
  const ratioClass = card.ratio || 'portrait';
  const beforeUrl = getBeforeUrl(card);
  const afterUrl = getAfterUrl(card);
  const beforeCompareLabel = card.beforeCompareLabel || 'Avant';
  const afterCompareLabel = card.afterCompareLabel || 'Après';

  return (
    <article
      className={`video-card video-card--${ratioClass}`}
      aria-label={`${card.title} slot ${index + 1}`}
    >
      <div className="compare-grid video-card__compare">
        <div className="compare-column">
          <span className="compare-label">{beforeCompareLabel}</span>
          <div className="video-card__slot video-card__slot--before">
            <MediaSlot videoUrl={beforeUrl} title={card.title} label="before" />
          </div>
        </div>

        <div className="compare-column">
          <span className="compare-label compare-label--accent">{afterCompareLabel}</span>
          <div className="video-card__slot video-card__slot--after">
            <MediaSlot videoUrl={afterUrl} title={card.title} label="after" />
          </div>
        </div>
      </div>
      <span className="sr-only">{card.title}</span>
    </article>
  );
}
