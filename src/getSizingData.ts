import { pick } from './utils';

const SIZING_STYLE = [
  'borderBottomWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'boxSizing',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'letterSpacing',
  'lineHeight',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  // non-standard
  'tabSize',
  'textIndent',
  // non-standard
  'textRendering',
  'textTransform',
  'width',
  'wordBreak',
  'wordSpacing',
  'scrollbarGutter',
] as const;

type SizingProps = Extract<(typeof SIZING_STYLE)[number], keyof CSSStyleDeclaration>;

type SizingStyle = Pick<CSSStyleDeclaration, SizingProps>;

export type SizingData = {
  sizingStyle: SizingStyle;
  paddingSize: number;
  borderSize: number;
};

const isIE =
  typeof document !== 'undefined'
    ? !!(document.documentElement as HTMLElement & { currentStyle: CSSStyleDeclaration }).currentStyle
    : false;

export const COUNT_RETRY = {
  value: 0,
};

const getSizingData = (node: HTMLElement): SizingData | null => {
  if (!node) {
    return null;
  }

  const style = window.getComputedStyle(node);

  if (style === null) {
    return null;
  }

  const sizingStyle = pick(SIZING_STYLE as unknown as SizingProps[], style as unknown as Record<string, unknown>);
  const { boxSizing } = sizingStyle;

  // probably node is detached from DOM, can't read computed dimensions
  if (boxSizing === '') {
    return null;
  }

  // IE (Edge has already correct behaviour) returns content width as computed width
  // so we need to add manually padding and border widths
  if (isIE && boxSizing === 'border-box') {
    sizingStyle.width =
      parseFloat(sizingStyle.width as string) +
      parseFloat(sizingStyle.borderRightWidth as string) +
      parseFloat(sizingStyle.borderLeftWidth as string) +
      parseFloat(sizingStyle.paddingRight as string) +
      parseFloat(sizingStyle.paddingLeft as string) +
      'px';
  }

  const paddingSize = parseFloat(sizingStyle.paddingBottom as string) + parseFloat(sizingStyle.paddingTop as string);

  const borderSize =
    parseFloat(sizingStyle.borderBottomWidth as string) + parseFloat(sizingStyle.borderTopWidth as string);

  return {
    sizingStyle: sizingStyle as SizingStyle,
    paddingSize,
    borderSize,
  };
};

export default getSizingData;
