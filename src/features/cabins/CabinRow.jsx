/* eslint-disable react/prop-types */

import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

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

function EditCabin({ cabin }) {
  return (
    <Modal>
      <Modal.Open opens="edit-cabin-form">
        <button>
          <HiPencil />
        </button>
      </Modal.Open>
      <Modal.Window name="edit-cabin-form">
        <CreateCabinForm cabinToEdit={cabin} />
      </Modal.Window>
    </Modal>
  );
}

function DeleteCabin({ cabinId, isDeleting, onDeleteCabin }) {
  return (
    <Modal>
      <Modal.Open opens="delete-cabin">
        <button>
          <HiTrash />
        </button>
      </Modal.Open>
      <Modal.Window name="delete-cabin">
        <ConfirmDelete
          resourceName={`Cabin ${cabinId}`}
          disabled={isDeleting}
          onConfirm={() => onDeleteCabin(cabinId)}
        />
      </Modal.Window>
    </Modal>
  );
}

function CabinRow({ cabin }) {
  const { name, maxCapacity, regularPrice, discount, image, id: cabinId } = cabin;

  const { isDeleting, onDeleteCabin } = useDeleteCabin();
  const { isCreating, onCreateCabin } = useCreateCabin();

  function handleDuplicateCabin() {
    const duplicatedCabin = { ...cabin };
    delete duplicatedCabin.id;
    delete duplicatedCabin.created_at;
    duplicatedCabin.name = `Copy of ${cabin.name}`;
    onCreateCabin(duplicatedCabin);
  }

  return (
    <Table.Row role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
      <div>
        <button onClick={handleDuplicateCabin} disabled={isCreating}>
          <HiSquare2Stack />
        </button>
        <EditCabin cabin={cabin} />
        <DeleteCabin cabinId={cabinId} isDeleting={isDeleting} onDeleteCabin={onDeleteCabin} />
      </div>
    </Table.Row>
  );
}

export default CabinRow;
