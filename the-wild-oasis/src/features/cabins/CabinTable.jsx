import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow.jsx";
import {useCabins} from "./useCabins.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import {useSearchParams} from "react-router";
import Empty from "../../ui/Empty.jsx";


function CabinTable() {
    const {isPending, cabins} = useCabins();
    const [searchParams] = useSearchParams();

    if (isPending) {
        return <Spinner/>;
    }

    if (!cabins.length) {
        return <Empty resourceName="cabins"/>;
    }

    // 1) FILTER
    const filterValue = searchParams.get("discount");

    let filteredCabins;

    if (filterValue === "no-discount") {
        filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
    } else if (filterValue === "with-discount") {
        filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
    } else {
        filteredCabins = cabins;
    }

    // 2) SORT
    const sortBy = searchParams.get("sortBy") || "startDate-asc";
    const [field, direction] = sortBy.split("-");
    const modifier = direction === "asc" ? 1 : -1;
    const sortedCabins = filteredCabins.sort((a, b) => modifier * (a[field] - b[field]));

    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header role="row">
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>
                <Table.Body>
                    {sortedCabins.map((cabin) => (
                        <CabinRow key={cabin.id} cabin={cabin}/>
                    ))}
                </Table.Body>
            </Table>
        </Menus>
    );
}

export default CabinTable;