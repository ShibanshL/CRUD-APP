import { create } from 'zustand'

const useStore = create(set => ({
  count: 0,
  inc: () => set((state:any) => ({ count: state.count + 1 })),
}))

const useCategory = create((set) => ({
  catagory: '',
  setCategory: (e:any) => set((state:any) => ({ category: e })),
}))

const useSearch = create((set) => ({
  search: '',
  setsearch: (e:any) => set((state:any) => ({ search: e })),
}))

const useNotification = create((set) => ({
  notification: '',
  setNotification: (e:any) => set((state:any) => ({ notification: e })),
}))

export {useStore, useCategory, useSearch, useNotification}