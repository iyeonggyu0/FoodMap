import { useMediaQuery } from "react-responsive";

export const useMedia = () => {
  const isPc = useMediaQuery({
    query: "(min-width:1025px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1024px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  return { isPc, isTablet, isMobile };
};

//  const media = useMedia();
//  media.isPc
//  media.isTablet
//  media.isMobile
