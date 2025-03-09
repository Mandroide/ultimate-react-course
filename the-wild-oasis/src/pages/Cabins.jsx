import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable.jsx";
import Button from "../ui/Button.jsx";
import {useState} from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm.jsx";

function Cabins() {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <p>Filters / Sort</p>
            </Row>
            <Row>
                <CabinTable/>
                <Button
                    type="button"
                    onClick={() => setShowForm(prevState => !prevState)}>{showForm ? "Hide new cabin" : "Add new cabin"}</Button>
                {showForm && <CreateCabinForm/>}
            </Row>
        </>
    );
}

export default Cabins;
