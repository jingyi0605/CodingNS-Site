export type Locale = "zh-CN" | "en-US";

type NavigationItem = {
  label: string;
  href: string;
};

export type MediaSlot = {
  key: string;
  eyebrow: string;
  title: string;
  description: string;
  assetPath: string;
  alt: string;
  tags: string[];
  placeholderLabel: string;
};

type HighlightItem = {
  title: string;
  description: string;
};

type PlatformCard = {
  name: string;
  summary: string;
  tags: string[];
};

type ProviderCard = {
  name: string;
  summary: string;
};

type DeviceLabel = {
  name: string;
  caption: string;
};

type ScreenMetric = {
  value: string;
  label: string;
};

type WorkspaceSidebarItem = {
  label: string;
  meta: string;
  active?: boolean;
};

type WorkspaceSidebarSection = {
  title: string;
  items: WorkspaceSidebarItem[];
};

type WorkspaceMessage = {
  role: "assistant" | "user" | "system";
  title: string;
  body: string;
  meta: string;
  tag: string;
};

type WorkspaceTask = {
  label: string;
  value: string;
};

type WorkspaceFile = {
  name: string;
  detail: string;
  active?: boolean;
};

type WorkspaceScreenContent = {
  windowTitle: string;
  statusLabel: string;
  title: string;
  summary: string;
  tabs: string[];
  breadcrumbs: string[];
  sidebarTitle: string;
  sidebarSections: WorkspaceSidebarSection[];
  messagesTitle: string;
  messages: WorkspaceMessage[];
  filesTitle: string;
  files: WorkspaceFile[];
  previewTitle: string;
  previewBody: string[];
  taskTitle: string;
  taskRows: WorkspaceTask[];
  metrics: ScreenMetric[];
};

type MobileMessage = {
  role: "assistant" | "user";
  body: string;
  meta: string;
  highlight: string;
};

type MobileScreenContent = {
  title: string;
  subtitle: string;
  headerNote: string;
  statusTime: string;
  messages: MobileMessage[];
  composer: string;
  quickActions: string[];
};

export type SiteHero = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  notes: string[];
  devices: {
    macbook: DeviceLabel;
    iphone: DeviceLabel;
    android: DeviceLabel;
    ipad: DeviceLabel;
    chrome: DeviceLabel;
  };
  session: {
    badge: string;
    title: string;
    detail: string;
  };
  workspace: WorkspaceScreenContent;
  mobile: MobileScreenContent;
};

type SiteCopy = {
  metaTitle: string;
  metaDescription: string;
  nav: {
    brand: string;
    brandMark: string;
    items: NavigationItem[];
    themeLabel: string;
    lightMode: string;
    darkMode: string;
    languageLabel: string;
    languageOptions: Record<Locale, string>;
  };
  hero: SiteHero;
  visuals: {
    sectionEyebrow: string;
    title: string;
    description: string;
    slots: MediaSlot[];
  };
  highlights: {
    sectionEyebrow: string;
    title: string;
    description: string;
    items: HighlightItem[];
  };
  platforms: {
    sectionEyebrow: string;
    title: string;
    description: string;
    cards: PlatformCard[];
  };
  providers: {
    sectionEyebrow: string;
    title: string;
    description: string;
    cards: ProviderCard[];
    media: MediaSlot;
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
  };
  footer: {
    summary: string;
    copyright: string;
  };
};

export const siteCopy: Record<Locale, SiteCopy> = {
  "zh-CN": {
    metaTitle: "CodingNS | 你的 CLI 会话，出现在每一块屏幕上",
    metaDescription: "CodingNS 让同一段会话在桌面、移动端和网页端之间继续流转，并兼容多种 CLI 工具。",
    nav: {
      brand: "CodingNS",
      brandMark: "CNS",
      items: [
        { label: "概览", href: "#overview" },
        { label: "画面", href: "#visuals" },
        { label: "平台", href: "#platforms" },
        { label: "兼容", href: "#providers" }
      ],
      themeLabel: "显示模式",
      lightMode: "日间",
      darkMode: "夜间",
      languageLabel: "语言",
      languageOptions: {
        "zh-CN": "中文",
        "en-US": "English"
      }
    },
    hero: {
      eyebrow: "CodingNS",
      title: "你的 CLI 会话，出现在每一块屏幕上",
      subtitle: "从任意设备开始，到任意设备上继续。",
      description: "同一段工作，在不同设备上自然接续。",
      primaryAction: "查看产品画面",
      secondaryAction: "查看兼容能力",
      notes: ["多端连续", "AI 接力", "CLI 兼容"],
      devices: {
        macbook: { name: "MacBook", caption: "完整工作区" },
        iphone: { name: "iPhone", caption: "随时接住进度" },
        android: { name: "Android", caption: "移动端同样接续" },
        ipad: { name: "iPad", caption: "更轻的并排查看" },
        chrome: { name: "Chrome", caption: "打开就能继续" }
      },
      session: {
        badge: "进行中的会话",
        title: "继续生成中",
        detail: "上下文、状态、进度保持连续"
      },
      workspace: {
        windowTitle: "CodingNS Workspace",
        statusLabel: "实时同步",
        title: "同一段工作区",
        summary: "桌面、网页和平板只换外壳，不换上下文。",
        tabs: ["会话", "文件", "任务"],
        breadcrumbs: ["产品工作区", "多端继续", "官网演示"],
        sidebarTitle: "最近继续",
        sidebarSections: [
          {
            title: "最近会话",
            items: [
              { label: "官网主视觉改版", meta: "刚刚同步", active: true },
              { label: "移动端继续回复", meta: "2 分钟前" },
              { label: "CLI 兼容概览", meta: "今天" }
            ]
          },
          {
            title: "常用助手",
            items: [
              { label: "产品介绍整理", meta: "随时继续" },
              { label: "多端排版建议", meta: "保持同步" },
              { label: "发布前检查", meta: "待查看" }
            ]
          },
          {
            title: "工作区",
            items: [
              { label: "首页画面", meta: "已打开" },
              { label: "产品截图", meta: "等待补充" },
              { label: "兼容能力", meta: "持续更新" }
            ]
          }
        ],
        messagesTitle: "正在继续的会话",
        messages: [
          {
            role: "user",
            title: "我从电脑切到手机，还能接着这段工作吗？",
            body: "希望最近消息、当前文件和任务进度都一起带过去。",
            meta: "09:41",
            tag: "多端接续"
          },
          {
            role: "assistant",
            title: "可以，当前工作区会原样延续。",
            body: "桌面端整理的内容、最近会话和右侧文件预览会一起保持同步。",
            meta: "09:42",
            tag: "状态保持"
          },
          {
            role: "assistant",
            title: "网页端打开后也会回到同一段上下文。",
            body: "无需重新解释背景，继续查看文件、对话和进度即可。",
            meta: "09:43",
            tag: "网页继续"
          },
          {
            role: "user",
            title: "如果换成另一套 CLI，也能接住吗？",
            body: "我想保留已有习惯，只希望入口更统一。",
            meta: "09:44",
            tag: "CLI 兼容"
          },
          {
            role: "assistant",
            title: "支持把常用 CLI 放进同一条体验里。",
            body: "会话来源不同，但查看、续接和切换的方式保持一致。",
            meta: "09:45",
            tag: "统一体验"
          },
          {
            role: "assistant",
            title: "离开桌面时，手机上只保留更适合回复的界面。",
            body: "长内容留在桌面，多端之间只换视图，不换上下文。",
            meta: "09:46",
            tag: "移动端视图"
          }
        ],
        filesTitle: "当前文件",
        files: [
          { name: "品牌首页.fig", detail: "主视觉布局", active: true },
          { name: "产品截图 / Desktop.png", detail: "桌面工作区" },
          { name: "产品截图 / Mobile.png", detail: "移动端聊天" },
          { name: "兼容能力.md", detail: "CLI 入口说明" },
          { name: "发布清单", detail: "官网交付" }
        ],
        previewTitle: "预览摘要",
        previewBody: [
          "左侧保留最近会话与工作区入口。",
          "中间持续展示正在进行的对话和 AI 回应。",
          "右侧同步文件预览、进度与关键状态。"
        ],
        taskTitle: "当前亮点",
        taskRows: [
          { label: "多平台同步", value: "已接续" },
          { label: "移动端回复", value: "随时继续" },
          { label: "网页端打开", value: "即开即用" },
          { label: "CLI 兼容", value: "持续扩展" }
        ],
        metrics: [
          { value: "5 端", label: "同场展示" },
          { value: "同一条", label: "会话上下文" },
          { value: "实时", label: "状态保持" }
        ]
      },
      mobile: {
        title: "继续中的会话",
        subtitle: "移动端会保留当前上下文",
        headerNote: "离开桌面后，最近消息、重点进展和待办仍然跟着走。",
        statusTime: "9:54",
        messages: [
          {
            role: "assistant",
            body: "这段会话已经带到手机上，刚才整理的重点和最近进展都还在。",
            meta: "刚刚",
            highlight: "会话续接"
          },
          {
            role: "user",
            body: "我现在只想快速看一下进度，顺手回一条消息。",
            meta: "刚刚",
            highlight: "移动端继续"
          },
          {
            role: "assistant",
            body: "可以，手机端会优先显示聊天视图，适合查看摘要、继续提问和接住下一步。",
            meta: "1 分钟前",
            highlight: "轻量视图"
          },
          {
            role: "user",
            body: "如果我晚点在浏览器打开，还能回到同一段工作吗？",
            meta: "1 分钟前",
            highlight: "网页继续"
          },
          {
            role: "user",
            body: "我还想让常用 CLI 的会话也留在同一个入口里。",
            meta: "2 分钟前",
            highlight: "统一入口"
          },
          {
            role: "assistant",
            body: "可以，桌面、网页和移动端会共用同一段会话，不需要重复说明背景。",
            meta: "2 分钟前",
            highlight: "统一上下文"
          },
          {
            role: "assistant",
            body: "常用 CLI 的会话也能在这里继续查看，入口更统一，切换更少。",
            meta: "3 分钟前",
            highlight: "CLI 兼容"
          }
        ],
        composer: "继续问、继续看、继续把这段工作推下去。",
        quickActions: ["看进度", "继续回复", "发送"]
      }
    },
    visuals: {
      sectionEyebrow: "产品画面",
      title: "先看产品，再看介绍。",
      description: "下面这些位置留给真实截图。页面会自动替换，不需要再改代码。",
      slots: [
        {
          key: "desktop-shot",
          eyebrow: "Desktop",
          title: "桌面端截图",
          description: "建议放最完整的一张工作区画面。",
          assetPath: "/site-images/hero-desktop.png",
          alt: "CodingNS 桌面端截图",
          tags: ["宽图", "工作区", "主画面"],
          placeholderLabel: "桌面端画面"
        },
        {
          key: "mobile-shot",
          eyebrow: "Mobile",
          title: "移动端截图",
          description: "建议放对话续接或任务查看画面。",
          assetPath: "/site-images/hero-mobile.png",
          alt: "CodingNS 移动端截图",
          tags: ["竖图", "继续对话", "任务接力"],
          placeholderLabel: "移动端画面"
        },
        {
          key: "web-shot",
          eyebrow: "Web",
          title: "网页端截图",
          description: "建议放跨设备继续工作的画面。",
          assetPath: "/site-images/hero-web.png",
          alt: "CodingNS 网页端截图",
          tags: ["浏览器", "跨设备", "继续工作"],
          placeholderLabel: "网页端画面"
        }
      ]
    },
    highlights: {
      sectionEyebrow: "重点",
      title: "真正需要先讲清楚的，只有三件事。",
      description: "不用写成长广告。把重点说清，用户自然会继续往下看。",
      items: [
        { title: "会话连续", description: "同一段工作在不同设备之间自然接续。" },
        { title: "AI 接力", description: "正在进行的任务不会因为离开桌面就停住。" },
        { title: "更少切换", description: "文件、对话和状态尽量留在同一条线上。" }
      ]
    },
    platforms: {
      sectionEyebrow: "平台",
      title: "三个入口，一套状态。",
      description: "该完整时完整，该轻一点时轻一点，但看到的还是同一段工作。",
      cards: [
        { name: "桌面端", summary: "适合完整工作区和长时间操作。", tags: ["多窗口", "文件", "终端"] },
        { name: "移动端", summary: "适合看进度、回一句话、接住任务。", tags: ["iPhone", "Android", "继续对话"] },
        { name: "网页端", summary: "适合临时打开、快速进入、马上继续。", tags: ["浏览器", "跨设备", "即开即用"] }
      ]
    },
    providers: {
      sectionEyebrow: "兼容",
      title: "把常用 CLI 放进同一套体验里。",
      description: "不是让你换工具，是让你少一次切换。",
      cards: [
        { name: "Codex", summary: "继续现有工作方式。" },
        { name: "Claude Code", summary: "把进行中的任务带到更多屏幕。" },
        { name: "OpenCode", summary: "把不同来源的会话收拢到一起。" },
        { name: "更多 CLI", summary: "兼容能力继续扩展。" }
      ],
      media: {
        key: "providers-shot",
        eyebrow: "Compatibility",
        title: "CLI 兼容画面",
        description: "建议放统一会话视图或多 CLI 兼容相关截图。",
        assetPath: "/site-images/providers.png",
        alt: "CodingNS CLI 兼容截图",
        tags: ["横图", "兼容", "统一视图"],
        placeholderLabel: "CLI 兼容画面"
      }
    },
    cta: {
      eyebrow: "继续往下做",
      title: "把真实截图放进来，这个首页就完整了。",
      description: "结构已经够了。下一步别再补空话，直接补图。",
      primaryAction: "回到顶部",
      secondaryAction: "查看产品画面"
    },
    footer: {
      summary: "让你的 CLI 会话出现在每一块屏幕上。",
      copyright: "© 2026 CodingNS"
    }
  },
  "en-US": {
    metaTitle: "CodingNS | Your CLI Session, On Every Screen",
    metaDescription: "CodingNS keeps the same session moving across desktop, mobile, and web, with broad CLI compatibility.",
    nav: {
      brand: "CodingNS",
      brandMark: "CNS",
      items: [
        { label: "Overview", href: "#overview" },
        { label: "Visuals", href: "#visuals" },
        { label: "Platforms", href: "#platforms" },
        { label: "Compatibility", href: "#providers" }
      ],
      themeLabel: "Appearance",
      lightMode: "Light",
      darkMode: "Dark",
      languageLabel: "Language",
      languageOptions: {
        "zh-CN": "中文",
        "en-US": "English"
      }
    },
    hero: {
      eyebrow: "CodingNS",
      title: "Your CLI session, on every screen.",
      subtitle: "Start on any device. Continue on any other screen.",
      description: "The same work carries across devices without breaking.",
      primaryAction: "See product visuals",
      secondaryAction: "See compatibility",
      notes: ["Cross-device", "AI relay", "CLI support"],
      devices: {
        macbook: { name: "MacBook", caption: "Full workspace" },
        iphone: { name: "iPhone", caption: "Catch up anywhere" },
        android: { name: "Android", caption: "Continue on mobile too" },
        ipad: { name: "iPad", caption: "Lighter side-by-side view" },
        chrome: { name: "Chrome", caption: "Open and continue" }
      },
      session: {
        badge: "Live session",
        title: "Still running",
        detail: "Context, state, and progress stay connected"
      },
      workspace: {
        windowTitle: "CodingNS Workspace",
        statusLabel: "Live sync",
        title: "One shared workspace",
        summary: "Desktop, browser, and tablet switch shells without losing context.",
        tabs: ["Session", "Files", "Tasks"],
        breadcrumbs: ["Product workspace", "Continue anywhere", "Hero preview"],
        sidebarTitle: "Recent work",
        sidebarSections: [
          {
            title: "Recent sessions",
            items: [
              { label: "Hero visual refresh", meta: "Synced now", active: true },
              { label: "Continue on mobile", meta: "2 min ago" },
              { label: "CLI compatibility", meta: "Today" }
            ]
          },
          {
            title: "Assistants",
            items: [
              { label: "Product copy", meta: "Continue anytime" },
              { label: "Cross-device layout", meta: "In sync" },
              { label: "Launch checklist", meta: "Waiting" }
            ]
          },
          {
            title: "Workspace",
            items: [
              { label: "Home visual", meta: "Open" },
              { label: "Product screenshots", meta: "Pending" },
              { label: "Compatibility view", meta: "Updating" }
            ]
          }
        ],
        messagesTitle: "Session in progress",
        messages: [
          {
            role: "user",
            title: "If I leave the desktop, can I keep this work going on mobile?",
            body: "I want the latest messages, current files, and progress to come with me.",
            meta: "09:41",
            tag: "Cross-device"
          },
          {
            role: "assistant",
            title: "Yes. The workspace carries forward as it is.",
            body: "Recent sessions, the active thread, and the file preview stay aligned together.",
            meta: "09:42",
            tag: "State kept"
          },
          {
            role: "assistant",
            title: "Open it on the web and it returns to the same context.",
            body: "There is no need to restate the background before continuing the work.",
            meta: "09:43",
            tag: "Web continue"
          },
          {
            role: "user",
            title: "What if I switch to another CLI?",
            body: "I want to keep my habits and only reduce the switching between tools.",
            meta: "09:44",
            tag: "CLI support"
          },
          {
            role: "assistant",
            title: "Familiar CLI tools can stay inside one experience.",
            body: "Different sources still follow one way to view, continue, and move between sessions.",
            meta: "09:45",
            tag: "Unified flow"
          },
          {
            role: "assistant",
            title: "Mobile keeps the lighter view while the desktop keeps the depth.",
            body: "The screen changes to fit the device, while the session itself stays connected.",
            meta: "09:46",
            tag: "Mobile view"
          }
        ],
        filesTitle: "Current files",
        files: [
          { name: "Brand home.fig", detail: "Hero layout", active: true },
          { name: "Product shots / Desktop.png", detail: "Workspace view" },
          { name: "Product shots / Mobile.png", detail: "Chat view" },
          { name: "Compatibility.md", detail: "CLI notes" },
          { name: "Launch checklist", detail: "Site handoff" }
        ],
        previewTitle: "Preview summary",
        previewBody: [
          "The left side keeps recent sessions and workspace entry points.",
          "The center keeps the live conversation and AI responses moving.",
          "The right side stays focused on files, preview, and key progress."
        ],
        taskTitle: "Current highlights",
        taskRows: [
          { label: "Cross-platform sync", value: "Connected" },
          { label: "Reply on mobile", value: "Ready" },
          { label: "Open on web", value: "Instant" },
          { label: "CLI support", value: "Expanding" }
        ],
        metrics: [
          { value: "5 views", label: "shown together" },
          { value: "One line", label: "shared context" },
          { value: "Live", label: "state kept" }
        ]
      },
      mobile: {
        title: "Session on the move",
        subtitle: "Mobile keeps the current context",
        headerNote: "Leave the desk and the latest messages, progress, and next steps stay with you.",
        statusTime: "9:54",
        messages: [
          {
            role: "assistant",
            body: "This session is already on your phone, including the latest notes and progress.",
            meta: "Just now",
            highlight: "Session handoff"
          },
          {
            role: "user",
            body: "I only need a quick progress check and a fast reply before moving on.",
            meta: "Just now",
            highlight: "Continue on mobile"
          },
          {
            role: "assistant",
            body: "That is what the mobile view is for: a cleaner chat layout built for checking status and continuing the conversation.",
            meta: "1 min ago",
            highlight: "Lighter view"
          },
          {
            role: "user",
            body: "If I open the browser later, will it still come back to the same place?",
            meta: "1 min ago",
            highlight: "Web continue"
          },
          {
            role: "user",
            body: "I also want familiar CLI sessions to live under the same roof.",
            meta: "2 min ago",
            highlight: "One entry"
          },
          {
            role: "assistant",
            body: "Yes. Desktop, web, and mobile all return to the same session without repeating the context.",
            meta: "2 min ago",
            highlight: "Shared context"
          },
          {
            role: "assistant",
            body: "Common CLI sessions can continue here too, with fewer switches between tools.",
            meta: "3 min ago",
            highlight: "CLI support"
          }
        ],
        composer: "Ask, review, and keep the work moving from here.",
        quickActions: ["Progress", "Reply", "Send"]
      }
    },
    visuals: {
      sectionEyebrow: "Product visuals",
      title: "Show the product before the copy.",
      description: "These slots are reserved for real screenshots. The page replaces them automatically when the files are added.",
      slots: [
        {
          key: "desktop-shot",
          eyebrow: "Desktop",
          title: "Desktop screenshot",
          description: "Use the strongest full-workspace image here.",
          assetPath: "/site-images/hero-desktop.png",
          alt: "CodingNS desktop screenshot",
          tags: ["Wide", "Workspace", "Primary"],
          placeholderLabel: "Desktop view"
        },
        {
          key: "mobile-shot",
          eyebrow: "Mobile",
          title: "Mobile screenshot",
          description: "Good for continued chat or task handoff.",
          assetPath: "/site-images/hero-mobile.png",
          alt: "CodingNS mobile screenshot",
          tags: ["Tall", "Chat", "Handoff"],
          placeholderLabel: "Mobile view"
        },
        {
          key: "web-shot",
          eyebrow: "Web",
          title: "Web screenshot",
          description: "Show cross-device continuation here.",
          assetPath: "/site-images/hero-web.png",
          alt: "CodingNS web screenshot",
          tags: ["Browser", "Cross-device", "Continue"],
          placeholderLabel: "Web view"
        }
      ]
    },
    highlights: {
      sectionEyebrow: "Focus",
      title: "Only three things need to land fast.",
      description: "No long ad copy. State the point and let the visuals carry the rest.",
      items: [
        { title: "Session continuity", description: "The same work moves naturally between devices." },
        { title: "AI relay", description: "Ongoing tasks keep moving when you step away." },
        { title: "Less switching", description: "Files, chat, and status stay on one line." }
      ]
    },
    platforms: {
      sectionEyebrow: "Platforms",
      title: "Three entrances. One state.",
      description: "Full when it needs to be full, lighter when it should be light, but still the same work.",
      cards: [
        { name: "Desktop", summary: "Built for the full workspace and longer sessions.", tags: ["Multi-window", "Files", "Terminal"] },
        { name: "Mobile", summary: "Built for checking progress and picking up work fast.", tags: ["iPhone", "Android", "Continue chat"] },
        { name: "Web", summary: "Built for quick access and immediate continuation.", tags: ["Browser", "Cross-device", "Instant"] }
      ]
    },
    providers: {
      sectionEyebrow: "Compatibility",
      title: "Bring familiar CLI tools into one experience.",
      description: "It is not about replacing your tools. It is about removing one more switch.",
      cards: [
        { name: "Codex", summary: "Keep the current workflow." },
        { name: "Claude Code", summary: "Carry active work to more screens." },
        { name: "OpenCode", summary: "Bring different session sources together." },
        { name: "More CLI", summary: "Compatibility keeps expanding." }
      ],
      media: {
        key: "providers-shot",
        eyebrow: "Compatibility",
        title: "CLI compatibility visual",
        description: "Use a unified session view or multi-CLI compatibility screen.",
        assetPath: "/site-images/providers.png",
        alt: "CodingNS CLI compatibility screenshot",
        tags: ["Landscape", "Compatibility", "Unified view"],
        placeholderLabel: "CLI compatibility view"
      }
    },
    cta: {
      eyebrow: "Next step",
      title: "Once the real screenshots are in, the page is ready.",
      description: "The structure is enough. Do not add more filler copy. Add the product visuals.",
      primaryAction: "Back to top",
      secondaryAction: "See product visuals"
    },
    footer: {
      summary: "Put your CLI session on every screen.",
      copyright: "© 2026 CodingNS"
    }
  }
};
