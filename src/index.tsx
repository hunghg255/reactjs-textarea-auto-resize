import * as React from 'react';

import calculateNodeHeight from './calculateNodeHeight';
import getSizingData, { COUNT_RETRY, SizingData } from './getSizingData';
import { useComposedRef, useWindowResizeListener, useFontsLoadedListener, useFormResetListener } from './hooks';
import { noop } from './utils';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type Style = Omit<NonNullable<TextareaProps['style']>, 'maxHeight' | 'minHeight'> & {
  height?: number;
};

export type TextareaHeightChangeMeta = {
  rowHeight: number;
};
export interface TextareaAutoResizeProps extends Omit<TextareaProps, 'style'> {
  maxRows?: number;
  minRows?: number;
  onHeightChange?: (height: number, meta: TextareaHeightChangeMeta) => void;
  cacheMeasurements?: boolean;
  style?: Style;
}

const TextareaAutoResize: React.ForwardRefRenderFunction<HTMLTextAreaElement, TextareaAutoResizeProps> = (
  { cacheMeasurements, maxRows, minRows, onChange = noop, onHeightChange = noop, ...props },
  userRef: React.Ref<HTMLTextAreaElement>
) => {
  const isControlled = props.value !== undefined;
  const libRef = React.useRef<HTMLTextAreaElement | null>(null);
  const ref = useComposedRef(libRef, userRef);
  const heightRef = React.useRef(0);
  const measurementsCacheRef = React.useRef<SizingData>();

  const resizeTextarea = () => {
    const node = libRef.current!;
    const nodeSizingData =
      cacheMeasurements && measurementsCacheRef.current ? measurementsCacheRef.current : getSizingData(node);

    if (!nodeSizingData) {
      return;
    }

    measurementsCacheRef.current = nodeSizingData;

    const [height, rowHeight] = calculateNodeHeight(
      nodeSizingData,
      node.value || node.placeholder || 'x',
      minRows,
      maxRows
    );

    if (heightRef.current !== height) {
      heightRef.current = height;
      node.style.setProperty('height', `${height}px`, 'important');
      onHeightChange(height, { rowHeight });
    }
  };

  const resizeTextareaRetry = () => {
    const interval = setInterval(() => {
      if (COUNT_RETRY.value > 40) {
        clearInterval(interval);
        COUNT_RETRY.value = 0;
        return;
      }
      resizeTextarea();

      COUNT_RETRY.value = COUNT_RETRY.value + 1;
    }, 100);

    return () => {
      clearInterval(interval);
    };
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) {
      resizeTextarea();
    }
    onChange(event);
  };

  React.useLayoutEffect(resizeTextareaRetry);

  React.useEffect(resizeTextarea);

  useFormResetListener(libRef, () => {
    if (!isControlled) {
      const currentValue = libRef.current!.value;
      requestAnimationFrame(() => {
        const node = libRef.current;
        if (node && currentValue !== node.value) {
          resizeTextarea();
        }
      });
    }
  });

  useWindowResizeListener(resizeTextarea);

  useFontsLoadedListener(resizeTextarea);

  return <textarea {...props} onChange={handleChange} ref={ref} />;
};

export default /* #__PURE__ */ React.forwardRef(TextareaAutoResize);
