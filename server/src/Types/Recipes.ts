export interface IRecipe {
    name: string
    ingredients: IIngredients[]
    author: string
    authorId: string
}

export interface IIngredients {
    quantity: string
    name: string
}