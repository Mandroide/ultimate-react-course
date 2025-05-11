import Button from "../../ui/Button.jsx";
import Modal from "../../ui/Modal.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";
import CabinTable from "./CabinTable.jsx";

// function AddCabin() {
//     const [isOpenModal, setIsOpenModal] = useState(false);
//     return (
//         <div>
//             <Button
//                 type="button"
//                 onClick={() => setIsOpenModal(prevState => !prevState)}>{isOpenModal ? "Hide new cabin" : "Add new cabin"}</Button>
//             {isOpenModal && (<Modal onClose={() => setIsOpenModal(false)}>
//                 <CreateCabinForm onCloseModal={() => setIsOpenModal(false)}/>
//             </Modal>)}
//         </div>
//     );
// }

function AddCabin() {
    return (
        <div>
            <Modal>
                <Modal.Open>Add new cabin</Modal.Open>
                <Modal.Window>
                    <CreateCabinForm/>
                </Modal.Window>
            </Modal>
        </div>
    );
}

export default AddCabin;