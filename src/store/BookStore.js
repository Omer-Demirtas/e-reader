import create from "zustand";

export const useBookStore = create(
  (set, get) =>
    ({
      books: [],
      addBook: (book) => set((state) => ({ books: [...state.books, book] })),
      addAllBooks: (books) => set(state => ({ ...state, books: [...state.books, ...books] })),
      getBook: (id) => {
        console.log(get().books);
        return get().books.find((b) => b.id === id) || {}
      },
    } || {})
);
