#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const reportsDir = path.resolve(process.cwd(), 'reports')
const outDir = path.resolve(process.cwd(), 'report')
const merged = path.join(reportsDir, 'mochawesome.json')

if (!fs.existsSync(merged)) {
  console.log('Merged report not found (', merged, '). Skipping HTML generation.')
  process.exit(0)
}

try {
  const content = fs.readFileSync(merged, 'utf8')
  if (!content || content.trim().length === 0) {
    console.log('Merged report is empty. Skipping HTML generation.')
    process.exit(0)
  }
  JSON.parse(content)
} catch (err) {
  console.error('Merged report is not valid JSON. Skipping HTML generation.', err && err.message)
  process.exit(0)
}

// ensure outDir is clean
try { fs.rmSync(outDir, { recursive: true, force: true }) } catch (e) {}
fs.mkdirSync(outDir, { recursive: true })

console.log('Generating HTML report in', outDir)
let res = spawnSync('npx', ['marge', merged, '-f', 'report', '-o', outDir], { stdio: 'inherit' })
if (res.status !== 0) {
  console.log('marge failed, trying mochawesome-report-generator fallback')
  res = spawnSync('npx', ['mochawesome-report-generator', merged, '-o', outDir], { stdio: 'inherit' })
}

if (res.status !== 0) {
  console.error('Report generation failed')
  process.exit(res.status || 1)
}

console.log('Report generated successfully at', outDir)

// Ensure an index.html exists at the root of outDir for GitHub Pages
try {
  const files = fs.readdirSync(outDir).filter(f => f.toLowerCase().endsWith('.html'))
  const indexPath = path.join(outDir, 'index.html')
  if (!fs.existsSync(indexPath)) {
    if (files.length > 0) {
      // copy the first html file to index.html
      const first = path.join(outDir, files[0])
      fs.copyFileSync(first, indexPath)
      console.log('Copied', files[0], 'to index.html for Pages compatibility')
    } else {
      console.warn('No HTML files found in', outDir)
    }
  } else {
    console.log('index.html already present')
  }
} catch (err) {
  console.warn('Could not ensure index.html:', err && err.message)
}
