export type JobItem = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  date: string;
  relevanceScore: number;
  daysAgo: number;
};

export type JobItemExpanded = JobItem & {
  location: string;
  salary: string;
  duration: string;
  qualifications: string[];
  description: string;
  reviews: string[];
  companyURL: string;
  coverImgURL: string;
};

export type SortBy = "relevant" | "recent";
export type PageDirection = "next" | "previous";
