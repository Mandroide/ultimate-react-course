import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from "react-hook-form";
import FormRow from "../../ui/FormRow.jsx";
import {useCreateCabin} from "./useCreateCabin.js";
import {useUpdateCabin} from "./useUpdateCabin.js";
import useModal from "../../hooks/useModal.js";

function CreateCabinForm({cabinToEdit = {}}) {
    const {id: editId, ...editValues} = cabinToEdit;
    const isEditSession = Boolean(editId);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        defaultValue: isEditSession ? editValues : {},
    });
    const {createCabin, isCreating} = useCreateCabin();
    const {updateCabin, isUpdating} = useUpdateCabin();
    const { closeModal: onCloseModal } = useModal() || false;

    const isWorking = isCreating || isUpdating;

    function onSubmit(data) {
        const image = typeof data.image === "string" ? data.image : data.image[0];
        if (isEditSession) {
            updateCabin({cabin: {...data, image}, id: editId}, {
                onSuccess: () => {
                    reset();
                    onCloseModal?.();
                }
            });
        } else {
            createCabin({...data, image}, {
                onSuccess: () => {
                    reset();
                    onCloseModal?.();
                }
            });
        }

    }

    function onError() {
        // Only necessary if logging for monitoring services like Sentry
        // console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input type="text" id="name" disabled={isWorking} {...register('name', {
                    required: "This field is required"
                })} />
            </FormRow>

            <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
                <Input type="number" id="maxCapacity" disabled={isWorking} {...register('maxCapacity', {
                    required: 'This field is required',
                    valueAsNumber: true,
                    min: {
                        value: 1,
                        message: 'Maximum capacity must be greater than 0'
                    }
                })} />
            </FormRow>

            <FormRow label="Regular price" error={errors?.regularPrice?.message}>
                <Input type="number" id="regularPrice" disabled={isWorking} {...register('regularPrice', {
                    required: 'This field is required',
                    valueAsNumber: true,
                    min: {
                        value: 1,
                        message: 'Regular price must be greater than 0'
                    }
                })} />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input type="number" id="discount" disabled={isWorking} defaultValue={0} {...register('discount', {
                    required: 'This field is required',
                    valueAsNumber: true,
                    validate: (value, fieldValues) => value <= fieldValues.regularPrice || "Discount must be greater than regular price",
                })} />
            </FormRow>

            <FormRow label="Description for website" error={errors?.description?.message}>
                <Textarea type="number" id="description" disabled={isWorking}
                          defaultValue="" {...register('description', {
                    required: 'This field is required'
                })} />
            </FormRow>

            <FormRow label="Cabin photo" error={errors?.image?.message}>
                <FileInput id="image" disabled={isWorking} accept="image/*" {...register('image', {
                    required: isEditSession ? false : 'This field is required'
                })} />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset" disabled={isWorking} onClick={() => onCloseModal?.()}>
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "Create new cabin"}</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
