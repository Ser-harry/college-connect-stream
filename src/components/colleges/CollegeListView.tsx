
import CollegeCard from "./CollegeCard";
import CollegeListItem from "./CollegeListItem";
import AdPlaceholder from "./AdPlaceholder";
import { College } from "@/data/collegeData";

interface CollegeListViewProps {
  collegesWithAds: (College | { isAd: true; id: string })[];
  viewMode: "grid" | "list";
}

const CollegeListView = ({ collegesWithAds, viewMode }: CollegeListViewProps) => {
  if (collegesWithAds.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium text-gray-900 mb-2">No colleges found</h3>
        <p className="text-gray-600">Try adjusting your search or filters</p>
      </div>
    );
  }

  return viewMode === "grid" ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {collegesWithAds.map((item) => (
        'isAd' in item ? (
          <AdPlaceholder key={item.id} id={item.id} viewMode="grid" />
        ) : (
          <CollegeCard key={item.id} college={item} />
        )
      ))}
    </div>
  ) : (
    <div className="space-y-4">
      {collegesWithAds.map((item) => (
        'isAd' in item ? (
          <AdPlaceholder key={item.id} id={item.id} viewMode="list" />
        ) : (
          <CollegeListItem key={item.id} college={item} />
        )
      ))}
    </div>
  );
};

export default CollegeListView;
