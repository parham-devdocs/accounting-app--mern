import { useState, useEffect } from "react";

const useWindowResize = () => {
  const [collapseSideBar, setCollapseSideBar] = useState(
    window.innerWidth < 900
  );

  useEffect(() => {
    const handleResize = () => {
      setCollapseSideBar(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return [collapseSideBar];
};

export default useWindowResize;
