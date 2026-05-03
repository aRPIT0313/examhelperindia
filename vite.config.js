import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

const BASE_URL = 'https://examhelperindia.vercel.app'

// ─── Dynamic Sitemap Plugin ───────────────────────────────────────────────────
// Reads examConfig + blogConfig at build time and writes public/sitemap.xml
// automatically. No manual updates needed — just add exams/articles and push.
function sitemapPlugin() {
  return {
    name: 'generate-sitemap',
    closeBundle() {
      // Dynamically import configs (they are plain JS objects, no JSX)
      const { EXAMS } = require('./src/config/examConfig.js')
      const { ARTICLES } = require('./src/config/blogConfig.js')

      const today = new Date().toISOString().split('T')[0]

      // Static pages
      const staticPages = [
        { url: '/',             priority: '1.0', changefreq: 'weekly'  },
        { url: '/tool',         priority: '0.9', changefreq: 'monthly' },
        { url: '/blog',         priority: '0.8', changefreq: 'weekly'  },
        { url: '/print-photo',  priority: '0.9', changefreq: 'monthly' },
        { url: '/declaration',       priority: '0.8', changefreq: 'monthly' },
        { url: '/photo-guide-2026',   priority: '0.9', changefreq: 'monthly' },
      ]

      // Exam pages — auto-detected from examConfig
      const examPages = EXAMS.map(exam => ({
        url: `/exam/${exam.slug}`,
        priority: '0.8',
        changefreq: 'monthly',
      }))

      // Blog article pages — auto-detected from blogConfig
      const articlePages = ARTICLES.map(article => ({
        url: `/blog/${article.slug}`,
        priority: '0.7',
        changefreq: 'monthly',
      }))

      const allPages = [...staticPages, ...examPages, ...articlePages]

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Auto-generated at build time — do not edit manually -->
  <!-- Last generated: ${today} -->
  <!-- Total pages: ${allPages.length} -->
${allPages.map(p => `  <url>
    <loc>${BASE_URL}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`

      // Write to both dist (served) and public (source of truth)
      writeFileSync(resolve(__dirname, 'dist/sitemap.xml'), xml)
      writeFileSync(resolve(__dirname, 'public/sitemap.xml'), xml)

      console.log(`✅ Sitemap generated: ${allPages.length} pages`)
      console.log(`   ↳ ${staticPages.length} static + ${examPages.length} exams + ${articlePages.length} articles`)
    }
  }
}

export default defineConfig({
  plugins: [react(), sitemapPlugin()],
})
