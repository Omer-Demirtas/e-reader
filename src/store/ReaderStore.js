import create from "zustand";

export const useReaderStore = create((set, get) => ({
  url: null,
  bookByte: null,
  setBookByte: (bookByte) => set((state) => ({ ...state, bookByte })),
  setUrl: (url) => set((state) => ({ ...state, url })),
}));
