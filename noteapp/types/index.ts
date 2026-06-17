
export type TypeOfTags = {
    id: number,
    name: string,
    notes: TypeOfNote[]
}

export type TypeOfUser = {
    id: number,
    name: string,
    email: string,
    password: string,
    phone?: string,
    image?: string
}

export type TypeOfNote = {
    id: number,
    titles: string,
    contents: string,
    useId: number,
    tagId: number,
    remove: boolean,
    favorite: boolean,
    createdAt: string
}