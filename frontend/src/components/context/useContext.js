import { createContext, useState } from "react";
import { useDispatch } from "react-redux";

export const ProjectFilterContext = createContext(null);

export const ProjectFilterProvider = (props)=>{
    const [reqString, setReqString] = useState("");
    const [tags, setTags] = useState("");
    const [selectedDomains, setSelectedDomains] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const dispatch = useDispatch();
  

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
  
    return (
        <>
        <ProjectFilterContext.Provider value = {{reqString, setReqString ,tags, setTags ,selectedDomains, setSelectedDomains ,selectedLanguages, setSelectedLanguages ,handleChangeTags ,handleSearchProject ,languagesCat,domains}}>
         {props.children}
        </ProjectFilterContext.Provider>
        </>
    )
}