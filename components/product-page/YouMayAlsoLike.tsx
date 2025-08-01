const RECOMMENDED_PRODUCTS = [
  { name: 'Cola - 10mg', price: '$19.99' },
  { name: 'Creme - 10mg', price: '$19.99' },
  { name: 'Dew - 10mg', price: '$19.99' },
  { name: 'Lemon Lime 10mg', price: '$19.99' }
];

export default function YouMayAlsoLike() {
  return (
    <div>
      <h3 className="text-center text-2xl font-bold mb-8">You May Also Like</h3>
      <div className="grid grid-cols-4 gap-6">
        {RECOMMENDED_PRODUCTS.map((product, index) => (
          <div key={index} className="text-center">
            <div className="bg-gray-100 h-40 rounded-lg mb-3"></div>
            <h4 className="font-medium mb-1">{product.name}</h4>
            <p className="font-bold">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}