


export type IUser = {
    name: string;
    email: string;
    password: string;
    role: string;
    _id: string;
  };

  export type IBook = {
    title: string;
    author: string;
    thumbnail: string;
    price: string;
    rating: string;
    featured: boolean;
    genre: string;
    publicationYear: string;
    reviews?: IReview[];
    wishlist?: string[];
    readingList?: string[];
    finishedList?: string[];
    addedBy?: string;
    _id: string;
  };


  export type IReview = {
    _id: string;
    email: string;
    review: string;
  }