import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";
import SortBy from "../../ui/SortBy.jsx";

function CabinTableOperations() {
    return (
        <TableOperations>
            <Filter filterField="discount" options={[
                {
                    value: 'all',
                    label: 'All',
                },
                {
                    value: 'with-discount',
                    label: 'With discount',
                },
                {
                    value: 'no-discount',
                    label: 'No discount',
                }
            ]} />
            <SortBy options={[
                {
                    value: 'name-asc',
                    label: 'Sort by name (A-Z)',
                },
                {
                    value: 'name-desc',
                    label: 'Sort by name (Z-A)',
                },
                {
                    value: 'regularPrice-asc',
                    label: 'Sort by price (low to high)',
                },
                {
                    value: 'regularPrice-desc',
                    label: 'Sort by price (high to low)',
                },
                {
                    value: 'maxCapacity-asc',
                    label: 'Sort by capacity (low to high)',
                },
                {
                    value: 'maxCapacity-desc',
                    label: 'Sort by price (high to low)',
                }
            ]} />
        </TableOperations>
    );
}

export default CabinTableOperations;