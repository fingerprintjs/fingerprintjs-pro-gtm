import typescript from '@rollup/plugin-typescript'
import jsonPlugin from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import licensePlugin from 'rollup-plugin-license'
import { join } from 'path'

const inputFile = 'src/index.ts'
const outputDirectory = 'dist'
const artifactName = 'fpjs-pro-gtm'

const commonBanner = licensePlugin({
  banner: {
    content: {
      file: join(__dirname, 'resources', 'license_banner.txt'),
    },
  },
})

const commonInput = {
  input: inputFile,
  plugins: [jsonPlugin(), typescript(), nodeResolve(), commonBanner],
}

const commonOutput = {
  name: 'FingerprintjsProGTM',
  exports: 'named',
}

export default [
  // NPM bundles. They have all the dependencies excluded for end code size optimization.
  {
    ...commonInput,
    output: [
      // ESM for usage with `import`
      {
        ...commonOutput,
        file: `${outputDirectory}/${artifactName}.esm.js`,
        format: 'es',
      },
    ],
  },
]
