import { SyntheticEvent } from "react";

interface SearchBarProps {
  searchTask: string;
  setSearchTask: (value: string) => void;
  handleSearch: (e: SyntheticEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTask,
  setSearchTask,
  handleSearch,
}) => {
  return (
    <div className="flex flex-col mx-auto py-8 items-center">
      <div className="flex items-center">
        <form
          className="flex border-gray-300 shadow-lg rounded-l-lg overflow-hidden h-full"
          onSubmit={(e) => handleSearch(e)}
        >
          <input
            type="search"
            className="p-4 text-sm bg-gray-50 outline-none box-border w-80"
            placeholder="Search tasks"
            value={searchTask}
            onChange={(e) => setSearchTask(e.target.value)}
          />
          <div className="h-full items-stretch">
            <button
              type="submit"
              className="flex h-full p-5 text-sm bg-blue-500 shadow-lg rounded-r-lg overflow-hidden"
            >
              <svg
                className="w-4 h-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
