import * as yaml from 'yaml'
import * as path from 'path'
import * as fs from 'fs'

type Metadata = {
  versions: { sha: string; changeNotes: string }[]
}

async function main() {
  const metadataPath = path.resolve(__dirname, '../metadata.yaml')
  const metadata = yaml.parse(fs.readFileSync(metadataPath).toString()) as Metadata

  const args = process.argv.slice(2)

  if (args.length !== 2) {
    throw new Error('Usage: updateMetadata <sha> <changeNotes>')
  }

  const [sha, changeNotes] = args

  if (!sha || !changeNotes) {
    throw new Error('Missing required args')
  }

  metadata.versions.unshift({ sha, changeNotes })

  fs.writeFileSync(metadataPath, yaml.stringify(metadata))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
