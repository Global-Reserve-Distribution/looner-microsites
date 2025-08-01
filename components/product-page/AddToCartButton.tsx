interface AddToCartButtonProps {
  price?: number;
  onClick?: () => void;
}

export default function AddToCartButton({ price = 20, onClick }: AddToCartButtonProps) {
  return (
    <div className="text-center">
      <button 
        onClick={onClick}
        className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        Add to Cart - ${price}
      </button>
    </div>
  );
}