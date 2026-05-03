function PlaceholderVideo({ title, label }) {
  return (
    <div className="video-placeholder" aria-label={`${title} ${label}`}>
      <div className="video-placeholder__play" />
    </div>
  );
}

function MediaSlot({ videoUrl, imageUrl, title, label }) {
  if (imageUrl) {
    return (
      <img
        className="card-video"
        src={imageUrl}
        alt={`${title} ${label}`}
        loading="lazy"
        decoding="async"
      />
    );
  }

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

function getBeforeImageUrl(card) {
  return card.beforeImageUrl || '';
}

function getAfterImageUrl(card) {
  return card.afterImageUrl || card.imageUrl || '';
}

export default function VideoCard({ card, index }) {
  const ratioClass = card.ratio || 'portrait';
  const beforeUrl = getBeforeUrl(card);
  const afterUrl = getAfterUrl(card);
  const beforeImageUrl = getBeforeImageUrl(card);
  const afterImageUrl = getAfterImageUrl(card);
  const beforeCompareLabel = card.beforeCompareLabel || 'Before';
  const afterCompareLabel = card.afterCompareLabel || 'After';

  return (
    <article
      className={`video-card video-card--${ratioClass}`}
      aria-label={`${card.title} slot ${index + 1}`}
    >
      <div className="compare-grid video-card__compare">
        <div className="compare-column">
          <span className="compare-label">{beforeCompareLabel}</span>
          <div className="video-card__slot video-card__slot--before">
            <MediaSlot
              videoUrl={beforeUrl}
              imageUrl={beforeImageUrl}
              title={card.title}
              label="before"
            />
          </div>
        </div>

        <div className="compare-column">
          <span className="compare-label compare-label--accent">{afterCompareLabel}</span>
          <div className="video-card__slot video-card__slot--after">
            <MediaSlot
              videoUrl={afterUrl}
              imageUrl={afterImageUrl}
              title={card.title}
              label="after"
            />
          </div>
        </div>
      </div>
      <span className="sr-only">{card.title}</span>
    </article>
  );
}
