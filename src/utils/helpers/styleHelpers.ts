export const hexToRgb: (hex: string, opacity?: number) => string = (hex, opacity) => {
  const formattedArr = hex
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1)
    .match(/.{2}/g)
    ?.map(x => parseInt(x, 16));

  formattedArr?.push(!!opacity || opacity === 0 ? opacity : 1);

  return `rgba(${formattedArr?.join(', ')})`;
};
