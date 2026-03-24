import VideoCard from './VideoCard';

export default function VideoGallery({ cards }) {
  return (
    <section className="gallery-section" id="showcase" aria-label="Autobroll showcase gallery">
      <div className="gallery-grid gallery-grid--masonry" id="results">
        {cards.map((card, index) => (
          <VideoCard key={card.id} card={card} index={index} />
        ))}
      </div>
    </section>
  );
}
