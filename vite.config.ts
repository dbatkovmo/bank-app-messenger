import {defineConfig, Plugin} from 'vite'
import react from '@vitejs/plugin-react'

const path = require('path')
const fs = require('fs')
const sass = require('sass')
const glob = require('glob')

// Используется для dev режима и сборки css файла
export default defineConfig({
  plugins: [react(), customCssPlugin()],
  root: path.resolve(__dirname, 'public'),
  server: {
    port: 3030,
    open: true,
    fs: {
      allow: [path.resolve(__dirname)]
    }
  },
  resolve: {
    alias: {
      '/src': path.resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: 'virtual-entry' // Виртуальный входной файл
    }
  }
})

/*Собираем css для отдельного импорта стилей в проектах*/
function customCssPlugin(): Plugin {
  return {
    name: 'vite-plugin-custom-css',
    apply: 'build' as const,
    resolveId(id) {
      // Перехватываем виртуальный входной файл
      if (id === 'virtual-entry') {
        return id // Возвращаем ID как есть для обработки в load
      }
    },
    load(id) {
      // Генерируем минимальный код для виртуального файла
      if (id === 'virtual-entry') {
        return 'export default () => {};' // Пустой модуль
      }
    },
    buildStart() {
      // Генерация CSS
      const scssFiles = glob.sync('src/**/*.scss', {cwd: __dirname})
      const tempScssContent = scssFiles
        .map((file: any) => `@forward '${path.relative('src', file).replace(/\\/g, '/')}';`)
        .join('\n')
      fs.writeFileSync('src/temp-styles.scss', tempScssContent)

      const result = sass.compile(path.resolve(__dirname, 'src/temp-styles.scss'), {
        style: 'compressed',
        sourceMap: false
      })
      fs.mkdirSync('dist', {recursive: true})
      fs.writeFileSync('dist/index.css', result.css)
      fs.unlinkSync('src/temp-styles.scss')
    },
    generateBundle(outputOptions, bundle) {
      // Удаляем все JS-файлы из вывода
      for (const fileName in bundle) {
        if (fileName.endsWith('.js')) {
          delete bundle[fileName]
        }
      }
    }
  }
}
