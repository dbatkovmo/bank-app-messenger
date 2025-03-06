import {defineConfig} from 'tsup'
import {sassPlugin} from 'esbuild-sass-plugin'

/*Собирает только JS файлы и types (css встроен в js)*/
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true, // Генерация типов
  sourcemap: true,
  minify: true,
  clean: true,
  esbuildPlugins: [
    sassPlugin({
      /* local-css - отдельный файл сss
      При использовании отдельного файла css,
      необходимо в package.json указывать
      * exports для js и стилей*/
      type: 'style' // Стили встроены в js-файлы
    })
  ],
  /*Настройки esbuild для обработки картинок в js файл
  Для избегания конфликтов с путями в других проектах*/
  esbuildOptions(options) {
    options.loader = {
      '.png': 'dataurl',
      '.svg': 'dataurl'
    }
  }
})
