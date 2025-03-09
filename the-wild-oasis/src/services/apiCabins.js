import supabase from "./supabase.js";

export async function getCabins() {
    const {data, error} = await supabase
        .from('cabins')
        .select('*')
        .range(0, 9);
    if (error) {
        throw new Error('Cabins could not be loaded')
    }
    return data;
}

export async function createEditCabin(cabin, id) {
    const hasImagePath = cabin.image?.startsWith?.(import.meta.env.VITE_API_SUPABASE_URL);
    const imageName = `${Math.random()}-${cabin.image.name.replace("/", "")}`;
    // ${import.meta.env.VITE_API_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}
    const imagePath = hasImagePath ? cabin.image : `${import.meta.env.VITE_API_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;
    let query = await supabase
        .from('cabins');
    if (id) {
        query = query.update({...cabin, image: imagePath}).eq("id", id);
    } else {
        query = query.insert([{...cabin, image: imagePath}])
    }
    const {data, error} = query.select().single();

    if (error) {
        throw new Error('Cabin could not be created');
    }

    if (!hasImagePath) {
        await uploadImage(imageName, data);
    }

    return data;
}

async function uploadImage(imageName, data) {
    const bucketName = "cabin-images";
    const {error} = await supabase
        .storage
        .from(bucketName)
        .upload(imageName, data.image);

    if (error) {
        const {error} = await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id);

        console.error(error);
        throw new Error("Cabin image could not be uploaded and the cabin was not created");
    }
}

export async function deleteCabin(id) {
    const {error} = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);
    if (error) {
        throw new Error('Cabin could not be deleted');
    }

}