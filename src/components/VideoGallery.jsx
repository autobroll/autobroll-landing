import VideoCard from './VideoCard';

export default function VideoGallery({ cards }) {
  return (
    <div className="gallery-section" aria-label="Autobroll showcase gallery">
      <div className="gallery-grid gallery-grid--masonry">
        {cards.map((card, index) => (
          <VideoCard key={card.id} card={card} index={index} />
        ))}
      </div>
    </div>
  );
}
