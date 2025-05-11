import {useQuery} from "@tanstack/react-query";
import {getStaysTodayActivity} from "../../services/apiBookings.js";

export function useTodayActivity() {
    const {isPending: isLoadingTodayActivity, data: activities} = useQuery({
        queryFn: getStaysTodayActivity,
        queryKey: ['today-activity']
    });
    return {isLoadingTodayActivity, activities};
}