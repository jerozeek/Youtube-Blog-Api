
export interface FileProps {
    name: string;
    mimetype: string;
    size: number;
    tempFilePath: string,
}

export interface createUserProps {
    username: string;
    email: string;
    password: string;
    otp: number;
}

export interface userProps {
    id: string;
    username: string;
    password: string;
    email: string;
    image: string;
    otp: number;
    passwordReset: boolean;
    security: {tokens: [refreshToken: string, createdAt: string]};
    createdAt: string;
}

export interface authProps {
    create: (user: createUserProps) => Promise<userProps>;
    login: (email: string, password: string) => Promise<userProps>;
    forgetPassword: (email: string) => Promise<userProps>;
    verifyOTP: (email: string, otp: number) => Promise<userProps>;
    updatePassword: (email: string, password: string) => Promise<userProps>;
    authMiddleware: (userId: string) => Promise<userProps>;
}

export interface EmailInterface {
    send: (to: string, subject: string, template: string, data: any) => Promise<any>
}

export interface blogData {
    id: string;
    title: string;
    content: string;
    image: string;
    author: string;
    views: number;
    categoryId: string;
    createdAt: string;
}

export interface createBlogPayload {
    title: string;
    content: string;
    image: string;
    author: string;
}

export interface blogInterface {
    getAll: () => Promise<blogData[]>;
    createBlog: (payload: createBlogPayload) => Promise<blogData>;
    deleteBlog: (blogId: string) => Promise<blogData>;
    addToView: (blogId: string) => Promise<blogData>;
}

export interface categoryProps {
    id: string;
    name: string;
}

export interface categoryInterface {
    getAll: () => Promise<categoryProps[]>;
}

export interface cliProps {
    init: () => void;
    processInput: (str: string) => void;
    cliResponder: (str: string) => void;
}