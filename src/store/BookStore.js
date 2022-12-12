import create from "zustand";

export const useBookStore = create(
  (set, get) =>
    ({
      books: [],
      addBook: (book) => {
        set((state) => {
            console.log({ book })
            return ({ books: [...state.books, book] })
        });
      },
      addAllBooks: (books) => {
        return set(state => ({ ...state, books: [...state.books, ...books] }))
      },
      getBook: (id) => {
        console.log(get().books);
        return get().books.find((b) => b.id === id) || {}
      },
    } || {})
);
