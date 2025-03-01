import { FcSearch } from "react-icons/fc";

const SearchInput = ({ input, setInput }) => {
  return (
    <>
      <label className="input flex justify-between items-center ">
        <input
          type="search"
          className="grow"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <FcSearch className="w-8 h-8" />
      </label>
    </>
  );
};

export default SearchInput;
