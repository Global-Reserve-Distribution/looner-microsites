export default function NutritionFacts() {
  return (
    <div className="bg-white border-2 border-black p-6 rounded">
      <h3 className="font-bold text-lg mb-4 border-b-2 border-black pb-2">
        Nutrition Facts
      </h3>
      <div className="text-sm space-y-1">
        <div>1 Servings Per Container</div>
        <div className="flex justify-between">
          <span>Serving Size</span>
          <span>12 fl oz (355mL)</span>
        </div>
        <div className="border-b-4 border-black py-2 my-3">
          <div className="font-bold">Amount Per Serving</div>
        </div>
        <div className="font-bold text-lg">Calories 90</div>
        <div className="flex justify-between">
          <span>Total Fat 0g</span>
          <span className="font-bold">0%</span>
        </div>
        <div className="flex justify-between">
          <span>Sodium 10mg</span>
          <span className="font-bold">1%</span>
        </div>
        <div className="flex justify-between">
          <span>Total Carbohydrate 24g</span>
          <span className="font-bold">9%</span>
        </div>
        <div className="flex justify-between pl-4">
          <span>Dietary Fiber 0g</span>
          <span className="font-bold">0%</span>
        </div>
        <div className="flex justify-between pl-4">
          <span>Total Sugars 23g</span>
          <span className="font-bold">46%</span>
        </div>
        <div className="flex justify-between pl-8">
          <span>Includes 23g Added Sugars</span>
          <span className="font-bold">46%</span>
        </div>
        <div className="flex justify-between">
          <span>Protein 0g</span>
          <span className="font-bold">0%</span>
        </div>
      </div>
    </div>
  );
}