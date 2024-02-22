// useSSMLData.ts
import { useEffect, useState } from "react";
import { fetchSSMLFromAPI } from "../api/api";
import { ApiResponse } from "../api/types";
import { parseAllText } from "../api/utils";

const useSSMLData = () => {
    const [ssmlData, setSSMLData] = useState<string[] | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<Error | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1)

    useEffect(() => {
        setIsLoading(true);
        fetchSSMLFromAPI(currentPage, 1)
            .then((data: ApiResponse) => {
                setSSMLData(parseAllText(data.content));
                setHasMore(data.hasMore);
				setCurrentPage(data.page)
            })
            .catch((error: Error) => setIsError(error))
            .finally(() => setIsLoading(false));
    }, []);

	const loadMore = () => {
		if(hasMore) {
			fetchSSMLFromAPI(currentPage+1, 1)
			.then((data: ApiResponse) => {
                const newData = parseAllText(data.content);
                setSSMLData((prevData: any) => [...prevData, ...newData]);
                setHasMore(data.hasMore);
                setCurrentPage(data.page);
            })
            .catch((error: Error) => setIsError(error))
		}
	}

    return {
        isError,
        isLoading,
        hasMore,
        ssmlData,
		loadMore
    };
};

export default useSSMLData;
