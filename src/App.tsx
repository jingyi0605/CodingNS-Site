import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import {
  siteCopy,
  type FeatureIconName,
  type HighlightSection,
  type Locale,
  type MediaSlot,
  type SiteHero
} from "./content";
import claudeCodeIcon from "./assets/provider-icons/claude-code.png";
import codexIcon from "./assets/provider-icons/codex.png";
import geminiIcon from "./assets/provider-icons/gemini.png";
import kimiIcon from "./assets/provider-icons/kimi.png";
import openCodeIcon from "./assets/provider-icons/opencode.png";

type ThemeMode = "light" | "dark";

const HERO_DEVICE_COUNT = 5;
const HERO_ROTATE_INTERVAL_MS = 4000;
const PLATFORM_ROTATE_INTERVAL_MS = 3600;

const STORAGE_KEYS = {
  locale: "codingns-site-locale",
  theme: "codingns-site-theme"
} as const;

type ProviderFlowItem = {
  id: string;
  name: string;
  icon: string;
  tone: string;
  muted?: boolean;
  variant: "card" | "chip";
  left: string;
  top: string;
  rotate: string;
  scale: string;
};

type ProviderFlowToken = {
  id: string;
  icon: string;
  tone: string;
  sourceLeft: string;
  sourceTop: string;
  sourceRotate: string;
  sourceScale: string;
  chaosLeftA: string;
  chaosTopA: string;
  chaosRotateA: string;
  chaosLeftB: string;
  chaosTopB: string;
  chaosRotateB: string;
  pocketLeft: string;
  pocketTop: string;
  queueLeft: string;
  queueTop: string;
  queueDrift: string;
  exitLeft: string;
  delay: string;
};

type ProviderQueueToken = {
  id: string;
  icon: string;
  tone: string;
  delay: string;
};

const PROVIDER_FLOW_ITEMS: ProviderFlowItem[] = [
  {
    id: "opencode-card",
    name: "OpenCode",
    icon: openCodeIcon,
    tone: "#202020",
    variant: "card",
    left: "0%",
    top: "24%",
    rotate: "-8deg",
    scale: "0.96"
  },
  {
    id: "gemini-card",
    name: "Gemini",
    icon: geminiIcon,
    tone: "#8f9dff",
    variant: "card",
    left: "32%",
    top: "18%",
    rotate: "8deg",
    scale: "0.92"
  },
  {
    id: "claude-card",
    name: "Claude Code",
    icon: claudeCodeIcon,
    tone: "#e48a63",
    variant: "card",
    left: "22%",
    top: "48%",
    rotate: "9deg",
    scale: "0.9"
  },
  {
    id: "codex-card",
    name: "Codex",
    icon: codexIcon,
    tone: "#2f8cff",
    variant: "card",
    left: "45%",
    top: "52%",
    rotate: "-7deg",
    scale: "0.88"
  },
  {
    id: "kimi-card",
    name: "Kimi",
    icon: kimiIcon,
    tone: "#6d6d72",
    variant: "card",
    left: "6%",
    top: "70%",
    rotate: "-10deg",
    scale: "0.84"
  },
  {
    id: "claude-chip",
    name: "Claude Code",
    icon: claudeCodeIcon,
    tone: "#e48a63",
    variant: "chip",
    left: "14%",
    top: "8%",
    rotate: "-6deg",
    scale: "1"
  },
  {
    id: "codex-chip",
    name: "Codex",
    icon: codexIcon,
    tone: "#2f8cff",
    variant: "chip",
    left: "54%",
    top: "12%",
    rotate: "6deg",
    scale: "0.98"
  },
  {
    id: "gemini-chip",
    name: "Gemini",
    icon: geminiIcon,
    tone: "#8f9dff",
    variant: "chip",
    left: "60%",
    top: "34%",
    rotate: "-8deg",
    scale: "0.94"
  },
  {
    id: "opencode-chip",
    name: "OpenCode",
    icon: openCodeIcon,
    tone: "#202020",
    variant: "chip",
    left: "58%",
    top: "74%",
    rotate: "7deg",
    scale: "0.96"
  },
  {
    id: "kimi-chip",
    name: "Kimi",
    icon: kimiIcon,
    tone: "#6d6d72",
    variant: "chip",
    left: "30%",
    top: "82%",
    rotate: "-10deg",
    scale: "0.92"
  }
];

const PROVIDER_FLOW_TOKENS: ProviderFlowToken[] = [
  {
    id: "token-codex-a",
    icon: codexIcon,
    tone: "#2f8cff",
    sourceLeft: "11%",
    sourceTop: "20%",
    sourceRotate: "-12deg",
    sourceScale: "1.02",
    chaosLeftA: "25%",
    chaosTopA: "12%",
    chaosRotateA: "10deg",
    chaosLeftB: "39%",
    chaosTopB: "28%",
    chaosRotateB: "-8deg",
    pocketLeft: "48%",
    pocketTop: "38%",
    queueLeft: "68%",
    queueTop: "39%",
    queueDrift: "6%",
    exitLeft: "124%",
    delay: "-0.2s"
  },
  {
    id: "token-claude-a",
    icon: claudeCodeIcon,
    tone: "#e48a63",
    sourceLeft: "23%",
    sourceTop: "13%",
    sourceRotate: "9deg",
    sourceScale: "0.98",
    chaosLeftA: "16%",
    chaosTopA: "32%",
    chaosRotateA: "-14deg",
    chaosLeftB: "40%",
    chaosTopB: "21%",
    chaosRotateB: "9deg",
    pocketLeft: "48%",
    pocketTop: "38%",
    queueLeft: "75%",
    queueTop: "39%",
    queueDrift: "6%",
    exitLeft: "124%",
    delay: "-1.1s"
  },
  {
    id: "token-open-a",
    icon: openCodeIcon,
    tone: "#202020",
    sourceLeft: "12%",
    sourceTop: "50%",
    sourceRotate: "-8deg",
    sourceScale: "1.04",
    chaosLeftA: "29%",
    chaosTopA: "58%",
    chaosRotateA: "13deg",
    chaosLeftB: "43%",
    chaosTopB: "34%",
    chaosRotateB: "-6deg",
    pocketLeft: "48%",
    pocketTop: "38%",
    queueLeft: "82%",
    queueTop: "39%",
    queueDrift: "6%",
    exitLeft: "124%",
    delay: "-2.1s"
  },
  {
    id: "token-gemini-a",
    icon: geminiIcon,
    tone: "#8f9dff",
    sourceLeft: "27%",
    sourceTop: "44%",
    sourceRotate: "13deg",
    sourceScale: "0.94",
    chaosLeftA: "19%",
    chaosTopA: "26%",
    chaosRotateA: "-12deg",
    chaosLeftB: "42%",
    chaosTopB: "42%",
    chaosRotateB: "6deg",
    pocketLeft: "48%",
    pocketTop: "38%",
    queueLeft: "89%",
    queueTop: "39%",
    queueDrift: "6%",
    exitLeft: "124%",
    delay: "-3.1s"
  },
  {
    id: "token-kimi-a",
    icon: kimiIcon,
    tone: "#6d6d72",
    sourceLeft: "18%",
    sourceTop: "74%",
    sourceRotate: "-11deg",
    sourceScale: "0.96",
    chaosLeftA: "32%",
    chaosTopA: "68%",
    chaosRotateA: "9deg",
    chaosLeftB: "44%",
    chaosTopB: "54%",
    chaosRotateB: "-7deg",
    pocketLeft: "48%",
    pocketTop: "38%",
    queueLeft: "96%",
    queueTop: "39%",
    queueDrift: "6%",
    exitLeft: "124%",
    delay: "-4.1s"
  },
  {
    id: "token-codex-b",
    icon: codexIcon,
    tone: "#2f8cff",
    sourceLeft: "26%",
    sourceTop: "68%",
    sourceRotate: "10deg",
    sourceScale: "0.9",
    chaosLeftA: "15%",
    chaosTopA: "54%",
    chaosRotateA: "-11deg",
    chaosLeftB: "38%",
    chaosTopB: "62%",
    chaosRotateB: "7deg",
    pocketLeft: "48%",
    pocketTop: "61%",
    queueLeft: "71%",
    queueTop: "39%",
    queueDrift: "6%",
    exitLeft: "124%",
    delay: "-0.7s"
  },
  {
    id: "token-claude-b",
    icon: claudeCodeIcon,
    tone: "#e48a63",
    sourceLeft: "36%",
    sourceTop: "72%",
    sourceRotate: "-9deg",
    sourceScale: "0.92",
    chaosLeftA: "27%",
    chaosTopA: "48%",
    chaosRotateA: "12deg",
    chaosLeftB: "44%",
    chaosTopB: "62%",
    chaosRotateB: "-8deg",
    pocketLeft: "48%",
    pocketTop: "61%",
    queueLeft: "78%",
    queueTop: "39%",
    queueDrift: "6%",
    exitLeft: "124%",
    delay: "-1.6s"
  },
  {
    id: "token-open-b",
    icon: openCodeIcon,
    tone: "#202020",
    sourceLeft: "18%",
    sourceTop: "84%",
    sourceRotate: "-15deg",
    sourceScale: "0.86",
    chaosLeftA: "31%",
    chaosTopA: "78%",
    chaosRotateA: "15deg",
    chaosLeftB: "42%",
    chaosTopB: "70%",
    chaosRotateB: "-6deg",
    pocketLeft: "48%",
    pocketTop: "61%",
    queueLeft: "85%",
    queueTop: "39%",
    queueDrift: "6%",
    exitLeft: "124%",
    delay: "-2.6s"
  },
  {
    id: "token-gemini-b",
    icon: geminiIcon,
    tone: "#8f9dff",
    sourceLeft: "11%",
    sourceTop: "78%",
    sourceRotate: "12deg",
    sourceScale: "0.88",
    chaosLeftA: "26%",
    chaosTopA: "84%",
    chaosRotateA: "-10deg",
    chaosLeftB: "43%",
    chaosTopB: "66%",
    chaosRotateB: "9deg",
    pocketLeft: "48%",
    pocketTop: "61%",
    queueLeft: "92%",
    queueTop: "39%",
    queueDrift: "6%",
    exitLeft: "124%",
    delay: "-3.5s"
  },
  {
    id: "token-kimi-b",
    icon: kimiIcon,
    tone: "#6d6d72",
    sourceLeft: "32%",
    sourceTop: "58%",
    sourceRotate: "7deg",
    sourceScale: "0.9",
    chaosLeftA: "18%",
    chaosTopA: "70%",
    chaosRotateA: "-13deg",
    chaosLeftB: "45%",
    chaosTopB: "50%",
    chaosRotateB: "6deg",
    pocketLeft: "48%",
    pocketTop: "61%",
    queueLeft: "99%",
    queueTop: "39%",
    queueDrift: "6%",
    exitLeft: "124%",
    delay: "-4.4s"
  }
];

const PROVIDER_QUEUE_TOKENS: ProviderQueueToken[] = [
  {
    id: "queue-claude",
    icon: claudeCodeIcon,
    tone: "#e48a63",
    delay: "0s"
  },
  {
    id: "queue-open",
    icon: openCodeIcon,
    tone: "#202020",
    delay: "-2.4s"
  },
  {
    id: "queue-codex",
    icon: codexIcon,
    tone: "#2f8cff",
    delay: "-4.8s"
  },
  {
    id: "queue-gemini",
    icon: geminiIcon,
    tone: "#8f9dff",
    delay: "-7.2s"
  },
  {
    id: "queue-kimi",
    icon: kimiIcon,
    tone: "#6d6d72",
    delay: "-9.6s"
  }
];

function resolveDefaultLocale(): Locale {
  if (typeof window === "undefined") {
    return "zh-CN";
  }

  const stored = window.localStorage.getItem(STORAGE_KEYS.locale);
  if (stored === "zh-CN" || stored === "en-US") {
    return stored;
  }

  return window.navigator.language.toLowerCase().startsWith("en") ? "en-US" : "zh-CN";
}

function resolveDefaultTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem(STORAGE_KEYS.theme);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function useAssetAvailable(assetPath: string) {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let active = true;
    const image = new Image();

    image.onload = () => {
      if (active) {
        setAvailable(true);
      }
    };

    image.onerror = () => {
      if (active) {
        setAvailable(false);
      }
    };

    image.src = assetPath;

    return () => {
      active = false;
    };
  }, [assetPath]);

  return available;
}

function usePageVisibility() {
  const [pageVisible, setPageVisible] = useState(() =>
    typeof document === "undefined" ? true : !document.hidden
  );

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const handleVisibilityChange = () => {
      setPageVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return pageVisible;
}

function useSectionActivity<T extends HTMLElement>(threshold = 0.35, pageVisible = true) {
  const ref = useRef<T | null>(null);
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    if (typeof window === "undefined" || typeof window.IntersectionObserver === "undefined") {
      setIntersecting(true);
      return;
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting && entry.intersectionRatio >= threshold);
      },
      {
        threshold: [0, threshold, 0.65, 1],
        rootMargin: "-8% 0px -8% 0px"
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, intersecting && pageVisible] as const;
}

export function App() {
  const [locale, setLocale] = useState<Locale>(() => resolveDefaultLocale());
  const [theme, setTheme] = useState<ThemeMode>(() => resolveDefaultTheme());
  const [frontDeviceIndex, setFrontDeviceIndex] = useState(0);
  const [platformMediaIndex, setPlatformMediaIndex] = useState(0);
  const pageVisible = usePageVisibility();
  const [heroSectionRef, heroSectionActive] = useSectionActivity<HTMLElement>(0.42, pageVisible);
  const [visualsSectionRef, visualsSectionActive] = useSectionActivity<HTMLElement>(0.28, pageVisible);
  const [platformsSectionRef, platformsSectionActive] = useSectionActivity<HTMLElement>(0.22, pageVisible);
  const [remoteAccessSectionRef, remoteAccessSectionActive] = useSectionActivity<HTMLElement>(0.26, pageVisible);

  const copy = useMemo(() => siteCopy[locale], [locale]);
  const alternateLocale = locale === "zh-CN" ? "en-US" : "zh-CN";
  const currentPlatformMedia = copy.platforms.media[platformMediaIndex] ?? copy.platforms.media[0];
  const platformsImageAvailable = useAssetAvailable(currentPlatformMedia.assetPath);
  const providersImageAvailable = useAssetAvailable(copy.providers.media.assetPath);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = locale;
    document.title = copy.metaTitle;

    const descriptionElement = document.querySelector('meta[name="description"]');
    if (descriptionElement) {
      descriptionElement.setAttribute("content", copy.metaDescription);
    }

    const themeColorElement = document.querySelector('meta[name="theme-color"]');
    if (themeColorElement) {
      themeColorElement.setAttribute("content", theme === "dark" ? "#06070b" : "#f5f6fb");
    }
  }, [copy.metaDescription, copy.metaTitle, locale, theme]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.locale, locale);
  }, [locale]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  useEffect(() => {
    if (!heroSectionActive) {
      return;
    }

    const timer = window.setInterval(() => {
      setFrontDeviceIndex((current) => (current + 1) % HERO_DEVICE_COUNT);
    }, HERO_ROTATE_INTERVAL_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [heroSectionActive]);

  useEffect(() => {
    setPlatformMediaIndex(0);
  }, [locale]);

  useEffect(() => {
    if (copy.platforms.media.length < 2) {
      return;
    }

    if (!platformsSectionActive) {
      return;
    }

    const timer = window.setInterval(() => {
      setPlatformMediaIndex((current) => (current + 1) % copy.platforms.media.length);
    }, PLATFORM_ROTATE_INTERVAL_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [copy.platforms.media.length, platformsSectionActive]);

  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label={copy.nav.brand}>
          <span className="brand-mark">{copy.nav.brandMark}</span>
          <span className="brand-name">{copy.nav.brand}</span>
        </a>

        <nav className="topnav" aria-label={copy.nav.brand}>
          {copy.nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="topbar-controls">
          <a
            className="icon-switch-button icon-link-button"
            href={copy.nav.githubHref}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <GitHubIcon />
          </a>

          <button
            type="button"
            className="icon-switch-button"
            onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
            aria-label={`${copy.nav.themeLabel} ${theme === "light" ? copy.nav.darkMode : copy.nav.lightMode}`}
            title={`${copy.nav.themeLabel} ${theme === "light" ? copy.nav.darkMode : copy.nav.lightMode}`}
          >
            <ThemeSwitchIcon theme={theme} />
          </button>

          <button
            type="button"
            className="icon-switch-button"
            onClick={() => setLocale(alternateLocale)}
            aria-label={`${copy.nav.languageLabel} ${copy.nav.languageOptions[alternateLocale]}`}
            title={`${copy.nav.languageLabel} ${copy.nav.languageOptions[alternateLocale]}`}
          >
            <LanguageSwitchIcon locale={locale} />
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero section" id="overview" ref={heroSectionRef}>
          <div className="hero-copy">
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <h1>{copy.hero.title}</h1>
            <p className="hero-subtitle">{copy.hero.subtitle}</p>
            <p className="hero-description">{copy.hero.description}</p>

            <div className="hero-actions">
              <a
                className="primary-link"
                href={copy.hero.primaryActionHref}
                target={copy.hero.primaryActionExternal ? "_blank" : undefined}
                rel={copy.hero.primaryActionExternal ? "noreferrer" : undefined}
              >
                {copy.hero.primaryAction}
              </a>
              <a
                className="secondary-link"
                href={copy.hero.secondaryActionHref}
                target={copy.hero.secondaryActionExternal ? "_blank" : undefined}
                rel={copy.hero.secondaryActionExternal ? "noreferrer" : undefined}
              >
                {copy.hero.secondaryAction}
              </a>
            </div>

            <ul className="hero-notes">
              {copy.hero.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>

          <HeroFlowVisual
            copy={copy.hero}
            frontDeviceIndex={frontDeviceIndex}
            onSelectDevice={setFrontDeviceIndex}
            isActive={heroSectionActive}
          />
        </section>

        <section className="section stacked-section" id="visuals" ref={visualsSectionRef}>
          <SectionHeading
            eyebrow={copy.visuals.sectionEyebrow}
            title={copy.visuals.title}
            description={copy.visuals.description}
          />

          <ProviderFlowShowcase active={visualsSectionActive} />

          <div className="visual-story-grid">
            {copy.visuals.slots.map((slot) => (
              <article key={slot.key} className="visual-story-card">
                <h3>{slot.title}</h3>
                <p>{slot.description}</p>
                <div className="chip-row">
                  {slot.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section stacked-section">
          <SectionHeading
            eyebrow={copy.highlights.sectionEyebrow}
            title={copy.highlights.title}
            description={copy.highlights.description}
          />
          <WorkspaceHighlightShowcase highlight={copy.highlights} />
        </section>

        <section className="section stacked-section" id="platforms" ref={platformsSectionRef}>
          <SectionHeading
            eyebrow={copy.platforms.sectionEyebrow}
            title={copy.platforms.title}
            description={copy.platforms.description}
          />

          <div className="platforms-showcase">
            <article className="platforms-media">
              <div className="platforms-media-stage">
                <div className="media-frame">
                  {platformsImageAvailable ? (
                    <img
                      key={currentPlatformMedia.assetPath}
                      className="media-image feature-rotating-image"
                      src={currentPlatformMedia.assetPath}
                      alt={currentPlatformMedia.alt}
                    />
                  ) : (
                    <div className="visual-placeholder" aria-label={currentPlatformMedia.alt}>
                      <div className="visual-placeholder-screen" />
                      <div className="visual-placeholder-copy">
                        <span>{currentPlatformMedia.placeholderLabel}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="feature-media-switcher" aria-label={locale === "zh-CN" ? "图片切换器" : "Image switcher"}>
                {copy.platforms.media.map((item, index) => (
                  <button
                    key={item.assetPath}
                    type="button"
                    className={`feature-switcher-dot${index === platformMediaIndex ? " is-active" : ""}`}
                    onClick={() => setPlatformMediaIndex(index)}
                    aria-label={
                      locale === "zh-CN"
                        ? `切换到第 ${index + 1} 张图片`
                        : `Switch to image ${index + 1}`
                    }
                    aria-pressed={index === platformMediaIndex}
                  >
                    <span />
                  </button>
                ))}
              </div>
            </article>

            <div className="platforms-points" aria-label={copy.platforms.sectionEyebrow}>
              {copy.platforms.points.map((point, index) => (
                <article key={point} className="platform-point">
                  <span className="platform-point-index">{index + 1}</span>
                  <p>{point}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section stacked-section" id="providers">
          <div className="providers-layout">
            <div className="providers-copy">
              <SectionHeading
                eyebrow={copy.providers.sectionEyebrow}
                title={copy.providers.title}
                description={copy.providers.description}
              />

              <div className="provider-grid">
                {copy.providers.cards.map((card) => (
                  <article key={card.name} className="provider-card">
                    <div className="provider-name">{card.name}</div>
                    <p>{card.summary}</p>
                  </article>
                ))}
              </div>
            </div>

            <article className="provider-showcase">
              <div className="provider-media-stage">
                <div className="media-frame">
                  {providersImageAvailable ? (
                    <img
                      className="media-image"
                      src={copy.providers.media.assetPath}
                      alt={copy.providers.media.alt}
                    />
                  ) : (
                    <div className="visual-placeholder" aria-label={copy.providers.media.alt}>
                      <div className="visual-placeholder-screen" />
                      <div className="visual-placeholder-copy">
                        <span>{copy.providers.media.placeholderLabel}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section stacked-section" id="remote-access" ref={remoteAccessSectionRef}>
          <div className="providers-layout providers-layout-remote">
            <RemoteAccessShowcase visual={copy.remoteAccess.visual} active={remoteAccessSectionActive} />

            <div className="providers-copy providers-copy-remote">
              <SectionHeading
                eyebrow={copy.remoteAccess.sectionEyebrow}
                title={copy.remoteAccess.title}
                description={copy.remoteAccess.description}
              />

              <div className="provider-grid">
                {copy.remoteAccess.cards.map((card) => (
                  <article key={card.name} className="provider-card">
                    <div className="provider-name">{card.name}</div>
                    <p>{card.summary}</p>
                  </article>
                ))}
              </div>

              <div className="remote-access-copy-actions">
                <a
                  className="secondary-link"
                  href={copy.remoteAccess.detailActionHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.remoteAccess.detailAction}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section cta-section" id="more-features">
          <div className="stacked-section">
            <SectionHeading
              eyebrow={copy.moreFeatures.sectionEyebrow}
              title={copy.moreFeatures.title}
              description={copy.moreFeatures.description}
            />

            <div className="more-feature-grid">
              {copy.moreFeatures.cards.map((card) => (
                <article key={card.name} className="more-feature-card">
                  <div className="more-feature-icon" aria-hidden="true">
                    <FeatureIcon icon={card.icon} />
                  </div>
                  <h3>{card.name}</h3>
                  <p>{card.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <p>{copy.footer.summary}</p>
          <span>{copy.footer.copyright}</span>
        </div>
        <div className="footer-contact" id="contact">
          <strong>{copy.footer.contactTitle}</strong>
          <div className="footer-contact-row">
            <span>{copy.footer.contactLabel}</span>
            <b>{copy.footer.contactValue}</b>
          </div>
        </div>
      </footer>
    </div>
  );
}

type ThemeSwitchIconProps = {
  theme: ThemeMode;
};

function ThemeSwitchIcon({ theme }: ThemeSwitchIconProps) {
  if (theme === "light") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M15.5 4.5a7.5 7.5 0 1 0 4 13.8 8.5 8.5 0 1 1-4-13.8Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.8v2.4M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2 5.5 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

type FeatureIconProps = {
  icon: FeatureIconName;
};

function FeatureIcon({ icon }: FeatureIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {renderFeatureIconGlyph(icon)}
    </svg>
  );
}

function renderFeatureIconGlyph(icon: FeatureIconName) {
  switch (icon) {
    case "quick-phrase":
      return (
        <>
          <path d="M5 7.5a2.5 2.5 0 0 1 2.5-2.5h9A2.5 2.5 0 0 1 19 7.5v6A2.5 2.5 0 0 1 16.5 16H11l-3.5 3v-3H7.5A2.5 2.5 0 0 1 5 13.5Z" />
          <path d="M9 9.5h6" />
          <path d="M9 12.5h4" />
        </>
      );
    case "file-preview":
      return (
        <>
          <path d="M8 4.5h6l4 4v10A1.5 1.5 0 0 1 16.5 20h-9A1.5 1.5 0 0 1 6 18.5v-12A2 2 0 0 1 8 4.5Z" />
          <path d="M14 4.5v4h4" />
          <path d="M9 13c1.1-1.3 2.2-2 3.3-2 1.1 0 2.1.7 3.2 2" />
          <path d="M9 16h6" />
        </>
      );
    case "debug-launch":
      return (
        <>
          <path d="M12 4v4" />
          <path d="M8.5 6.5h7" />
          <path d="M9 12.5 14.5 16 9 19.5Z" />
          <path d="M5.5 20h13" />
        </>
      );
    case "skill-sync":
      return (
        <>
          <path d="M9 5.5 6.5 8 9 10.5 11.5 8Z" />
          <path d="M15 5.5 12.5 8 15 10.5 17.5 8Z" />
          <path d="M9 13.5 6.5 16 9 18.5 11.5 16Z" />
          <path d="M15 13.5 12.5 16 15 18.5 17.5 16Z" />
          <path d="M11.5 8h1" />
          <path d="M11.5 16h1" />
          <path d="M9 10.5v3" />
          <path d="M15 10.5v3" />
        </>
      );
    case "config-switch":
      return (
        <>
          <path d="M6 8h11" />
          <path d="m14 5 3 3-3 3" />
          <path d="M18 16H7" />
          <path d="m10 13-3 3 3 3" />
        </>
      );
    case "device-management":
      return (
        <>
          <rect x="5" y="6" width="8" height="11" rx="1.8" />
          <path d="M17 10.5h2" />
          <path d="M18 9.5v2" />
          <circle cx="9" cy="14.5" r="0.8" fill="currentColor" stroke="none" />
          <path d="M7.5 19h3" />
        </>
      );
    case "git-history":
      return (
        <>
          <path d="M8.5 6.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />
          <path d="M15.5 12.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />
          <path d="M8.5 11.5v3A3.5 3.5 0 0 0 12 18h1" />
          <path d="M12 7h4.5" />
        </>
      );
    case "host-switch":
      return (
        <>
          <rect x="4.5" y="5.5" width="8" height="6" rx="1.4" />
          <rect x="11.5" y="12.5" width="8" height="6" rx="1.4" />
          <path d="M8.5 14h6" />
          <path d="m12.5 11 2 3-2 3" />
        </>
      );
    case "remote-access":
      return (
        <>
          <path d="M8 16c1.1 1 2.5 1.5 4 1.5 3.3 0 6-2.5 6-5.5s-2.7-5.5-6-5.5c-2.6 0-4.8 1.5-5.7 3.8" />
          <path d="M4.5 18.5 10 13" />
          <path d="M4.5 13v5.5H10" />
        </>
      );
    default:
      return null;
  }
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.8a8.7 8.7 0 0 0-2.75 16.95c.44.08.6-.19.6-.43v-1.5c-2.43.53-2.95-1.03-2.95-1.03-.4-1.01-.97-1.28-.97-1.28-.8-.54.06-.53.06-.53.88.06 1.34.91 1.34.91.78 1.34 2.05.95 2.55.72.08-.57.3-.95.55-1.17-1.94-.22-3.98-.97-3.98-4.34 0-.96.34-1.74.9-2.35-.09-.22-.39-1.11.08-2.31 0 0 .74-.24 2.41.9A8.3 8.3 0 0 1 12 7.96c.74 0 1.49.1 2.19.3 1.67-1.14 2.4-.9 2.4-.9.48 1.2.18 2.09.09 2.31.56.61.9 1.39.9 2.35 0 3.38-2.04 4.12-3.99 4.34.31.27.59.79.59 1.6v2.36c0 .24.16.52.61.43A8.7 8.7 0 0 0 12 3.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

type LanguageSwitchIconProps = {
  locale: Locale;
};

function LanguageSwitchIcon({ locale }: LanguageSwitchIconProps) {
  return (
    <span className="language-switch-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path
          d="M4.5 7.5h15M6.5 4.5h11M12 4.5c2.7 2.7 4.2 5.7 4.5 9-.3 3.3-1.8 6.3-4.5 9-2.7-2.7-4.2-5.7-4.5-9 .3-3.3 1.8-6.3 4.5-9Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="language-switch-glyph">{locale === "zh-CN" ? "文" : "A"}</span>
    </span>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

type MediaSlotCardProps = {
  slot: MediaSlot;
  className?: string;
};

function MediaSlotCard({ slot, className }: MediaSlotCardProps) {
  const isAssetAvailable = useAssetAvailable(slot.assetPath);

  return (
    <article className={className ?? "visual-card"}>
      <div className="media-frame">
        {isAssetAvailable ? (
          <img className="media-image" src={slot.assetPath} alt={slot.alt} />
        ) : (
          <div className="visual-placeholder" aria-label={slot.title}>
            <div className="visual-placeholder-screen" />
            <div className="visual-placeholder-copy">
              <span>{slot.placeholderLabel}</span>
            </div>
          </div>
        )}
      </div>

      <div className="media-meta">
        <h3>{slot.title}</h3>
        <p>{slot.description}</p>
        <div className="chip-row">
          {slot.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

type WorkspaceHighlightShowcaseProps = {
  highlight: HighlightSection;
};

function WorkspaceHighlightShowcase({ highlight }: WorkspaceHighlightShowcaseProps) {
  const stageCards = [highlight.cards[1], highlight.cards[0], highlight.cards[2]].filter(Boolean);

  return (
    <article className="workspace-showcase-panel">
      <div className="workspace-showcase-copy">
        <h3>{highlight.spotlight.title}</h3>
        <p>{highlight.spotlight.description}</p>
        <div className="chip-row">
          {highlight.spotlight.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="workspace-showcase-stage" aria-hidden="true">
        {stageCards.map((card) => (
          <article key={card.key} className={`workspace-stage-card workspace-stage-card-${card.key}`}>
            <span className="workspace-stage-card-label">{card.eyebrow}</span>
            <div className="workspace-stage-card-frame">
              <img src={card.assetPath} alt={card.alt} loading="lazy" decoding="async" />
            </div>
          </article>
        ))}
      </div>
    </article>
  );
}

type HeroFlowVisualProps = {
  copy: SiteHero;
  frontDeviceIndex: number;
  onSelectDevice: (index: number) => void;
  isActive: boolean;
};

function HeroFlowVisual({ copy, frontDeviceIndex, onSelectDevice, isActive }: HeroFlowVisualProps) {
  const devices = [
    {
      key: "macbook",
      kind: "macbook" as const,
      label: copy.devices.macbook
    },
    {
      key: "iphone",
      kind: "iphone" as const,
      label: copy.devices.iphone
    },
    {
      key: "android",
      kind: "android" as const,
      label: copy.devices.android
    },
    {
      key: "ipad",
      kind: "ipad" as const,
      label: copy.devices.ipad
    },
    {
      key: "chrome",
      kind: "chrome" as const,
      label: copy.devices.chrome
    }
  ];

  return (
    <div className="hero-flow" aria-label="设备切换展示区" data-active={isActive ? "true" : "false"}>
      <div className="device-showcase-glow device-showcase-glow-left" />
      <div className="device-showcase-glow device-showcase-glow-right" />
      <div className="device-showcase-stage">
        {devices.map((device, index) => (
          <DeviceShowcaseCard
            key={device.key}
            kind={device.kind}
            label={device.label}
            workspace={copy.workspace}
            mobile={copy.mobile}
            isFront={index === frontDeviceIndex}
            slotIndex={(index - frontDeviceIndex + devices.length) % devices.length}
            onSelect={() => onSelectDevice(index)}
          />
        ))}
      </div>
      <div className="flow-session-card">
        <span>{copy.session.badge}</span>
        <strong>{copy.session.title}</strong>
      </div>
    </div>
  );
}

type ProviderFlowShowcaseProps = {
  active: boolean;
};

function ProviderFlowShowcase({ active }: ProviderFlowShowcaseProps) {
  return (
    <article className="provider-flow-panel" data-active={active ? "true" : "false"}>
      <div className="provider-flow-stage" aria-hidden="true">
        <div className="provider-flow-source">
          <div className="provider-source-cloud">
            {PROVIDER_FLOW_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`provider-source-fragment provider-source-fragment-${item.variant}${item.muted ? " is-muted" : ""}`}
                style={
                  {
                    "--provider-tone": item.tone,
                    "--source-item-left": item.left,
                    "--source-item-top": item.top,
                    "--source-item-rotate": item.rotate,
                    "--source-item-scale": item.scale,
                  } as CSSProperties
                }
              >
                <span className="provider-source-fragment-icon">
                  <img src={item.icon} alt="" loading="lazy" decoding="async" />
                </span>
                {item.variant === "card" ? <strong>{item.name}</strong> : null}
              </div>
            ))}
          </div>
        </div>

        <div className="provider-flow-pocket">
          <div className="provider-flow-pocket-mark">
            <span>CodingNS</span>
          </div>
          <div className="provider-flow-pocket-mouth" />
          <div className="provider-flow-pocket-glow" />
        </div>

        <div className="provider-flow-rail">
          <div className="provider-flow-rail-track" />
          <div className="provider-flow-rail-track provider-flow-rail-track-lower" />
        </div>

        {PROVIDER_QUEUE_TOKENS.map((item) => (
          <div
            key={item.id}
            className="provider-flow-queue-token"
            style={
              {
                "--provider-tone": item.tone,
                "--queue-delay": item.delay,
              } as CSSProperties
            }
          >
            <span className="provider-flow-token-icon">
              <img src={item.icon} alt="" loading="lazy" decoding="async" />
            </span>
          </div>
        ))}

        {PROVIDER_FLOW_TOKENS.map((item) => (
          <div
            key={item.id}
            className="provider-flow-token"
            style={
              {
                "--provider-tone": item.tone,
                "--source-left": item.sourceLeft,
                "--source-top": item.sourceTop,
                "--source-rotate": item.sourceRotate,
                "--source-scale": item.sourceScale,
                "--chaos-left-a": item.chaosLeftA,
                "--chaos-top-a": item.chaosTopA,
                "--chaos-rotate-a": item.chaosRotateA,
                "--chaos-left-b": item.chaosLeftB,
                "--chaos-top-b": item.chaosTopB,
                "--chaos-rotate-b": item.chaosRotateB,
                "--pocket-left": item.pocketLeft,
                "--pocket-top": item.pocketTop,
                "--queue-left": item.queueLeft,
                "--queue-top": item.queueTop,
                "--queue-drift": item.queueDrift,
                "--exit-left": item.exitLeft,
                "--token-delay": item.delay,
              } as CSSProperties
            }
          >
            <span className="provider-flow-token-icon">
              <img src={item.icon} alt="" loading="lazy" decoding="async" />
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

type RemoteAccessShowcaseProps = {
  visual: {
    devicesTitle: string;
    relayTitle: string;
    relaySubtitle: string;
    hostTitle: string;
    accessNote: string;
    deviceLabels: {
      laptop: string;
      mobile: string;
      browser: string;
    };
  };
  active: boolean;
};

function RemoteAccessShowcase({ visual, active }: RemoteAccessShowcaseProps) {
  const ingressPackets = active
    ? ["remote-path-laptop", "remote-path-mobile", "remote-path-browser"].flatMap((pathId, groupIndex) =>
        Array.from({ length: 4 }, (_, packetIndex) => (
          <g
            key={`${pathId}-${packetIndex}`}
            className="remote-topology-packet remote-topology-packet-ingress"
            style={{ ["--packet-delay" as string]: `${-(groupIndex * 0.45 + packetIndex * 1.05)}s` } as CSSProperties}
          >
            <circle cx="0" cy="0" r="4.5" />
            <circle cx="0" cy="0" r="10" className="remote-topology-packet-glow" />
            <animateMotion dur="4.2s" begin={`-${groupIndex * 0.45 + packetIndex * 1.05}s`} repeatCount="indefinite">
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </g>
        ))
      )
    : null;

  const hostPackets = active
    ? Array.from({ length: 7 }, (_, packetIndex) => (
        <g
          key={`remote-host-packet-${packetIndex}`}
          className="remote-topology-packet remote-topology-packet-host"
          style={{ ["--packet-delay" as string]: `${-(packetIndex * 0.68)}s` } as CSSProperties}
        >
          <circle cx="0" cy="0" r="4.5" />
          <circle cx="0" cy="0" r="10" className="remote-topology-packet-glow" />
          <animateMotion dur="3.4s" begin={`-${packetIndex * 0.68}s`} repeatCount="indefinite">
            <mpath href="#remote-path-host" />
          </animateMotion>
        </g>
      ))
    : null;

  return (
    <article className="provider-showcase remote-access-showcase">
      <div className="remote-access-stage" data-active={active ? "true" : "false"}>
        <svg className="remote-access-topology" viewBox="0 0 1000 560" aria-hidden="true">
          <defs>
            <linearGradient id="remote-topology-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(82, 145, 255, 0.08)" />
              <stop offset="48%" stopColor="rgba(82, 145, 255, 0.8)" />
              <stop offset="100%" stopColor="rgba(84, 220, 183, 0.12)" />
            </linearGradient>
            <filter id="remote-topology-glow" x="-120%" y="-120%" width="340%" height="340%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path id="remote-path-laptop" className="remote-topology-path" d="M 185 165 C 310 150, 378 175, 470 235" />
          <path id="remote-path-mobile" className="remote-topology-path" d="M 185 278 C 318 278, 384 276, 470 278" />
          <path id="remote-path-browser" className="remote-topology-path" d="M 185 392 C 312 410, 380 360, 470 306" />
          <path id="remote-path-host" className="remote-topology-path remote-topology-path-host" d="M 566 278 C 684 278, 742 278, 828 278" />
          {ingressPackets}
          {hostPackets}
        </svg>

        <div className="remote-access-label remote-access-label-clients">{visual.devicesTitle}</div>
        <div className="remote-access-label remote-access-label-relay">{visual.relayTitle}</div>
        <div className="remote-access-label remote-access-label-host">{visual.hostTitle}</div>

        <div className="remote-access-node remote-access-node-client remote-access-node-laptop">
          <span className="remote-access-node-orb">
            <DeviceGlyph type="laptop" />
          </span>
          <strong>{visual.deviceLabels.laptop}</strong>
        </div>
        <div className="remote-access-node remote-access-node-client remote-access-node-mobile">
          <span className="remote-access-node-orb">
            <DeviceGlyph type="mobile" />
          </span>
          <strong>{visual.deviceLabels.mobile}</strong>
        </div>
        <div className="remote-access-node remote-access-node-client remote-access-node-browser">
          <span className="remote-access-node-orb">
            <DeviceGlyph type="browser" />
          </span>
          <strong>{visual.deviceLabels.browser}</strong>
        </div>

        <div className="remote-access-node remote-access-node-relay">
          <span className="remote-access-node-core remote-access-node-core-relay">Relay</span>
          <strong>{visual.relayTitle}</strong>
          <span>{visual.relaySubtitle}</span>
        </div>

        <div className="remote-access-node remote-access-node-host">
          <span className="remote-access-node-core remote-access-node-core-host">CNS</span>
          <strong>Host</strong>
        </div>

        <div className="remote-access-note">
          <span>{visual.accessNote}</span>
        </div>
      </div>
    </article>
  );
}

type DeviceGlyphProps = {
  type: "laptop" | "mobile" | "browser";
};

function DeviceGlyph({ type }: DeviceGlyphProps) {
  if (type === "laptop") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="6" width="14" height="9" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3.5 17.5h17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "mobile") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="8" y="4.5" width="8" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="16.5" r="0.9" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4.5" y="5.5" width="15" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8.5 19h7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M7.5 9h9" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M7.5 12h5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

type DeviceKind = "macbook" | "iphone" | "android" | "ipad" | "chrome";

type DeviceShowcaseCardProps = {
  kind: DeviceKind;
  label: SiteHero["devices"]["macbook"];
  workspace: SiteHero["workspace"];
  mobile: SiteHero["mobile"];
  isFront: boolean;
  slotIndex: number;
  onSelect: () => void;
};

function DeviceShowcaseCard({
  kind,
  label,
  workspace,
  mobile,
  isFront,
  slotIndex,
  onSelect,
}: DeviceShowcaseCardProps) {
  const slotClass = `showcase-slot-${slotIndex}`;

  return (
    <button
      type="button"
      className={`showcase-device showcase-device-${kind} ${slotClass}`}
      onClick={onSelect}
      aria-label={`${label.name} ${label.caption}`}
      aria-pressed={isFront}
    >
      {kind === "macbook" ? <MacbookShell workspace={workspace} /> : null}
      {kind === "iphone" ? <IPhoneShell mobile={mobile} /> : null}
      {kind === "android" ? <AndroidShell mobile={mobile} /> : null}
      {kind === "ipad" ? <IPadShell workspace={workspace} /> : null}
      {kind === "chrome" ? <ChromeShell workspace={workspace} /> : null}
    </button>
  );
}

type WorkspaceScreenProps = {
  workspace: SiteHero["workspace"];
  variant?: "default" | "compact";
};

function WorkspaceScreen({ workspace, variant = "default" }: WorkspaceScreenProps) {
  const sidebarEntries = workspace.sidebarSections.flatMap((section) =>
    section.items.map((item) => ({ ...item, sectionTitle: section.title }))
  );

  return (
    <div className={`workspace-screen workspace-screen-${variant}`}>
      <div className="workspace-topbar">
        <div className="workspace-window-controls" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="workspace-topbar-title">
          <strong>{workspace.title}</strong>
          <div className="workspace-breadcrumbs">
            {workspace.breadcrumbs.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="workspace-topbar-actions" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="workspace-status">{workspace.statusLabel}</span>
      </div>

      <div className="workspace-body">
        <aside className="workspace-sidebar">
          <div className="workspace-sidebar-nav" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="workspace-sidebar-primary">
            <div className="workspace-sidebar-primary-item is-active">
              <i />
              <span>{workspace.tabs[0]}</span>
            </div>
            <div className="workspace-sidebar-primary-item">
              <i />
              <span>助手</span>
            </div>
            <div className="workspace-sidebar-primary-item">
              <i />
              <span>{workspace.tabs[2]}</span>
            </div>
            <div className="workspace-sidebar-primary-item">
              <i />
              <span>搜索</span>
            </div>
          </div>

          <div className="workspace-sidebar-section-label">
            <span className="workspace-pane-title">{workspace.sidebarTitle}</span>
            <strong>{workspace.windowTitle}</strong>
          </div>

          <div className="workspace-sidebar-list">
            {sidebarEntries.map((item) => (
              <article
                key={`${item.sectionTitle}-${item.label}`}
                className={`workspace-sidebar-item${item.active ? " is-active" : ""}`}
              >
                <div className="workspace-sidebar-copy">
                  <em>{item.sectionTitle}</em>
                  <strong>{item.label}</strong>
                  <span>{item.meta}</span>
                </div>
                <b>{item.active ? "C" : ""}</b>
              </article>
            ))}
          </div>
        </aside>

        <div className="workspace-main">
          <div className="workspace-main-toolbar">
            <div className="workspace-main-header">
              <p className="workspace-kicker">{workspace.messagesTitle}</p>
              <h3>{workspace.title}</h3>
              <p>{workspace.summary}</p>
            </div>
            <div className="workspace-conversation-actions" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="workspace-thread-marquee">
            <div className="workspace-thread-track">
              {[...workspace.messages, ...workspace.messages].map((message, index) => (
                <article
                  key={`${message.title}-${index}`}
                  className={`workspace-stream-row workspace-stream-${message.role}`}
                >
                  {message.role !== "user" ? <span className="workspace-message-avatar">C</span> : null}
                  <div className="workspace-thread-card">
                    <div className="workspace-thread-head">
                      <span className="workspace-thread-tag">{message.tag}</span>
                      <em>{message.meta}</em>
                    </div>
                    <strong>{message.title}</strong>
                    <p>{message.body}</p>
                    {message.role !== "user" && index % 2 === 0 ? (
                      <div className="workspace-inline-tools">
                        {workspace.tabs.map((tab) => (
                          <span key={`${message.title}-${tab}`}>{tab}</span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="workspace-composer">
            <div className="workspace-composer-input">{workspace.previewBody[0]}</div>
            <div className="workspace-composer-bar">
              <div className="workspace-composer-actions">
                <i>+</i>
                {workspace.tabs.map((tab) => (
                  <i key={tab}>{tab}</i>
                ))}
              </div>
              <span className="workspace-send-button" aria-hidden="true" />
            </div>
          </div>
        </div>

        <aside className="workspace-side">
          <div className="workspace-side-tabs">
            <span className="is-active">文件</span>
            <span>GIT</span>
            <span>进程管理</span>
          </div>

          <div className="workspace-panel workspace-file-panel">
            <div className="workspace-panel-head workspace-panel-head-tight">
              <strong>{workspace.filesTitle}</strong>
              <em>{workspace.statusLabel}</em>
            </div>

            <div className="workspace-side-switch">
              <span className="is-active">工作区</span>
              <span>本次会话 0</span>
            </div>

            <div className="workspace-file-toolbar" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>

            <div className="workspace-file-list">
              {workspace.files.map((file) => (
                <div
                  key={file.name}
                  className={`workspace-file-row${file.active ? " is-active" : ""}`}
                >
                  <i />
                  <div className="workspace-file-copy">
                    <strong>{file.name}</strong>
                    <span>{file.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="workspace-panel workspace-preview">
            <strong>{workspace.previewTitle}</strong>
            {workspace.previewBody.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="workspace-panel workspace-side-summary">
            <span>{workspace.taskTitle}</span>
            {workspace.taskRows.map((row) => (
              <div key={row.label} className="workspace-task-row">
                <strong>{row.label}</strong>
                <em>{row.value}</em>
              </div>
            ))}
            <div className="workspace-metrics">
              {workspace.metrics.map((metric) => (
                <div key={metric.label} className="workspace-metric">
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

type MobileScreenProps = {
  mobile: SiteHero["mobile"];
};

function MobileConversationScreen({ mobile }: MobileScreenProps) {
  return (
    <div className="mobile-conversation-screen">
      <div className="mobile-status-bar">
        <span>{mobile.statusTime}</span>
        <div className="mobile-status-icons" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>

      <div className="mobile-conversation-toolbar">
        <span className="mobile-toolbar-button" aria-hidden="true" />
        <div className="mobile-conversation-header">
          <strong>{mobile.title}</strong>
          <span>{mobile.subtitle}</span>
          <p>{mobile.headerNote}</p>
        </div>
        <span className="mobile-toolbar-button mobile-toolbar-button-more" aria-hidden="true" />
      </div>

      <div className="mobile-message-marquee">
        <div className="mobile-message-track">
          {[...mobile.messages, ...mobile.messages].map((message, index) => (
            <div key={`${message.meta}-${index}`}>
              <article className={`mobile-message-row mobile-message-${message.role.toLowerCase()}`}>
                {message.role !== "user" ? <span className="mobile-message-avatar">C</span> : null}
                <div className="mobile-message-content">
                  <div className="mobile-message-meta">
                    <strong>{message.highlight}</strong>
                    <span>{message.meta}</span>
                  </div>
                  <div className="mobile-message-bubble">
                    <p>{message.body}</p>
                  </div>
                </div>
              </article>
              {index % 6 === 1 ? (
                <article className="mobile-reference-card">
                  <div className="mobile-reference-card-head">
                    <strong>{mobile.subtitle}</strong>
                    <span>展开规则</span>
                  </div>
                  <p>{mobile.headerNote}</p>
                  <em>{message.meta}</em>
                </article>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="mobile-composer-panel">
        <p>{mobile.composer}</p>
        <div className="mobile-composer-toolbar">
          <span className="mobile-composer-square" aria-hidden="true" />
          <div className="mobile-composer-actions">
            {mobile.quickActions.map((action, index) => (
              <span key={action} className={index === mobile.quickActions.length - 1 ? "is-send" : ""}>
                {action}
              </span>
            ))}
            <span>6</span>
          </div>
          <span className="mobile-send-button" aria-hidden="true" />
        </div>
      </div>

      <div className="mobile-home-indicator" />
    </div>
  );
}

function MacbookShell({ workspace }: WorkspaceScreenProps) {
  return (
    <div className="macbook-shell">
      <div className="macbook-display">
        <div className="macbook-camera" />
        <div className="macbook-screen">
          <div className="device-screen-scale device-screen-scale-workspace">
            <WorkspaceScreen workspace={workspace} variant="default" />
          </div>
        </div>
      </div>
      <div className="macbook-base">
        <div className="macbook-trackpad" />
      </div>
    </div>
  );
}

function IPhoneShell({ mobile }: MobileScreenProps) {
  return (
    <div className="iphone-shell">
      <div className="iphone-notch" />
      <div className="iphone-screen">
        <div className="device-screen-scale device-screen-scale-mobile">
          <MobileConversationScreen mobile={mobile} />
        </div>
      </div>
    </div>
  );
}

function AndroidShell({ mobile }: MobileScreenProps) {
  return (
    <div className="android-shell">
      <div className="android-frame-highlight" />
      <div className="android-camera-ring">
        <div className="android-camera" />
      </div>
      <div className="android-earpiece" />
      <div className="android-side-button android-side-button-top" />
      <div className="android-side-button android-side-button-bottom" />
      <div className="android-screen-wrap">
        <div className="android-screen">
          <div className="device-screen-scale device-screen-scale-mobile">
            <MobileConversationScreen mobile={mobile} />
          </div>
        </div>
      </div>
      <div className="android-gesture-bar" />
    </div>
  );
}

function IPadShell({ workspace }: WorkspaceScreenProps) {
  return (
    <div className="ipad-shell">
      <div className="ipad-camera" />
      <div className="ipad-screen">
        <div className="device-screen-scale device-screen-scale-workspace device-screen-scale-workspace-compact">
          <WorkspaceScreen workspace={workspace} variant="compact" />
        </div>
      </div>
    </div>
  );
}

function ChromeShell({ workspace }: WorkspaceScreenProps) {
  return (
    <div className="chrome-shell">
      <div className="chrome-topbar">
        <div className="chrome-window-controls" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="chrome-tabbar">
          <div className="chrome-tab chrome-tab-active">
            <span className="chrome-tab-icon" />
            <span>{workspace.windowTitle}</span>
            <i className="chrome-tab-close" />
          </div>
          <div className="chrome-tab chrome-tab-inactive">
            <span className="chrome-tab-icon chrome-tab-icon-muted" />
            <span>{workspace.tabs[1]}</span>
            <i className="chrome-tab-close" />
          </div>
          <span className="chrome-tab-plus" />
        </div>
        <div className="chrome-profile-pill">
          <span className="chrome-avatar" />
        </div>
      </div>
      <div className="chrome-toolbar">
        <div className="chrome-nav">
          <span className="chrome-icon-arrow chrome-icon-left" />
          <span className="chrome-icon-arrow chrome-icon-right" />
          <span className="chrome-icon-refresh" />
        </div>
        <div className="chrome-address">
          <span className="chrome-lock" />
          <span className="chrome-address-text">codingns.app/workspace</span>
          <div className="chrome-address-actions">
            <span />
            <span />
          </div>
        </div>
        <div className="chrome-actions">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="chrome-bookmarks">
        {workspace.breadcrumbs.slice(0, 3).map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="chrome-screen">
        <div className="device-screen-scale device-screen-scale-workspace">
          <WorkspaceScreen workspace={workspace} variant="default" />
        </div>
      </div>
    </div>
  );
}
