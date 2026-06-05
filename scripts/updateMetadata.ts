import * as yaml from 'yaml'
import * as path from 'path'
import * as fs from 'fs'
import { execFileSync } from 'child_process'

type Metadata = {
  versions: { sha: string; changeNotes: string }[]
}

async function main() {
  const metadataPath = path.resolve(__dirname, '../metadata.yaml')
  const metadata = yaml.parse(fs.readFileSync(metadataPath).toString()) as Metadata

  const args = process.argv.slice(2)

  if (args.length !== 1) {
    throw new Error('Usage: updateMetadata <tag short ref name>')
  }

  const [tagName] = args

  if (!tagName) {
    throw new Error('Missing required args')
  }

  const sha = getTagSha(tagName)
  const changeNotes = getChangelogAdditions(tagName)

  metadata.versions.unshift({ sha, changeNotes })

  fs.writeFileSync(metadataPath, yaml.stringify(metadata))
}

// Resolve the tag to the commit SHA it points at.
function getTagSha(tagName: string): string {
  return git(['rev-list', '-n', '1', tagName])
}

// Releasing the tag prepended the new version's section to CHANGELOG.md,
// so the lines added between the previous tag and this one are exactly the
// change notes for this release.
function getChangelogAdditions(tagName: string): string {
  let previousTag: string
  try {
    previousTag = git(['describe', '--tags', '--abbrev=0', `${tagName}^`])
  } catch {
    previousTag = ''
  }

  if (!previousTag) {
    // No previous tag (first release): diff against the empty tree.
    previousTag = git(['hash-object', '-t', 'tree', '/dev/null'])
  }

  const diff = git(['diff', previousTag, tagName, '--', 'CHANGELOG.md'])

  return diff
    .split('\n')
    .filter((line) => line.startsWith('+') && !line.startsWith('+++'))
    .map((line) => line.slice(1))
    .join('\n')
}

function git(args: string[]): string {
  return execFileSync('git', args, { encoding: 'utf8' }).trim()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
