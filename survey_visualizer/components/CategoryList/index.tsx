export default function Categories({
  setCategory,
  categories,
}: {
  setCategory: (category: string) => void;
  categories: string[];
}) {
  
  return (
    <div className="bg-cyan-500 text-white rounded-4xl w-full sm:grid sm:grid-cols-2 sm:items-center sm:justify-items-center flex flex-col items-center h-[400px] overflow-auto">
      {categories.map((c) => {
        return (
          <div
            className="border-red-100 m-1 text-center hover:text-neutral-950 hover:font-bold hover:cursor-pointer transition-colors w-fit"
            key={c}
            onClick={() => setCategory(c)}
          >
            {c}
          </div>
        );
      })}
    </div>
  );
}
