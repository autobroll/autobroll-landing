import { useEffect, useRef } from "react";
import LuminousLogo from "./LuminousLogo";

// Keep decorative motion local to the viewport; pointer work is limited to one frame.
function useSceneMotion() {
  const ref = useRef(null);

  useEffect(() => {
    const scene = ref.current;
    if (!scene) return undefined;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    let frame = 0;
    let visible = false;

    const sync = () => {
      scene.dataset.moving = String(visible && !document.hidden && !preference.matches);
      if (preference.matches) reset();
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      scene.style.setProperty("--pointer-x", "0px");
      scene.style.setProperty("--pointer-y", "0px");
    };
    const move = (event) => {
      if (preference.matches || !finePointer.matches || frame) return;
      frame = requestAnimationFrame(() => {
        const bounds = scene.getBoundingClientRect();
        scene.style.setProperty("--pointer-x", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 18}px`);
        scene.style.setProperty("--pointer-y", `${((event.clientY - bounds.top) / bounds.height - 0.5) * 18}px`);
        frame = 0;
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.05 });

    observer.observe(scene);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    scene.addEventListener("pointermove", move);
    scene.addEventListener("pointerleave", reset);
    sync();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      scene.removeEventListener("pointermove", move);
      scene.removeEventListener("pointerleave", reset);
    };
  }, []);

  return ref;
}

export function DirectorArt() {
  const ref = useSceneMotion();

  return (
    <div className="director-scene motion-scene" ref={ref} aria-hidden="true">
      <div className="director-scene__aura" />
      <div className="director-scene__coordinates"><span>CONTEXT → INTENTION</span><span>AI DIRECTOR / 01</span></div>
      <div className="director-scene__lens">
        <svg className="director-iris" viewBox="0 0 800 800" fill="none">
          <defs>
            <linearGradient id="director-metal" x1="100" y1="100" x2="680" y2="720" gradientUnits="userSpaceOnUse">
              <stop stopColor="#88602c" /><stop offset=".3" stopColor="#ffe9b7" />
              <stop offset=".55" stopColor="#b38540" /><stop offset=".8" stopColor="#f5d99c" /><stop offset="1" stopColor="#72552e" />
            </linearGradient>
            <radialGradient id="director-glass">
              <stop stopColor="#1a2b43" /><stop offset=".75" stopColor="#0b1424" /><stop offset="1" stopColor="#090e18" />
            </radialGradient>
            <radialGradient id="director-light">
              <stop stopColor="#f5d99c" stopOpacity=".18" /><stop offset="1" stopColor="#e6bd68" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="400" cy="400" r="380" fill="url(#director-light)" />
          <circle cx="400" cy="400" r="363" stroke="#e6bd68" strokeOpacity=".12" />
          <g className="director-iris__orbit">
            <circle cx="400" cy="400" r="340" stroke="url(#director-metal)" strokeWidth="1" strokeDasharray="160 380 90 440" />
            <circle cx="400" cy="60" r="4" fill="#f5d99c" />
            <circle cx="400" cy="740" r="3" fill="#f5d99c" />
          </g>
          <g className="director-iris__ticks">
            {Array.from({ length: 96 }, (_, i) => (
              <path key={i} d={`M400 88v${i % 8 === 0 ? 19 : 7}`} transform={`rotate(${i * 3.75} 400 400)`} stroke={i % 8 === 0 ? "#f5d99c" : "#89744e"} strokeOpacity={i % 8 === 0 ? ".8" : ".4"} />
            ))}
          </g>
          <circle cx="400" cy="400" r="280" fill="url(#director-glass)" stroke="url(#director-metal)" strokeWidth="1.5" />
          <g className="director-iris__petals">
            {Array.from({ length: 12 }, (_, i) => (
              <ellipse key={i} cx="400" cy="327" rx="107" ry="181" transform={`rotate(${i * 30} 400 400)`} stroke="url(#director-metal)" strokeWidth=".8" strokeOpacity=".42" />
            ))}
          </g>
          <circle cx="400" cy="400" r="166" fill="url(#director-glass)" stroke="url(#director-metal)" />
          <circle className="director-iris__inner" cx="400" cy="400" r="151" stroke="#f5d99c" strokeOpacity=".5" strokeDasharray="1 12" strokeWidth="3" />
          <path className="director-iris__eye" d="M286 400Q400 272 514 400Q400 528 286 400Z" stroke="url(#director-metal)" strokeWidth="2" />
          <g className="director-iris__pupil">
            <circle cx="400" cy="400" r="47" fill="#0b1423" stroke="url(#director-metal)" strokeWidth="2" />
            <circle cx="400" cy="400" r="31" stroke="#f5d99c" strokeOpacity=".2" />
            <circle cx="400" cy="400" r="12" fill="#f5d99c" />
            <circle cx="416" cy="383" r="4" fill="#fff8e6" />
          </g>
          <g stroke="#f5d99c" strokeOpacity=".3">
            <path d="M400 18v16M400 766v16M18 400h16M766 400h16" />
          </g>
        </svg>
      </div>
      <div className="director-note director-note--context"><i /><span>Reading the story<strong>Every word. Every moment.</strong></span></div>
      <div className="director-note director-note--rhythm"><span className="mini-wave">{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ "--bar": i, "--height": `${20 + ((i * 17) % 70)}%` }} />)}</span><span>Finding the rhythm<strong>Made to hold attention.</strong></span></div>
      <div className="director-scene__caption"><span>UNDERSTAND</span><i /><span>COMPOSE</span><i /><span>CREATE</span></div>
    </div>
  );
}

const connections = [
  "M500 300C340 300 360 135 190 135",
  "M500 300C660 300 640 135 810 135",
  "M500 300C340 300 360 465 190 465",
  "M500 300C660 300 640 465 810 465",
];

export function WorkflowArt() {
  const ref = useSceneMotion();

  return (
    <div className="orchestra motion-scene" ref={ref} aria-hidden="true">
      <div className="orchestra__halo" />
      <svg className="orchestra__connections" viewBox="0 0 1000 600" preserveAspectRatio="none" fill="none">
        {connections.map((d, i) => <g key={d}><path d={d} stroke="#e6bd68" strokeOpacity=".16" /><path className="orchestra__signal" d={d} pathLength="100" stroke="#f5d99c" strokeWidth="2" strokeDasharray="5 95" style={{ animationDelay: `${i * -1.25}s` }} /></g>)}
      </svg>

      <div className="creative-layer creative-layer--captions">
        <div className="creative-layer__label"><span>01 / CAPTIONS</span><i /></div>
        <div className="caption-composition">Make every<br /><span>word <em>matter.</em></span></div>
        <div className="creative-layer__foot"><span>Word-perfect timing</span><span>Aa</span></div>
      </div>

      <div className="creative-layer creative-layer--visuals">
        <div className="creative-layer__label"><span>02 / B-ROLL</span><i /></div>
        <div className="film-composition"><div /><div /><div /></div>
        <div className="creative-layer__foot"><span>A world for every story</span><span>↗</span></div>
      </div>

      <div className="orchestra__center">
        <div className="orchestra__orbit orchestra__orbit--outer" />
        <div className="orchestra__orbit orchestra__orbit--inner" />
        <div className="orchestra__brand"><LuminousLogo /><span>AUTOBROLL</span></div>
        <span className="orchestra__status"><i /> One creative vision</span>
      </div>

      <div className="creative-layer creative-layer--audio">
        <div className="creative-layer__label"><span>03 / SOUND &amp; SFX</span><i /></div>
        <div className="sound-composition">{Array.from({ length: 36 }, (_, i) => <i key={i} style={{ "--bar": i, "--height": `${18 + ((i * 31 + 13) % 76)}%` }} />)}</div>
        <div className="creative-layer__foot"><span>Feel the rhythm</span><span>♪</span></div>
      </div>

      <div className="creative-layer creative-layer--motion">
        <div className="creative-layer__label"><span>04 / MOTION</span><i /></div>
        <div className="motion-composition"><div className="motion-composition__frame" /><div className="motion-composition__object" /><svg viewBox="0 0 240 100" fill="none"><path d="M12 86C80 86 140 14 228 14" stroke="#e6bd68" strokeWidth="1" strokeDasharray="3 5" /><circle cx="12" cy="86" r="3" fill="#e6bd68" /><circle cx="228" cy="14" r="3" fill="#e6bd68" /></svg></div>
        <div className="creative-layer__foot"><span>Every frame, intentional</span><span>◇</span></div>
      </div>
      <div className="orchestra__footer"><span>Your footage.</span><span>Your direction.</span><strong>Everything in sync.</strong></div>
    </div>
  );
}
