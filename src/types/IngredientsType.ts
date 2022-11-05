export interface Ingredient {
  id: number;
  type: string;
}

export interface IngredientsType {
  breads: Ingredient[];
  meats: Ingredient[];
  optionals: Ingredient[];
}
