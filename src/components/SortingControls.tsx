import { useJobItemsContext } from "../contexts/JobItemsContextProvider";

export default function SortingControls() {
  const { sortBy, handleChangeSortBy } = useJobItemsContext();
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        onClick={() => handleChangeSortBy("relevant")}
        isActive={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>
      <SortingButton
        onClick={() => handleChangeSortBy("recent")}
        isActive={sortBy === "recent"}
      >
        Recent
      </SortingButton>
    </section>
  );
}
type SortingButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  isActive: boolean;
};
function SortingButton({ onClick, children, isActive }: SortingButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--relevant ${
        isActive && "sorting__button--active"
      }`}
    >
      {children}
    </button>
  );
}
