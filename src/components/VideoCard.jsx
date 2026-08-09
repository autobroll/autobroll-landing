import { useEffect, useRef, useState } from "react";

function PlaceholderVideo({ title, label }) {
  return (
    <div className="video-placeholder" aria-label={`${title} ${label}`}>
      <div className="video-placeholder__play" />
    </div>
  );
}

function LazyVideo({ videoUrl, title, label }) {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReduceMotion(mediaQuery.matches);
    syncPreference();
    mediaQuery.addEventListener?.("change", syncPreference);
    return () => mediaQuery.removeEventListener?.("change", syncPreference);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true);
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "320px 0px", threshold: 0.08 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (isVisible && !reduceMotion) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible, reduceMotion, shouldLoad]);

  return (
    <video
      ref={videoRef}
      className="card-video"
      muted
      loop
      playsInline
      preload="none"
      controls={reduceMotion}
      aria-label={`${title} ${label}`}
    >
      {shouldLoad ? <source src={videoUrl} type="video/mp4" /> : null}
    </video>
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

  return <LazyVideo videoUrl={videoUrl} title={title} label={label} />;
}

export default function VideoCard({ card, index }) {
  const ratioClass = card.ratio || "portrait";
  const beforeUrl = card.beforeVideoUrl || "";
  const afterUrl = card.afterVideoUrl || card.videoUrl || "";
  const beforeImageUrl = card.beforeImageUrl || "";
  const afterImageUrl = card.afterImageUrl || card.imageUrl || "";
  const beforeCompareLabel = card.beforeCompareLabel || "Before";
  const afterCompareLabel = card.afterCompareLabel || "After";

  return (
    <article
      className={`video-card video-card--${ratioClass}`}
      aria-labelledby={`showcase-card-${index}`}
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

      <div className="video-card__meta">
        <span className="video-card__category">{card.label}</span>
        <h3 id={`showcase-card-${index}`}>{card.title}</h3>
        <span className="video-card__arrow" aria-hidden="true">↗</span>
      </div>
    </article>
  );
}
