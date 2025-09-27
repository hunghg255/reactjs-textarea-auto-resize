<p align="center">
<a href="https://www.npmjs.com/package/reactjs-textarea-auto-resize" target="_blank" rel="noopener noreferrer">
<img src="https://api.iconify.design/teenyicons:otp-outline.svg?color=%23fdb4e2" alt="logo" width='100'/></a>
</p>

<p align="center">
  A library handle textarea auto resize
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/reactjs-textarea-auto-resize" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/csvs-parsers.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/reactjs-textarea-auto-resize" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/npm/dt/csvs-parsers.svg?logo=npm" alt="NPM Downloads" /></a>
  <a href="https://bundlephobia.com/result?p=reactjs-textarea-auto-resize" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/bundlephobia/minzip/reactjs-textarea-auto-resize" alt="Minizip" /></a>
  <a href="https://github.com/hunghg255/reactjs-textarea-auto-resize/graphs/contributors" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg" alt="Contributors" /></a>
  <a href="https://github.com/hunghg255/reactjs-textarea-auto-resize/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/hunghg255/reactjs-textarea-auto-resize" alt="License" /></a>
</p>

## Installation

[![NPM](https://nodei.co/npm/reactjs-textarea-auto-resize.png?compact=true)](https://nodei.co/npm/reactjs-textarea-auto-resize/)

## To install the latest stable version:

```
pnpm install reactjs-textarea-auto-resize@latest
```

## To run the development server:

```
npm run dev
```

## Props

```
interface TextareaAutoResizeProps extends Omit<TextareaProps, 'style'> {
  maxRows?: number;
  minRows?: number;
  onHeightChange?: (height: number, meta: TextareaHeightChangeMeta) => void;
  cacheMeasurements?: boolean;
  style?: Style;
}
```

### About

<a href="https://www.buymeacoffee.com/hunghg255" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

Gia Hung – [hung.hg](https://hung.thedev.id)
