import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newproduct) => {
    if (!newproduct.name || !newproduct.price || !newproduct.image) {
      return { success: false, message: "Please fill all the fields" };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newproduct),
    });
    const data = await res.json();

    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  },
  getProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));
    return { success: true, message: "Product deleted successfully" };
  },
  updateProduct: async (id, updatedProduct) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    set((state) => {
      let updatedProducts = state.products.map((product) => {
        if (product._id === id) {
          return data.data;
        }
        return product;
      });
      return { products: updatedProducts };
    });
    return { success: true, message: "Product updated successfully" };
  },
}));
