import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { frenchTranslations } from "./fr";

const LanguageContext = createContext(null);
const STORAGE_KEY = "autobroll-landing-language";
const TRANSLATABLE_ATTRIBUTES = ["aria-label", "placeholder", "title", "alt"];

function initialLanguage() {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "fr") return saved;
  } catch { /* Private browsing can restrict storage. */ }
  const preferred = window.navigator.languages?.[0] || window.navigator.language || "en";
  return preferred.toLowerCase().startsWith("fr") ? "fr" : "en";
}

function cleanKey(source) {
  return source.replace(/\s+/g, " ").trim();
}

function translateText(value) {
  const key = cleanKey(value);
  if (!key) return value;
  const translation = frenchTranslations[key];
  if (translation === undefined) return value;
  const left = value.match(/^\s*/)?.[0] || "";
  const right = value.match(/\s*$/)?.[0] || "";
  return left + translation + right;
}

/**
 * Localize marketing copy without altering the existing JSX structure or design.
 * Original EN text is retained per text node/attribute so switching both ways is exact.
 * A MutationObserver also handles dynamically mounted dialogs and React-driven errors.
 */
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(initialLanguage);
  const originals = useRef(new WeakMap());
  const attributeOriginals = useRef(new WeakMap());
  const locale = useMemo(() => ({ language, setLanguage }), [language]);
  const englishHead = useRef(null);

  useLayoutEffect(() => {
    document.documentElement.lang = language;
    try { window.localStorage.setItem(STORAGE_KEY, language); } catch { /* Best effort. */ }

    const localizeNode = (node) => {
      if (node.nodeType !== Node.TEXT_NODE || !node.parentElement) return;
      const tag = node.parentElement.tagName;
      if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT" || node.parentElement.closest("[data-no-translate]")) return;
      let source = originals.current.get(node);
      if (source === undefined) {
        source = node.nodeValue;
        originals.current.set(node, source);
      } else if (node.nodeValue !== source && node.nodeValue !== translateText(source)) {
        // A React component has replaced this text after an interaction.
        source = node.nodeValue;
        originals.current.set(node, source);
      }
      const desired = language === "fr" ? translateText(source) : source;
      if (node.nodeValue !== desired) node.nodeValue = desired;
    };

    const localizeElement = (element) => {
      if (element.matches?.("[data-no-translate]") || element.closest?.("[data-no-translate]")) return;
      let map = attributeOriginals.current.get(element);
      if (!map) {
        map = new Map();
        attributeOriginals.current.set(element, map);
      }
      for (const attribute of TRANSLATABLE_ATTRIBUTES) {
        if (!element.hasAttribute(attribute)) continue;
        const current = element.getAttribute(attribute);
        let source = map.get(attribute);
        if (source === undefined || (current !== source && current !== translateText(source))) {
          source = current;
          map.set(attribute, source);
        }
        const desired = language === "fr" ? translateText(source) : source;
        if (current !== desired) element.setAttribute(attribute, desired);
      }
    };

    const walk = (root) => {
      if (!root) return;
      if (root.nodeType === Node.TEXT_NODE) { localizeNode(root); return; }
      if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
      if (root.nodeType === Node.ELEMENT_NODE) localizeElement(root);
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        if (node.nodeType === Node.TEXT_NODE) localizeNode(node);
        else localizeElement(node);
      }
    };

    const observer = new MutationObserver((mutations) => {
      // Don't observe our own writes: disconnect while applying translations.
      observer.disconnect();
      for (const mutation of mutations) {
        if (mutation.type === "characterData") walk(mutation.target);
        else if (mutation.type === "attributes") walk(mutation.target);
        else for (const node of mutation.addedNodes) walk(node);
      }
      observer.observe(document.documentElement, {
        subtree: true, childList: true, characterData: true,
        attributes: true, attributeFilter: TRANSLATABLE_ATTRIBUTES,
      });
    });

    walk(document.documentElement);
    observer.observe(document.documentElement, {
      subtree: true, childList: true, characterData: true,
      attributes: true, attributeFilter: TRANSLATABLE_ATTRIBUTES,
    });
    return () => observer.disconnect();
  }, [language]);

  // Preserve each route's English metadata and update it when language changes.
  // URL canonical/OG URLs remain untouched; localized SEO routes are a separate task.
  useEffect(() => {
    if (!englishHead.current) {
      englishHead.current = {
        title: document.title,
        meta: [...document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"], meta[property="og:title"], meta[name="twitter:title"]')]
          .map((element) => ({ element, text: element.getAttribute("content") })),
      };
    }
    const head = englishHead.current;
    document.title = language === "fr" ? (frenchTranslations[head.title] || head.title) : head.title;
    head.meta.forEach(({ element, text }) => {
      element.setAttribute("content", language === "fr" ? (frenchTranslations[text] || text) : text);
    });
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", language === "fr" ? "fr_FR" : "en_US");
  }, [language]);

  return <LanguageContext.Provider value={locale}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
