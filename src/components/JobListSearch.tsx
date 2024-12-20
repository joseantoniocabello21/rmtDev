import { useJobItemsContext } from "../contexts/JobItemsContextProvider";
import JobList from "./JobList";

export default function JobListSearch() {
  const { jobItemsSliced, isLoading } = useJobItemsContext();
  return <JobList jobItems={jobItemsSliced} isLoading={isLoading} />;
}
