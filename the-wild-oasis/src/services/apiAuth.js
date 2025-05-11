import supabase from "./supabase.js";


export async function signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({email, password, options: {
        data: {fullName, avatar: ''}
        }});
    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function login({ email, password}) {
    const { data, error } = await supabase.auth.signInWithPassword({email, password});

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getCurrentUser() {
    const {data: session} = await supabase.auth.getSession();
    let result = null;
    if (session) {
        const {data, error} = await supabase.auth.getUser();
        if (error) {
            throw new Error(error.message);
        }
        result = data?.user;
    }
    return result;
}

export async function logout() {
    const {error} = await supabase.auth.signOut();
    if (error) {
        throw new Error(error.message);
    }
}

export async function updateCurrentUser({password, email, fullName, avatar}) {
    // 1. Update password OR fullName
    let updateData;
    if (password) {
        updateData = {password};
    }
    if (fullName) {
        updateData = {data: fullName};
    }
    const {data, error} = await supabase.auth.updateUser(updateData);

    if (error) {
        throw new Error(error.message);
    }

    if (!avatar) return data;
    // 2. Upload avatar image
    const fileName = `avatar-${avatar.user.id}-${Math.random()}`;

    const {error: uploadError} = await supabase.storage.from('avatars').upload(fileName, avatar);

    if (uploadError) {
        throw new Error(uploadError.message);
    }
    // 3. Update avatar in the user
    const {data: updatedUser, error: error2} = await supabase.auth.updateUser({data: {avatar: `${import.meta.env.VITE_API_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`}});

    if (error2) {
        throw new Error(error2.message);
    }

    return updatedUser;
}

export async function resetPassword(email) {
    const {error} = await supabase.auth.api.resetPasswordForEmail(email);
    if (error) {
        throw new Error(error.message);
    }
}