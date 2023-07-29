export interface IBook {
    title: string;
    author: string;
    thumbnail: string;
    price: string;
    rating: string;
    featured: boolean;
    id: number;
  }
  

  export interface IUser{
    name?: string;
    email: string ;
    password: string;
  } 