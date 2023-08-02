export interface IBook {
    title: string;
    author: string;
    thumbnail: string;
    price: string;
    rating: string;
    featured: boolean;
    _id: string;
  }
  

  export interface IUser{
    name?: string;
    email: string ;
    password: string;
  } 