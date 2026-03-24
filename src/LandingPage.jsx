import AmbientBackground from './components/AmbientBackground';
import DemoStrip from './components/DemoStrip';
import PremiumNavbar from './components/PremiumNavbar';
import SidebarRail from './components/SidebarRail';
import VideoGallery from './components/VideoGallery';
import {
  demoHighlights,
  galleryCards,
  navLinks,
  navStatusText,
  sidebarItems,
} from './data/landingContent';

export default function LandingPage() {
  return (
    <div className="page-shell">
      <AmbientBackground />
      <PremiumNavbar links={navLinks} statusText={navStatusText} />

      <main className="page-content page-content--with-sidebar">
        <SidebarRail items={sidebarItems} />

        <div className="main-column">
          <DemoStrip items={demoHighlights} />
          <VideoGallery cards={galleryCards} />
        </div>
      </main>
    </div>
  );
}
