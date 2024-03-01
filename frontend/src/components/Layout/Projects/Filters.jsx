import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProjects } from "../../../Redux/Actions/ProjectAction";

const Filters = () => {
  const [reqString, setReqString] = useState("");
  const [tags, setTags] = useState("");
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const dispatch = useDispatch();

  const handleChangeTags = (e) => {
    const newTags = e.target.value;
    setTags(newTags);

    if (newTags) {
      const filterStr = `tags=${newTags}&`;
      setReqString((prevString) => {
        const filters = prevString
          .split("&")
          .filter((fil) => !fil.startsWith("tags="));
        return filters.join("&") + filterStr;
      });
    } else {
      setReqString((prevString) => prevString.replace("tags=", ""));
    }
  };

  const handleSearchProject = (filterValue, filterName, checked) => {
    //add filter to string if user checks the string
    if (checked) {
      const filterStr = `${filterName}=${filterValue}&`;
      setReqString((prevString) => prevString + filterStr);
      if (filterName === "domain") {
        setSelectedDomains((prevDomains) => [...prevDomains, filterValue]);
      } else if (filterName === "languages") {
        setSelectedLanguages((prevLanguages) => [...prevLanguages, filterValue]);
      }
    } else {
      const filterStr = `${filterName}=${filterValue}`;
      setReqString((prevString) => {
        const filters = prevString
          .split("&")
          .filter((fil) => !fil.startsWith(filterStr));
        return filters.join("&");
      });
      if (filterName === "domain") {
        setSelectedDomains((prevDomains) =>
          prevDomains.filter((domain) => domain !== filterValue)
        );
      } else if (filterName === "languages") {
        setSelectedLanguages((prevLanguages) =>
          prevLanguages.filter((language) => language !== filterValue)
        );
      }
    }
  };

  const clearAllFilters = () => {
    setReqString("");
    setTags("");
    setSelectedDomains([]);
    setSelectedLanguages([]);
  };

  useEffect(() => {
    dispatch(getAllProjects(reqString));
  }, [reqString]);

  const domains = [
    "Artificial Intelligence",
    "Web Development",
    "Android Development",
    "IOT",
    "Machine Learning",
    "Network Security",
    "Cloud Computing",
    "Blockchain",
  ];
  const languagesCat = [
    "Python",
    "c++",
    "java",
    "React",
    "Flutter",
    "Next Js",
    "React Native",
  ];

  return (
    <>
      <div className="mb-2">
        <button onClick={clearAllFilters} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 mx-[2.4rem] mb-3 border border-blue-500 hover:border-transparent rounded">
          Clear All Filters
        </button>
        <div className="mb-8">
          <label className="block text-xl text-color7 font-nunito font-semibold mb-2" htmlFor="tag">
            Tags
          </label>
          <input
            value={tags}
            onChange={handleChangeTags}
            type="text"
            id="tag"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-8">
          <div className="overflow-y-auto max-h-40 scrollbar-track-gray-200 scrollbar-thumb-indigo-500">
            <div className="scrollbar-line-indigo-500"></div>
            {domains.map((domain) => (
              <label className="flex items-center mb-2" key={domain}>
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={selectedDomains.includes(domain)}
                  onClick={(e) => handleSearchProject(domain, "domain", e.target.checked)}
                />
                <span className="ml-2 text-sm font-semibold text-black">{domain}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4 mt-4">
          <label className="block text-xl text-color7 font-nunito font-bold mb-2" htmlFor="language">
            Languages
          </label>
          <input
            type="text"
            id="language"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <div className="overflow-y-auto max-h-40 scrollbar-track-gray-200 scrollbar-thumb-indigo-500">
            <div className="scrollbar-line-indigo-500"></div>
            {languagesCat.map((language) => (
              <label className="flex items-center mb-2" key={language}>
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={selectedLanguages.includes(language)}
                  onClick={(e) => handleSearchProject(language, "languages", e.target.checked)}
                />
                <span className="ml-2 text-sm font-semibold text-black">{language}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
