import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow.jsx";

function CreateCabinForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();
    const queryClient = useQueryClient();
    const {mutate, isPending: isCreating} = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
            toast.success("Cabin creation successfully!");
            queryClient.invalidateQueries({
                queryKey: ["cabins"]
            });
            reset();
        },
        onError: error => {
            toast.error(error.message);
        }
    });

    function onSubmit(data) {
        mutate({...data, image: data.image[0]});
    }

    function onError() {
        // Only necessary if logging for monitoring services like Sentry
        // console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input type="text" id="name" disabled={isCreating} {...register('name', {
                    required: "This field is required"
                })} />
            </FormRow>

            <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
                <Input type="number" id="maxCapacity" disabled={isCreating} {...register('maxCapacity', {
                    required: 'This field is required',
                    valueAsNumber: true,
                    min: {
                        value: 1,
                        message: 'Maximum capacity must be greater than 0'
                    }
                })} />
            </FormRow>

            <FormRow label="Regular price" error={errors?.regularPrice?.message}>
                <Input type="number" id="regularPrice" disabled={isCreating} {...register('regularPrice', {
                    required: 'This field is required',
                    valueAsNumber: true,
                    min: {
                        value: 1,
                        message: 'Regular price must be greater than 0'
                    }
                })} />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input type="number" id="discount" disabled={isCreating} defaultValue={0} {...register('discount', {
                    required: 'This field is required',
                    valueAsNumber: true,
                    validate: (value, fieldValues) => value <= fieldValues.regularPrice || "Discount must be greater than regular price",
                })} />
            </FormRow>

            <FormRow label="Description for website" error={errors?.description?.message}>
                <Textarea type="number" id="description" disabled={isCreating} defaultValue="" {...register('description', {
                    required: 'This field is required'
                })} />
            </FormRow>

            <FormRow label="Cabin photo" error={errors?.image?.message}>
                <FileInput id="image" disabled={isCreating} accept="image/*" {...register('image')} />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset" disabled={isCreating}>
                    Cancel
                </Button>
                <Button disabled={isCreating}>Edit cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
