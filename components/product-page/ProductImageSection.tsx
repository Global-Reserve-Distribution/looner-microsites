interface ProductImageSectionProps {
  imageUrl?: string;
  productTitle?: string;
}

export default function ProductImageSection({ imageUrl, productTitle }: ProductImageSectionProps) {
  return (
    <div className="text-center">
      <h3 className="text-lg font-medium mb-8">Product</h3>
      <div className="bg-gray-100 h-80 rounded-lg mb-4 flex items-center justify-center">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={productTitle || 'Product'}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="text-gray-400">Product Image</div>
        )}
      </div>
      <div className="text-sm text-gray-500">Image 2</div>
    </div>
  );
}