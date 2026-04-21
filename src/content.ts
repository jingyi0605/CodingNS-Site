export type Locale = "zh-CN" | "en-US";

type NavigationItem = {
  label: string;
  href: string;
  external?: boolean;
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

export type HighlightSection = {
  sectionEyebrow: string;
  title: string;
  description: string;
  spotlight: {
    title: string;
    description: string;
    tags: string[];
  };
  cards: MediaSlot[];
};

type CapabilityMedia = {
  assetPath: string;
  alt: string;
  placeholderLabel: string;
};

type ProviderCard = {
  name: string;
  summary: string;
};

type RemoteAccessVisualCopy = {
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

export type FeatureIconName =
  | "quick-phrase"
  | "file-preview"
  | "debug-launch"
  | "skill-sync"
  | "config-switch"
  | "device-management"
  | "git-history"
  | "host-switch"
  | "remote-access";

type FeatureCard = {
  name: string;
  summary: string;
  icon: FeatureIconName;
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
    githubHref: string;
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
  highlights: HighlightSection;
  platforms: {
    sectionEyebrow: string;
    title: string;
    description: string;
    media: CapabilityMedia[];
    points: string[];
  };
  providers: {
    sectionEyebrow: string;
    title: string;
    description: string;
    cards: ProviderCard[];
    media: CapabilityMedia;
  };
  remoteAccess: {
    sectionEyebrow: string;
    title: string;
    description: string;
    cards: ProviderCard[];
    visual: RemoteAccessVisualCopy;
  };
  moreFeatures: {
    sectionEyebrow: string;
    title: string;
    description: string;
    cards: FeatureCard[];
  };
  footer: {
    summary: string;
    copyright: string;
    contactTitle: string;
    contactLabel: string;
    contactValue: string;
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
        { label: "核心能力", href: "#visuals" },
        { label: "更多功能", href: "#more-features" },
        { label: "用户交流", href: "#contact" },
        { label: "文档", href: "https://docs.codingns.com", external: true }
      ],
      githubHref: "https://github.com/jingyi0605/CodingNS",
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
      secondaryAction: "查看会话分叉",
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
      spotlight: {
        title: "在一个闭环工作区里，同时接住文件、Git 和终端。",
        description: "不是在三个工具之间来回找，而是在同一块工作区里切换视角、确认状态、继续推进。",
        tags: ["文件树", "Git 变更", "进程状态"]
      },
      cards: [
        {
          key: "workspace-files",
          eyebrow: "Files",
          title: "文件管理留在工作区里",
          description: "目录、文件和当前会话共用同一个入口，看到什么、改到哪里，都不需要再跳出去确认。",
          assetPath: "/site-images/workspace-files.png",
          alt: "CodingNS 文件管理截图",
          tags: ["文件树", "工作区", "同屏查看"],
          placeholderLabel: "文件管理截图"
        },
        {
          key: "workspace-git",
          eyebrow: "Git",
          title: "Git 变化直接接在当前任务上",
          description: "查看改动、写提交信息、继续回到会话推进，整个链路保持在同一段上下文里。",
          assetPath: "/site-images/workspace-git.png",
          alt: "CodingNS Git 管理截图",
          tags: ["差异查看", "提交", "闭环推进"],
          placeholderLabel: "Git 管理截图"
        },
        {
          key: "workspace-process",
          eyebrow: "Process",
          title: "终端和启动项也在这一层收口",
          description: "服务是否启动、端口是否占用、要不要新开终端，都能在工作区里直接判断和处理。",
          assetPath: "/site-images/workspace-process.png",
          alt: "CodingNS 进程管理截图",
          tags: ["启动项", "端口", "终端状态"],
          placeholderLabel: "进程管理截图"
        }
      ]
    },
    platforms: {
      sectionEyebrow: "能力",
      title: "把那些不值得人守着的事，交给 CodingNS。",
      description: "盯进度、等配额、做巡检，这些重复动作都可以自动接住。",
      media: [
        {
          assetPath: "/site-images/capabilities-automation-1.png",
          alt: "CodingNS 创建自动化流程截图",
          placeholderLabel: "自动化能力截图一"
        },
        {
          assetPath: "/site-images/capabilities-automation-2.png",
          alt: "CodingNS 自动化监控结果与计时截图",
          placeholderLabel: "自动化能力截图二"
        }
      ],
      points: [
        "让 CodingNS 帮你盯着 Spec 会话的开发进度，还能打开浏览器自动验证。",
        "Code Plan 到限额？让 CodingNS 帮你盯着，配额恢复后自动恢复工作！",
        "让 CodingNS 每天帮你生成巡检报告，没问题！"
      ]
    },
    providers: {
      sectionEyebrow: "会话分叉",
      title: "把同一段思路分成树，再决定哪一支继续往前走。",
      description: "更适合头脑风暴，也更适合在不同模型之间继续试。",
      cards: [
        {
          name: "图形化会话树",
          summary: "把主干和所有分支直接展开，切换、回看、比较都更直观，特别适合头脑风暴时同时保留多条思路。"
        },
        {
          name: "跨运营商 Fork",
          summary: "Codex 卡住了，就从当前节点直接分一支给 Claude Code 或别的模型继续试，不用重讲背景，不用重建上下文。"
        }
      ],
      media: {
        assetPath: "/site-images/providers-branching.png",
        alt: "CodingNS 图形化会话树截图",
        placeholderLabel: "会话分叉截图"
      }
    },
    remoteAccess: {
      sectionEyebrow: "远程访问",
      title: "一键开远程，没公网也能进。",
      description: "Host 在你机器上，中继帮你连回来。",
      cards: [
        {
          name: "不用折腾公网",
          summary: "打开就能连。"
        },
        {
          name: "外面也能接着干",
          summary: "电脑、手机、浏览器都能进。"
        }
      ],
      visual: {
        devicesTitle: "外部设备",
        relayTitle: "官方中继",
        relaySubtitle: "把访问带回 Host",
        hostTitle: "你的 Host",
        accessNote: "没公网，也能从外面连回来",
        deviceLabels: {
          laptop: "笔记本",
          mobile: "手机",
          browser: "浏览器"
        }
      }
    },
    moreFeatures: {
      sectionEyebrow: "更多功能",
      title: "把高频操作收进一组顺手的小工具里。",
      description: "不是概念功能，而是你每天真的会点开的那几类能力。",
      cards: [
        {
          name: "快捷短语",
          summary: "把常用提示语单独存起来，高频语句一键填回输入框。",
          icon: "quick-phrase"
        },
        {
          name: "文件预览",
          summary: "文本能编辑，HTML 可以直接看效果，图片和 PDF 也能统一预览。",
          icon: "file-preview"
        },
        {
          name: "调试启动",
          summary: "先定义服务怎么启动，再一键拉起到终端，日志和端口也放在一起看。",
          icon: "debug-launch"
        },
        {
          name: "Skill 同步",
          summary: "多个 CLI 的本地 Skill 统一扫描、纳管和重新同步，不用自己手动搬。",
          icon: "skill-sync"
        },
        {
          name: "配置切换",
          summary: "把 CLI 供应商配置图形化展示出来，常用预设一键切换。",
          icon: "config-switch"
        },
        {
          name: "设备管理",
          summary: "查看当前设备、其他在线设备和最近登录记录，必要时一键踢出风险设备。",
          icon: "device-management"
        },
        {
          name: "Git 版本详情",
          summary: "最近版本、全量历史、提交详情和改动解释都能直接在应用里查看。",
          icon: "git-history"
        },
        {
          name: "多 Host 切换",
          summary: "桌面端和移动端都能切换不同 Host，不需要因为换机器就重新整理入口。",
          icon: "host-switch"
        },
        {
          name: "远程访问",
          summary: "设置里就能看到远程访问状态、安装引导和访问入口，不用自己再拼链路。",
          icon: "remote-access"
        }
      ]
    },
    footer: {
      summary: "把 CLI、工作区和不同屏幕收进同一条体验里。",
      copyright: "© 2026 CodingNS",
      contactTitle: "联系方式",
      contactLabel: "QQ群",
      contactValue: "1092985965"
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
        { label: "Core Capabilities", href: "#visuals" },
        { label: "More Features", href: "#more-features" },
        { label: "Community", href: "#contact" },
        { label: "Docs", href: "https://docs.codingns.com", external: true }
      ],
      githubHref: "https://github.com/jingyi0605/CodingNS",
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
      secondaryAction: "See session branching",
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
      spotlight: {
        title: "One closed-loop workspace keeps files, Git, and terminal state together.",
        description: "Instead of bouncing across separate tools, switch views inside the same workspace and keep the work moving forward.",
        tags: ["File tree", "Git changes", "Process state"]
      },
      cards: [
        {
          key: "workspace-files",
          eyebrow: "Files",
          title: "File management stays inside the workspace",
          description: "The directory tree, the files, and the current session share one entry point, so the work never splits apart.",
          assetPath: "/site-images/workspace-files.png",
          alt: "CodingNS file management screenshot",
          tags: ["File tree", "Workspace", "Same screen"],
          placeholderLabel: "File management view"
        },
        {
          key: "workspace-git",
          eyebrow: "Git",
          title: "Git changes stay attached to the task at hand",
          description: "Review diffs, write the commit, and return to the conversation without losing the thread of the work.",
          assetPath: "/site-images/workspace-git.png",
          alt: "CodingNS Git management screenshot",
          tags: ["Diff review", "Commit", "Closed loop"],
          placeholderLabel: "Git management view"
        },
        {
          key: "workspace-process",
          eyebrow: "Process",
          title: "Terminal and launch items close the loop",
          description: "See whether services are running, whether ports are occupied, and whether a new terminal is needed, all from the same workspace.",
          assetPath: "/site-images/workspace-process.png",
          alt: "CodingNS process management screenshot",
          tags: ["Launch items", "Ports", "Terminal state"],
          placeholderLabel: "Process management view"
        }
      ]
    },
    platforms: {
      sectionEyebrow: "Capabilities",
      title: "Hand the repetitive watching to CodingNS.",
      description: "Track progress, wait for quota, and generate daily checks without keeping a person on standby.",
      media: [
        {
          assetPath: "/site-images/capabilities-automation-1.png",
          alt: "CodingNS automation creation screenshot",
          placeholderLabel: "Automation capability screenshot one"
        },
        {
          assetPath: "/site-images/capabilities-automation-2.png",
          alt: "CodingNS automation monitoring and timer screenshot",
          placeholderLabel: "Automation capability screenshot two"
        }
      ],
      points: [
        "Let CodingNS watch the progress of a Spec session and even open the browser to verify it automatically.",
        "Hit the Code Plan quota? Let CodingNS keep watching and resume the work when quota comes back.",
        "Let CodingNS generate a daily inspection report for you. No problem."
      ]
    },
    providers: {
      sectionEyebrow: "Session Branching",
      title: "Turn one line of thought into a tree, then decide which branch deserves the next step.",
      description: "Better for brainstorming, and better for continuing the work across different models.",
      cards: [
        {
          name: "Visual Session Tree",
          summary: "See the trunk and every branch together so switching, reviewing, and comparing feel natural, especially during brainstorming."
        },
        {
          name: "Cross-Provider Fork",
          summary: "If Codex gets stuck, branch from the current node and let Claude Code or another model take a shot without rebuilding the context."
        }
      ],
      media: {
        assetPath: "/site-images/providers-branching.png",
        alt: "CodingNS visual session tree screenshot",
        placeholderLabel: "Session branching screenshot"
      }
    },
    remoteAccess: {
      sectionEyebrow: "Remote Access",
      title: "Turn on remote access in one click, even without a public address.",
      description: "Your Host stays local. The relay brings it back.",
      cards: [
        {
          name: "Skip public IP setup",
          summary: "Turn it on and connect."
        },
        {
          name: "Keep working outside",
          summary: "Laptop, phone, and browser all get in."
        }
      ],
      visual: {
        devicesTitle: "External Devices",
        relayTitle: "Official Relay",
        relaySubtitle: "Carry access back to your Host",
        hostTitle: "Your Host",
        accessNote: "No public address, and still reachable from outside",
        deviceLabels: {
          laptop: "Laptop",
          mobile: "Mobile",
          browser: "Browser"
        }
      }
    },
    moreFeatures: {
      sectionEyebrow: "More Features",
      title: "Keep the everyday actions inside one workspace.",
      description: "These are the small tools you actually click every day, not abstract platform claims.",
      cards: [
        {
          name: "Quick Phrases",
          summary: "Save the prompts you send all the time and drop them back into the input box with one click.",
          icon: "quick-phrase"
        },
        {
          name: "File Preview",
          summary: "Edit text files, preview HTML directly, and keep images and PDFs in the same viewer flow.",
          icon: "file-preview"
        },
        {
          name: "Debug Launch",
          summary: "Define how a service should start, launch it into the terminal, and keep logs and ports nearby.",
          icon: "debug-launch"
        },
        {
          name: "Skill Sync",
          summary: "Scan, manage, and re-sync local Skills across multiple CLI providers without moving files by hand.",
          icon: "skill-sync"
        },
        {
          name: "Config Switching",
          summary: "Turn CLI provider presets into a visual switcher so the one you need is one click away.",
          icon: "config-switch"
        },
        {
          name: "Device Management",
          summary: "Review the current device, other online devices, and recent logins, then remove risky devices when needed.",
          icon: "device-management"
        },
        {
          name: "Git History",
          summary: "Open recent versions, full history, commit details, and change explanations without leaving the app.",
          icon: "git-history"
        },
        {
          name: "Multi-Host Switching",
          summary: "Move between different Hosts on desktop and mobile without rebuilding the way you work each time.",
          icon: "host-switch"
        },
        {
          name: "Remote Access",
          summary: "Check status, setup guidance, and access entry points from settings instead of stitching the path together yourself.",
          icon: "remote-access"
        }
      ]
    },
    footer: {
      summary: "Bring CLI, workspace, and every screen into one continuous flow.",
      copyright: "© 2026 CodingNS",
      contactTitle: "Contact",
      contactLabel: "QQ Group",
      contactValue: "1092985965"
    }
  }
};
