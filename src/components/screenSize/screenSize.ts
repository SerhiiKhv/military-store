import {useMediaQuery} from "@react-hook/media-query";

const isSmallScreen = useMediaQuery('(max-width: 640px)');
const isMediumScreen = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
const isLargeScreen = useMediaQuery('(min-width: 1025px)');

