'use client';
import { ImgHTMLAttributes, useState } from 'react';

interface CompanyLogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
}

export default function CompanyLogo({ src, className = '', alt = '', ...props }: CompanyLogoProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
      {...props}
    />
  );
}
