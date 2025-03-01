import { IoSearchSharp } from "react-icons/io5";
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

        {/* <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg> */}
        <FcSearch className="w-8 h-8" />
      </label>

      {/* <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button> */}
    </>
  );
};

export default SearchInput;

// const FilteredConversation = () => {
//   const dispatch = useDispatch();
//   const { conversations } = useSelector((state) => state.conversations);
//   const [filteredConversations, setFilteredConversations] = useState([]);

//   // filter conversation by name or keyword
//   const handleFilterConversations = (e) => {
//     const filtered = conversations.filter((conversation) => {
//       return conversation.name.toLowerCase().includes(input.toLowerCase());
//     });
//     setFilteredConversations(filtered);
//   };

//   useEffect(() => {
//     handleFilterConversations();
//   }, [input]);
// };
