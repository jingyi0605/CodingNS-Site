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
      sectionEyebrow: "",
      title: "用同样的方式操作不同厂商的CLI",
      description: "CodingNS 负责把多种 CLI 供应商收进一个统一入口里。",
      slots: [
        {
          key: "desktop-shot",
          eyebrow: "Desktop",
          title: "保留原有习惯",
          description: "继续用熟悉的 CLI，不需要先为官网文案学一套新说法。",
          assetPath: "/site-images/hero-desktop.png",
          alt: "CodingNS 桌面端截图",
          tags: ["CLI", "统一入口", "继续使用"],
          placeholderLabel: "CLI 兼容画面"
        },
        {
          key: "mobile-shot",
          eyebrow: "Mobile",
          title: "统一查看入口",
          description: "不同来源的会话，放到同一个地方查看、续接和切换。",
          assetPath: "/site-images/hero-mobile.png",
          alt: "CodingNS 移动端截图",
          tags: ["多 CLI", "同一入口", "统一查看"],
          placeholderLabel: "统一入口画面"
        },
        {
          key: "web-shot",
          eyebrow: "Web",
          title: "兼容能力继续扩展",
          description: "先把常用 CLI 收进来，再把更多选择接进同一条体验里。",
          assetPath: "/site-images/hero-web.png",
          alt: "CodingNS 网页端截图",
          tags: ["扩展支持", "兼容能力", "持续补齐"],
          placeholderLabel: "兼容能力画面"
        }
      ]
    },
    highlights: {
      sectionEyebrow: "工作区",
      title: "一段会话，不只是聊天记录。",
      description: "文件、终端、Git 和上下文都会一起跟上。",
      items: [
        { title: "文件就在旁边", description: "看到会话的同时，也能看到项目文件和当前改动。" },
        { title: "终端继续在跑", description: "命令、输出和最近进展，不需要再切去别的地方找。" },
        { title: "Git 不脱节", description: "查看差异、理解改动、继续推进，都还留在同一段工作里。" }
      ]
    },
    platforms: {
      sectionEyebrow: "设备",
      title: "从桌面到手机，从网页到平板。",
      description: "你离开的不是工作，只是当前这块屏幕。",
      cards: [
        { name: "桌面端", summary: "完整工作区留在大屏上，适合长时间推进同一段任务。", tags: ["多窗口", "文件", "终端"] },
        { name: "移动端", summary: "离开桌面时，手机负责接住进度、摘要和下一条回复。", tags: ["iPhone", "Android", "继续回复"] },
        { name: "网页端 / 平板", summary: "临时打开也能继续，不需要先把背景再解释一遍。", tags: ["浏览器", "平板", "继续工作"] }
      ]
    },
    providers: {
      sectionEyebrow: "分叉",
      title: "一个方向不够，就从任意节点分出新的会话。",
      description: "继续试，而不是重新来。",
      cards: [
        { name: "从消息继续", summary: "不必复制整段上下文，直接从当前节点开始下一种尝试。" },
        { name: "保留原来链路", summary: "原来的推进过程还在，新方向只是分出去，不是覆盖掉。" },
        { name: "并排比较", summary: "不同思路可以同时保留，回头判断时更清楚。" },
        { name: "继续向前试", summary: "试错不是重开一局，而是在现有基础上继续推。" }
      ],
      media: {
        key: "providers-shot",
        eyebrow: "Branching",
        title: "会话分叉画面",
        description: "建议放从消息节点分出新会话或分支树相关截图。",
        assetPath: "/site-images/providers.png",
        alt: "CodingNS 会话分叉截图",
        tags: ["横图", "分叉", "继续试"],
        placeholderLabel: "会话分叉画面"
      }
    },
    cta: {
      eyebrow: "远程",
      title: "不管项目在本机、远程主机还是云端环境。",
      description: "CodingNS 都让进入、查看和继续推进更统一。",
      primaryAction: "回到顶部",
      secondaryAction: "查看产品画面"
    },
    footer: {
      summary: "把 CLI、工作区和不同屏幕收进同一条体验里。",
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
      sectionEyebrow: "",
      title: "Use different CLI vendors in the same familiar way.",
      description: "CodingNS brings multiple CLI providers into one unified entry.",
      slots: [
        {
          key: "desktop-shot",
          eyebrow: "Desktop",
          title: "Keep familiar habits",
          description: "Stay with the CLI tools you already use instead of learning a new front door first.",
          assetPath: "/site-images/hero-desktop.png",
          alt: "CodingNS desktop screenshot",
          tags: ["CLI", "Unified entry", "Keep using"],
          placeholderLabel: "CLI compatibility view"
        },
        {
          key: "mobile-shot",
          eyebrow: "Mobile",
          title: "One place to view",
          description: "Sessions from different sources can still be viewed, continued, and switched in one place.",
          assetPath: "/site-images/hero-mobile.png",
          alt: "CodingNS mobile screenshot",
          tags: ["Multi-CLI", "One entry", "Unified view"],
          placeholderLabel: "Unified entry view"
        },
        {
          key: "web-shot",
          eyebrow: "Web",
          title: "Compatibility keeps expanding",
          description: "Bring in the common CLI tools first, then keep extending the same experience to more of them.",
          assetPath: "/site-images/hero-web.png",
          alt: "CodingNS web screenshot",
          tags: ["More support", "Compatibility", "Expanding"],
          placeholderLabel: "Compatibility view"
        }
      ]
    },
    highlights: {
      sectionEyebrow: "Workspace",
      title: "A session is more than a chat log.",
      description: "Files, terminal, Git, and context all move with it.",
      items: [
        { title: "Files stay beside it", description: "See the conversation and the project files together, without splitting the work apart." },
        { title: "The terminal keeps running", description: "Commands, output, and recent progress stay close instead of being pushed into another tool." },
        { title: "Git stays in the loop", description: "Review changes, understand diffs, and keep moving without dropping the session context." }
      ]
    },
    platforms: {
      sectionEyebrow: "Devices",
      title: "From desktop to phone, from browser to tablet.",
      description: "What you leave behind is the screen, not the work.",
      cards: [
        { name: "Desktop", summary: "Keep the full workspace on the larger screen when the work needs depth and time.", tags: ["Multi-window", "Files", "Terminal"] },
        { name: "Mobile", summary: "Leave the desk and use the phone to catch up on progress, summaries, and the next reply.", tags: ["iPhone", "Android", "Reply fast"] },
        { name: "Web / Tablet", summary: "Open it temporarily and still continue without retelling the background first.", tags: ["Browser", "Tablet", "Continue work"] }
      ]
    },
    providers: {
      sectionEyebrow: "Branching",
      title: "When one direction is not enough, branch from any point.",
      description: "Keep trying instead of starting over.",
      cards: [
        { name: "Continue from any message", summary: "Start the next attempt from the current node instead of rebuilding the whole context." },
        { name: "Keep the original path", summary: "The existing line of work stays intact while the new direction branches away from it." },
        { name: "Compare side by side", summary: "Multiple ideas can stay alive at once, which makes the next decision clearer." },
        { name: "Push the work forward", summary: "Experimentation becomes a continuation of the work, not a reset." }
      ],
      media: {
        key: "providers-shot",
        eyebrow: "Branching",
        title: "Session branching visual",
        description: "Use a screenshot that shows branching from a message or a visible branch tree.",
        assetPath: "/site-images/providers.png",
        alt: "CodingNS session branching screenshot",
        tags: ["Landscape", "Branching", "Try next"],
        placeholderLabel: "Session branching view"
      }
    },
    cta: {
      eyebrow: "Remote",
      title: "Whether the project lives locally, on a remote host, or in the cloud.",
      description: "CodingNS keeps entering, viewing, and continuing the work more consistent.",
      primaryAction: "Back to top",
      secondaryAction: "See product visuals"
    },
    footer: {
      summary: "Bring CLI, workspace, and every screen into one continuous flow.",
      copyright: "© 2026 CodingNS"
    }
  }
};
