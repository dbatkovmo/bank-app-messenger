import packageJson from '../../package.json'

interface IMeta {
  version: string
  author: string
}

const meta: IMeta = {
  version: packageJson.version,
  author: packageJson.author
}

export default meta
