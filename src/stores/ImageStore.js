import { types as t } from 'mobx-state-tree';

const ImageData = t.model('ImageData', {
  height: t.number,
  name: t.string,
  url: t.string,
  width: t.number,
});

const ImageVariants = t.model('ImageVariants', {
  default: t.maybe(ImageData),
});

export const Image = t.model('Image', {
  id: t.identifier,
  variants: t.maybe(ImageVariants),
});
