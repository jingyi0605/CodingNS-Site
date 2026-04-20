import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { siteCopy, type Locale, type MediaSlot, type SiteHero } from "./content";
import claudeCodeIcon from "../../user-app/src/assets/provider-icons/claude-code.png";
import codexIcon from "../../user-app/src/assets/provider-icons/codex.png";
import geminiIcon from "../../user-app/src/assets/provider-icons/gemini.png";
import kimiIcon from "../../user-app/src/assets/provider-icons/kimi.png";
import openCodeIcon from "../../user-app/src/assets/provider-icons/opencode.png";

type ThemeMode = "light" | "dark";

const HERO_DEVICE_COUNT = 5;
const HERO_ROTATE_INTERVAL_MS = 4000;

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
    id: "codex",
    name: "Codex",
    icon: codexIcon,
    tone: "#2f8cff",
    variant: "card",
    left: "4%",
    top: "8%",
    rotate: "-10deg",
    scale: "1"
  },
  {
    id: "claude-code",
    name: "Claude Code",
    icon: claudeCodeIcon,
    tone: "#e48a63",
    variant: "card",
    left: "39%",
    top: "4%",
    rotate: "8deg",
    scale: "0.98"
  },
  {
    id: "opencode",
    name: "OpenCode",
    icon: openCodeIcon,
    tone: "#202020",
    variant: "card",
    left: "0%",
    top: "40%",
    rotate: "-7deg",
    scale: "1.02"
  },
  {
    id: "gemini",
    name: "Gemini",
    icon: geminiIcon,
    tone: "#8f9dff",
    muted: true,
    variant: "card",
    left: "42%",
    top: "35%",
    rotate: "13deg",
    scale: "0.94"
  },
  {
    id: "kimi",
    name: "Kimi",
    icon: kimiIcon,
    tone: "#6d6d72",
    muted: true,
    variant: "chip",
    left: "14%",
    top: "76%",
    rotate: "-12deg",
    scale: "0.96"
  },
  {
    id: "codex-chip",
    name: "Codex",
    icon: codexIcon,
    tone: "#2f8cff",
    variant: "chip",
    left: "34%",
    top: "69%",
    rotate: "11deg",
    scale: "0.88"
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

function useSectionActivity<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    if (typeof window === "undefined" || typeof window.IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting && entry.intersectionRatio >= threshold);
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

  return [ref, active] as const;
}

export function App() {
  const [locale, setLocale] = useState<Locale>(() => resolveDefaultLocale());
  const [theme, setTheme] = useState<ThemeMode>(() => resolveDefaultTheme());
  const [frontDeviceIndex, setFrontDeviceIndex] = useState(0);
  const [heroSectionRef, heroSectionActive] = useSectionActivity<HTMLElement>(0.42);
  const [visualsSectionRef, visualsSectionActive] = useSectionActivity<HTMLElement>(0.28);

  const copy = useMemo(() => siteCopy[locale], [locale]);
  const alternateLocale = locale === "zh-CN" ? "en-US" : "zh-CN";

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

  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label={copy.nav.brand}>
          <span className="brand-mark">{copy.nav.brandMark}</span>
          <span className="brand-name">{copy.nav.brand}</span>
        </a>

        <nav className="topnav" aria-label={copy.nav.brand}>
          {copy.nav.items.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="topbar-controls">
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
              <a className="primary-link" href="#visuals">
                {copy.hero.primaryAction}
              </a>
              <a className="secondary-link" href="#providers">
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

          <div className="highlight-list">
            {copy.highlights.items.map((item) => (
              <article key={item.title} className="highlight-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section stacked-section" id="platforms">
          <SectionHeading
            eyebrow={copy.platforms.sectionEyebrow}
            title={copy.platforms.title}
            description={copy.platforms.description}
          />

          <div className="platform-grid">
            {copy.platforms.cards.map((card) => (
              <article key={card.name} className="platform-card">
                <div className="platform-icon">{card.name.slice(0, 1)}</div>
                <h3>{card.name}</h3>
                <p className="platform-description">{card.summary}</p>
                <div className="chip-row">
                  {card.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
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

            <MediaSlotCard slot={copy.providers.media} className="provider-showcase" />
          </div>
        </section>

        <section className="section cta-section">
          <div className="cta-card">
            <SectionHeading
              eyebrow={copy.cta.eyebrow}
              title={copy.cta.title}
              description={copy.cta.description}
            />

            <div className="hero-actions">
              <a className="primary-link" href="#top">
                {copy.cta.primaryAction}
              </a>
              <a className="secondary-link" href="#visuals">
                {copy.cta.secondaryAction}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>{copy.footer.summary}</p>
        <span>{copy.footer.copyright}</span>
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
