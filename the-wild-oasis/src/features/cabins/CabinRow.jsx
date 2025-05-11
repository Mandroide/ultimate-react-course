import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers.js";
import CreateCabinForm from "./CreateCabinForm.jsx";
import {useDeleteCabin} from "./useDeleteCabin.js";
import {HiPencil, HiSquare2Stack, HiTrash} from "react-icons/hi2";
import {useCreateCabin} from "./useCreateCabin.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";

// const TableRow = styled.div`
//     display: grid;
//     grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//     column-gap: 2.4rem;
//     align-items: center;
//     padding: 1.4rem 2.4rem;
//
//     &:not(:last-child) {
//         border-bottom: 1px solid var(--color-grey-100);
//     }
// `;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;


function CabinRow({cabin}) {
    const {createCabin, isCreating} = useCreateCabin();
    const {isDeleting, deleteCabin} = useDeleteCabin();
    const {id, name, maxCapacity, regularPrice, description, discount, image} = cabin;

    function handleDuplicate() {
        createCabin({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            image,
            description
        })
    }

    return (
        <Table.Row>
            <Img src={image} alt="cabin image"/>
            <Cabin>{name}</Cabin>
            <div>Fits up to {maxCapacity} guests</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            {discount ? <Discount>{formatCurrency(discount)}</Discount>
                : <span>&mdash;</span>}
            <div>
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={id}/>
                        <Menus.List id={id}>
                            <Modal.Open icon={<HiPencil/>}>Edit</Modal.Open>
                            <Modal.Open icon={<HiSquare2Stack/>} onClick={handleDuplicate}>Duplicate</Modal.Open>
                            <Modal.Open icon={<HiTrash/>} onClick={() => deleteCabin(id)}>Delete</Modal.Open>
                        </Menus.List>
                    </Menus.Menu>
                    <Modal.Open icon={<HiPencil/>}>Edit</Modal.Open>
                    <Modal.Window>
                        <CreateCabinForm cabinToEdit={cabin}/>
                    </Modal.Window>
                </Modal>
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={id}/>
                        <Menus.List id={id}>
                            <Modal.Open icon={<HiPencil/>}>Edit</Modal.Open>
                            <Modal.Open icon={<HiSquare2Stack/>} onClick={handleDuplicate}>Duplicate</Modal.Open>
                            <Modal.Open icon={<HiTrash/>} onClick={() => deleteCabin(id)}>Delete</Modal.Open>
                        </Menus.List>
                    </Menus.Menu>
                    <Modal.Open icon={<HiPencil/>}>Edit</Modal.Open>
                    <Modal.Window>
                        <CreateCabinForm cabinToEdit={cabin}/>
                    </Modal.Window>
                </Modal>
                <Modal>
                    <Modal.Open><HiTrash/></Modal.Open>
                    <Modal.Window>
                        <ConfirmDelete resourceName="cabins" disabled={isDeleting} onConfirm={() => deleteCabin(id)}/>
                    </Modal.Window>
                </Modal>
            </div>
        </Table.Row>
    );
}

export default CabinRow;