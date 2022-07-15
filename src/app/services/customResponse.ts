import {userProps} from "../interfaces";

export const customUserResponse = (data: userProps) => {
    return {
        id: data.id,
        email: data.email,
        image: data.image,
        username: data.username,
        createdAt: data.createdAt,
    }
}
