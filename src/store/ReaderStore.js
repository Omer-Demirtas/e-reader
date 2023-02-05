import create from "zustand";

export const useReaderStore = create((set, get) => ({
  url: null,
  bookByte: null,
  styles: {
    fontSize: 60, 
    textColor: "black",
    backgroundColor: "white"
  },
  setBookByte: (bookByte) => set((state) => ({ ...state, bookByte })),
  setUrl: (url) => set((state) => ({ ...state, url })),
  increaseFontSize: () => set(state => ({ ...state, styles: { ...state.styles, fontSize: state.styles.fontSize + 5 }})),
  decreaseFontSize: () => set(state => ({ ...state, styles: { ...state.styles, fontSize: state.styles.fontSize - 5 }})),
  setTextColor: (textColor) => set(state => ({ ...state, styles: { ...state.styles, textColor }})),
  setBackgroundColor: (backgroundColor) => set(state => ({ ...state, styles: { ...state.styles, backgroundColor }})),
}));
