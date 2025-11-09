import React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Composant d'image optimisée qui utilise WebP avec fallback automatique
 * Remplace automatiquement .jpg, .jpeg, .png par .webp si disponible
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className,
  ...props 
}) => {
  // Générer le chemin WebP
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  // Générer le chemin de fallback (original)
  const fallbackSrc = src;

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img 
        src={fallbackSrc} 
        alt={alt} 
        className={className}
        loading="lazy"
        {...props}
      />
    </picture>
  );
};

export default OptimizedImage;

