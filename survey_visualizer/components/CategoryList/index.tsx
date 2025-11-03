export default function Categories({
  setCategory,
  categories,
}: {
  setCategory: (category: string) => void;
  categories: string[];
}) {
  return (
    <div className="bg-slate-500 text-white rounded-4xl py-1 w-full flex flex-col items-center">
      {categories.map((c) => {
        return (
          <div
            className="border-red-100 m-3 text-center hover:text-neutral-900 hover:font-bold hover:cursor-pointer transition-colors w-fit"
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
