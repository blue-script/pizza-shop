export type ProductsDTO = ProductDTO[]

export type ProductDTO = {
  id: number;
  name: string;
  price: number;
  ingredients: string[];
  image: string;
  rating: number;
}