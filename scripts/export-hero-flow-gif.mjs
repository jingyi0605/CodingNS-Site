import { spawn } from "node:child_process";
import { access, mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "docs");
const outputGifPath = path.join(outputDir, "hero-flow-export.gif");
const outputSmallGifPath = path.join(outputDir, "hero-flow-export-small-16x9.gif");
const port = 4173;
const viewportWidth = 1360;
const viewportHeight = 960;
const fps = 6;
const durationMs = 8000;
const totalFrames = Math.round((fps * durationMs) / 1000);
const cropWidth = 1280;
const cropHeight = 720;
const cropX = Math.round((viewportWidth - cropWidth) / 2);
const cropY = 0;

const exportParams = {
  export: "hero-flow",
  locale: "zh-CN",
  theme: "light",
  holdMs: "3000",
  rotateMs: "1200",
  transitionMs: "720",
  workspaceScrollMs: "5600",
  mobileScrollMs: "4800",
  sessionFloatMs: "2800"
};

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: rootDir,
      stdio: options.stdio ?? ["ignore", "pipe", "pipe"],
      env: process.env
    });

    let stdout = "";
    let stderr = "";

    if (child.stdout) {
      child.stdout.on("data", (chunk) => {
        stdout += String(chunk);
      });
    }

    if (child.stderr) {
      child.stderr.on("data", (chunk) => {
        stderr += String(chunk);
      });
    }

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }

      reject(
        new Error(
          [`Command failed: ${command} ${args.join(" ")}`, stdout.trim(), stderr.trim()].filter(Boolean).join("\n")
        )
      );
    });
  });
}

async function waitForServer(url, timeoutMs = 30000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {}

    await new Promise((resolve) => {
      setTimeout(resolve, 250);
    });
  }

  throw new Error(`Timed out waiting for ${url}`);
}

async function ensureCommand(command) {
  await runCommand("sh", ["-lc", `command -v ${command}`]);
}

async function main() {
  await ensureCommand("ffmpeg");
  await ensureCommand("magick");
  await ensureCommand("playwright");

  await mkdir(outputDir, { recursive: true });

  const tempDir = await mkdtemp(path.join(tmpdir(), "codingns-hero-flow-"));
  const framesDir = path.join(tempDir, "frames");
  const croppedFramesDir = path.join(tempDir, "frames-cropped");
  const palettePath = path.join(tempDir, "palette.png");
  const rawGifPath = path.join(tempDir, "hero-flow-raw.gif");
  const smallPalettePath = path.join(tempDir, "palette-small.png");
  const rawSmallGifPath = path.join(tempDir, "hero-flow-small-raw.gif");

  await mkdir(framesDir, { recursive: true });
  await mkdir(croppedFramesDir, { recursive: true });

  const server = spawn("npm", ["run", "dev", "--", "--host", "127.0.0.1", "--port", String(port), "--strictPort"], {
    cwd: rootDir,
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env
  });

  let serverOutput = "";

  server.stdout.on("data", (chunk) => {
    serverOutput += String(chunk);
  });

  server.stderr.on("data", (chunk) => {
    serverOutput += String(chunk);
  });

  try {
    await waitForServer(`http://127.0.0.1:${port}`);

    for (let frameIndex = 0; frameIndex < totalFrames; frameIndex += 1) {
      const frameMs = Math.round((frameIndex * 1000) / fps);
      const screenshotUrl = new URL(`http://127.0.0.1:${port}`);

      Object.entries(exportParams).forEach(([key, value]) => {
        screenshotUrl.searchParams.set(key, value);
      });
      screenshotUrl.searchParams.set("frameMs", String(frameMs));

      const frameFilename = path.join(framesDir, `frame-${String(frameIndex).padStart(3, "0")}.png`);

      await runCommand("playwright", [
        "screenshot",
        "--browser",
        "chromium",
        "--viewport-size",
        `${viewportWidth},${viewportHeight}`,
        "--color-scheme",
        "light",
        "--lang",
        "zh-CN",
        "--wait-for-selector",
        ".hero-flow",
        "--wait-for-timeout",
        "120",
        screenshotUrl.toString(),
        frameFilename
      ]);
    }

    await runCommand("ffmpeg", [
      "-y",
      "-hide_banner",
      "-loglevel",
      "error",
      "-i",
      path.join(framesDir, "frame-%03d.png"),
      "-vf",
      `crop=${cropWidth}:${cropHeight}:${cropX}:${cropY}`,
      path.join(croppedFramesDir, "frame-%03d.png")
    ]);

    await runCommand("ffmpeg", [
      "-y",
      "-hide_banner",
      "-loglevel",
      "error",
      "-framerate",
      String(fps),
      "-i",
      path.join(croppedFramesDir, "frame-%03d.png"),
      "-vf",
      "palettegen=max_colors=80",
      palettePath
    ]);

    await runCommand("ffmpeg", [
      "-y",
      "-hide_banner",
      "-loglevel",
      "error",
      "-framerate",
      String(fps),
      "-i",
      path.join(croppedFramesDir, "frame-%03d.png"),
      "-i",
      palettePath,
      "-lavfi",
      "[0:v][1:v]paletteuse=dither=sierra2_4a",
      rawGifPath
    ]);

    await runCommand("magick", [rawGifPath, "-layers", "Optimize", "-strip", outputGifPath]);

    await runCommand("ffmpeg", [
      "-y",
      "-hide_banner",
      "-loglevel",
      "error",
      "-framerate",
      String(fps),
      "-i",
      path.join(croppedFramesDir, "frame-%03d.png"),
      "-vf",
      "scale=720:405:flags=lanczos,palettegen=max_colors=56",
      smallPalettePath
    ]);

    await runCommand("ffmpeg", [
      "-y",
      "-hide_banner",
      "-loglevel",
      "error",
      "-framerate",
      String(fps),
      "-i",
      path.join(croppedFramesDir, "frame-%03d.png"),
      "-i",
      smallPalettePath,
      "-lavfi",
      "scale=720:405:flags=lanczos[x];[x][1:v]paletteuse=dither=sierra2_4a",
      rawSmallGifPath
    ]);

    await runCommand("magick", [
      rawSmallGifPath,
      "-layers",
      "Optimize",
      "-strip",
      "-colors",
      "56",
      outputSmallGifPath
    ]);

    await access(outputGifPath);
    await access(outputSmallGifPath);
    console.log(outputGifPath);
    console.log(outputSmallGifPath);
  } finally {
    server.kill("SIGTERM");
    await rm(tempDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
