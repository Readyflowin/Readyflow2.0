import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createServer } from "vite";

const root = process.cwd();
const dist = resolve(root, "dist");
const templatePath = resolve(dist, "index.html");
const template = await readFile(templatePath, "utf8");
const vite = await createServer({
  root,
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true },
});

try {
  const ssg = await vite.ssrLoadModule("/src/ssg.ts");
  for (const route of ssg.getStaticRoutes()) {
    const appHtml = ssg.renderSeoRoute(route);
    const html = template
      .replace(/<!--seo-head:start-->[\s\S]*?<!--seo-head:end-->/, ssg.renderSeoHead(route))
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
    const outputDir = route.path === "/" ? dist : resolve(dist, route.path.slice(1));
    await mkdir(outputDir, { recursive: true });
    await writeFile(resolve(outputDir, "index.html"), html);
  }

  await writeFile(resolve(dist, "sitemap.xml"), ssg.buildSitemapXml());
} finally {
  await vite.close();
}
