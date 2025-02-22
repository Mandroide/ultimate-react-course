import {useState} from "react";
import {useDispatch} from "react-redux";
import {createCustomer} from "./customerSlice.js";

function Customer() {
    const [fullName, setFullName] = useState("");
    const [nationalId, setNationalId] = useState("");
    const dispatch = useDispatch();

    function handleClick() {
        if (fullName && nationalId) {
            dispatch(createCustomer(fullName, nationalId));
        }
    }

    return (
        <div>
            <h2>Create new customer</h2>
            <form className="inputs" onSubmit={(e) => {
                e.preventDefault();
                handleClick();
            }}>
                <div>
                    <label>Customer full name</label>
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div>
                    <label>National ID</label>
                    <input
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                    />
                </div>
                <button>Create new customer</button>
            </form>
        </div>
    );
}

export default Customer;
