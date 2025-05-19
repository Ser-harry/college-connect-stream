
// College data types
export interface College {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  stream: string;
  courses: number;
  fees: string;
  feesNumeric: number;
  ranking: string;
  collegeType: string;
  examsAccepted: string[];
  placementRate: number;
}

// Sample colleges data
export const collegeData: College[] = [
  {
    id: 1,
    name: "Stanford University",
    location: "Stanford, CA",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1186&q=80",
    rating: 4.9,
    stream: "Engineering",
    courses: 120,
    fees: "$56,000/year",
    feesNumeric: 56000,
    ranking: "#1 in Engineering",
    collegeType: "Private",
    examsAccepted: ["SAT", "ACT", "GRE"],
    placementRate: 98
  },
  {
    id: 2,
    name: "Harvard Business School",
    location: "Boston, MA",
    image: "https://images.unsplash.com/photo-1591429939960-b7d5add10b5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.8,
    stream: "Management",
    courses: 85,
    fees: "$58,000/year",
    feesNumeric: 58000,
    ranking: "#1 in Management",
    collegeType: "Private",
    examsAccepted: ["GMAT", "GRE"],
    placementRate: 96
  },
  {
    id: 3,
    name: "Johns Hopkins University",
    location: "Baltimore, MD",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.7,
    stream: "Medical",
    courses: 95,
    fees: "$54,000/year",
    feesNumeric: 54000,
    ranking: "#1 in Medicine",
    collegeType: "Private",
    examsAccepted: ["MCAT", "GRE"],
    placementRate: 94
  },
  {
    id: 4,
    name: "Rhode Island School of Design",
    location: "Providence, RI",
    image: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.6,
    stream: "Design",
    courses: 65,
    fees: "$51,000/year",
    feesNumeric: 51000,
    ranking: "#1 in Fine Arts",
    collegeType: "Private",
    examsAccepted: ["Portfolio Review"],
    placementRate: 91
  },
  {
    id: 5,
    name: "MIT",
    location: "Cambridge, MA",
    image: "https://images.unsplash.com/photo-1580931689600-ba5fc1de0720?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
    rating: 4.9,
    stream: "Engineering",
    courses: 130,
    fees: "$57,000/year",
    feesNumeric: 57000,
    ranking: "#2 in Engineering",
    collegeType: "Private",
    examsAccepted: ["SAT", "ACT", "GRE"],
    placementRate: 97
  },
  {
    id: 6,
    name: "Caltech",
    location: "Pasadena, CA",
    image: "https://images.unsplash.com/photo-1557332374-269c5d60a3eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.8,
    stream: "Engineering",
    courses: 110,
    fees: "$52,000/year",
    feesNumeric: 52000,
    ranking: "#3 in Engineering",
    collegeType: "Private",
    examsAccepted: ["SAT", "ACT", "GRE"],
    placementRate: 95
  },
  {
    id: 7,
    name: "University of California, Berkeley",
    location: "Berkeley, CA",
    image: "https://images.unsplash.com/photo-1569447891824-aafc226bf56f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.7,
    stream: "Arts & Science",
    courses: 150,
    fees: "$43,000/year",
    feesNumeric: 43000,
    ranking: "#4 in Arts & Science",
    collegeType: "Public",
    examsAccepted: ["SAT", "ACT"],
    placementRate: 92
  },
  {
    id: 8,
    name: "University of Michigan",
    location: "Ann Arbor, MI",
    image: "https://images.unsplash.com/photo-1605292356935-b08aaa12e59d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.6,
    stream: "Arts & Science",
    courses: 140,
    fees: "$49,000/year",
    feesNumeric: 49000,
    ranking: "#5 in Arts & Science",
    collegeType: "Public",
    examsAccepted: ["SAT", "ACT"],
    placementRate: 90
  },
];
