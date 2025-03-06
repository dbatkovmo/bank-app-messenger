# Bank App Messenger (Library)

NPM [package link](https://www.npmjs.com/package/bank-app-messenger) <br />

```
npm i bank-app-messenger@latest
```

### Using

You need to import the `Messenger` component to the insertion location <br/>
The messenger will occupy the entire height and width of the parent container in default mode.

```tsx
// Basic usage
import {Messenger} from 'bank-app-messenger';

<Messenger/>
```

```tsx
// Extended usage
import {Messenger, meta} from 'bank-app-messenger';

console.log(meta); // Package information: version and author
  
<Messenger fullScreen sidebar="mini"/>
```

```scss
// Separate style import
// index.scss

@import 'bank-app-messenger/styles.css';
```

### Customization

It is possible to personalize the messenger through the `parameters` passed to the component during
initialization.

```
// Available options Messenger
token?: 'string' - JWT tokenAccess from bank-just client
theme?: 'dark' | 'light'
fullScreen?: true | false
sidebar?: 'full' | 'mini' | 'none'
lang?: 'ru' | 'en'
```

### Localization

Translation files into other languages can be `edited or added` along the route.

```ts
'src/configs/locales/{lang}/translation.json'
```

### Dependencies

Necessary dependencies for the `correct` operation of the module

`React` `TypeScript` `SASS` `socket.io-client`
