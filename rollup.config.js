import typescript from '@rollup/plugin-typescript'
import jsonPlugin from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
const terserPlugin = require('rollup-plugin-terser').terser
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

// Need for IIFE build
const commonTerser = terserPlugin(require('./terser.config.js'))

export default [
  {
    ...commonInput,
    output: [
      // IIFE build for browser with adding globals to window
      {
        ...commonOutput,
        file: `${outputDirectory}/${artifactName}.min.js`,
        format: 'iife',
        plugins: [commonTerser],
      },
      {
        ...commonOutput,
        file: `${outputDirectory}/${artifactName}.js`,
        format: 'iife',
      },
    ],
  },

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
