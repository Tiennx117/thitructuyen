// ImageWithFallback.tsx
import { ImgHTMLAttributes, useState, useEffect } from 'react';
import { Image as ImagePrime, ImageProps } from 'primereact/image';
interface Props extends ImgHTMLAttributes<any> {
  fallback: string;
}
interface PropsImagePrime extends ImageProps {
  fallback: string;
}

function Image({ fallback, src, ...props }: Props) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src)
  const onError = () => setImgSrc(fallback)
  useEffect(() => {
    setImgSrc(src);
  }, [src])
  return (<img src={imgSrc ? imgSrc : fallback} onError={onError} {...props} />)
}


function ImagePreview({ fallback, src, ...props }: PropsImagePrime) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src)
  useEffect(() => {
    setImgSrc(src);
  }, [src])
  const onError = () => setImgSrc(fallback)
  return (<ImagePrime src={imgSrc ? imgSrc : fallback} zoomSrc={imgSrc ? imgSrc : fallback} onError={onError} {...props} />)
}

function ImageNotifyDef({ fallback, src, ...props }: Props) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src)
  const onError = () => setImgSrc(fallback)
  useEffect(() => {
    setImgSrc(src);
  }, [src])
  return (<img src={imgSrc ? imgSrc : fallback} onError={onError} {...props} />)
}

Image.defaultProps = {
  fallback: '/images/no-image.jpg'
};
ImagePreview.defaultProps = {
  fallback: '/images/no-image.jpg'
};
ImageNotifyDef.defaultProps = {
  fallback: '/images/notice-icon.png'
};
export { Image as default, Image, ImagePreview, ImageNotifyDef };