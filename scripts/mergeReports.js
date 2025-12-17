#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const reportsDir = path.resolve(process.cwd(), 'reports')
const outFile = path.join(reportsDir, 'mochawesome.json')

if (!fs.existsSync(reportsDir)) {
  console.log('No reports directory found. Skipping merge.')
  process.exit(0)
}

const files = fs.readdirSync(reportsDir)
  .filter(f => f.endsWith('.json'))
  .map(f => path.join(reportsDir, f))

const valid = []
for (const f of files) {
  try {
    const content = fs.readFileSync(f, 'utf8')
    if (!content || content.trim().length === 0) {
      console.log('Skipping empty file:', f)
      continue
    }
    JSON.parse(content)
    valid.push(f)
  } catch (err) {
    console.warn('Skipping invalid JSON file:', f)
  }
}

if (valid.length === 0) {
  console.log('No valid mochawesome JSON files to merge. Skipping generation of', outFile)
  // ensure the outFile does not exist or is empty
  try { fs.unlinkSync(outFile) } catch (e) {}
  process.exit(0)
}

console.log('Merging files:', valid)
// run mochawesome-merge with the valid files
const args = valid
const res = spawnSync('npx', ['mochawesome-merge', ...args], { encoding: 'utf8' })
if (res.error) {
  console.error('Failed to run mochawesome-merge:', res.error)
  process.exit(1)
}
if (res.status !== 0) {
  console.error('mochawesome-merge exited with code', res.status)
  console.error(res.stdout)
  console.error(res.stderr)
  process.exit(res.status)
}

fs.writeFileSync(outFile, res.stdout, 'utf8')
console.log('Wrote merged report to', outFile)
