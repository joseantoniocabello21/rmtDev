import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useSearchQuery } from "../lib/hooks";
import { JobItem, PageDirection, SortBy } from "../lib/types";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { useSearchTextContext } from "./SearchTextContextProvider";

type JobItemsContextProps = {
  jobItems: JobItem[] | undefined;
  isLoading: boolean;
  totalNumberOfResults: number;
  totalNumberOfPages: number;
  jobItemsSliced: JobItem[];
  currentPage: number;
  sortBy: SortBy;
  handleChangePage: (direction: PageDirection) => void;
  handleChangeSortBy: (newSortBy: SortBy) => void;
};

const JobItemsContext = createContext<JobItemsContextProps | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //CONTEXT DEPENDENCY
  const { debouncedSearchText } = useSearchTextContext();
  //STATES
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  //DERIVED STATE
  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = Math.ceil(totalNumberOfResults / RESULTS_PER_PAGE);

  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [jobItems, sortBy]
  );

  //calculate the start and end index of the job items to be displayed
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const endIndex = startIndex + RESULTS_PER_PAGE;
  const jobItemsSliced = useMemo(
    () => jobItemsSorted.slice(startIndex, endIndex),
    [jobItemsSorted, startIndex, endIndex]
  );

  //HANDLERS / ACTIONS

  const handleChangePage = useCallback((direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);

  const handleChangeSortBy = useCallback((newSortBy: SortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  }, []);

  const contextValue = useMemo(
    () => ({
      jobItems,
      isLoading,
      totalNumberOfResults,
      totalNumberOfPages,
      jobItemsSliced,
      currentPage,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    }),
    [
      jobItems,
      isLoading,
      totalNumberOfResults,
      totalNumberOfPages,
      jobItemsSliced,
      currentPage,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    ]
  );
  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}

export function useJobItemsContext() {
  const context = useContext(JobItemsContext);
  if (!context) {
    throw new Error(
      "useJobItemsContext must be used within a JobItemsContextProvider"
    );
  }
  return context;
}
