import {blogData, categoryProps, userProps} from "../interfaces";
import categoryServices from "./categoryServices";
import userServices from "./userServices";

export const customUserResponse = (data: userProps) => {
    return {
        id: data.id,
        email: data.email,
        image: data.image,
        username: data.username,
        createdAt: data.createdAt,
    }
}

export const blogListing = async (blogs: blogData[]) => {
    let data: object = {};
    let results: any = [];
    if (blogs.length > 0) {
        for (const blog of blogs) {
            data = await customBlogResponse(blog);
            results = [...results, data];
        }
    }
   return results;
}

export const customBlogResponse = async (data: blogData) => {
    return {
        id: data.id,
        title: data.title,
        content: data.content,
        image: data.image,
        category: _getCategory(data.categoryId),
        author: await _getAuthor(data.author),
    }
}

export const _getAuthor = async (authorId: string) => {
    const user: userProps = await userServices.findByUserId(authorId);
    return customUserResponse(user);
}

export const _getCategory = async (categoryId: string) => {
    const category: categoryProps = await categoryServices.findByCategoryId(categoryId);
    return {
        id: category.id,
        name: category.name,
    }
}