
interface AdPlaceholderProps {
  id: string;
  viewMode: "grid" | "list";
}

const AdPlaceholder = ({ id, viewMode }: AdPlaceholderProps) => {
  return viewMode === "grid" ? (
    <div key={id} className="col-span-1 md:col-span-2 lg:col-span-3 p-4 bg-gray-100 rounded-lg text-center">
      <div className="h-20 flex items-center justify-center">
        <span className="text-gray-500">Advertisement</span>
      </div>
    </div>
  ) : (
    <div key={id} className="p-4 bg-gray-100 rounded-lg text-center">
      <div className="h-20 flex items-center justify-center">
        <span className="text-gray-500">Advertisement</span>
      </div>
    </div>
  );
};

export default AdPlaceholder;
