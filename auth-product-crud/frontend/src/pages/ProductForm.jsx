import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "../api/axiosInstance";

const ProductForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const { data } = await axiosInstance.get(`/products/${id}`);
          setFormData({
            name: data.product.name,
            description: data.product.description || "",
            price: data.product.price,
            stock: data.product.stock,
            category: data.product.category || "",
          });
        } catch (error) {
          console.error(error);
        }
      };
      fetchProduct();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      if (isEditMode) {
        await axiosInstance.put(`/products/${id}`, formData);
      } else {
        await axiosInstance.post("/products", formData);
      }
      navigate("/");
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors([{ message: "Something went wrong" }]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 px-6">
      <h2 className="text-2xl font-bold text-slate-100 mb-6 text-center">
        {isEditMode ? "Edit Product" : "Add Product"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="bg-slate-800 border border-slate-700 rounded-md px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="bg-slate-800 border border-slate-700 rounded-md px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="bg-slate-800 border border-slate-700 rounded-md px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="bg-slate-800 border border-slate-700 rounded-md px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="bg-slate-800 border border-slate-700 rounded-md px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-md py-2 font-medium transition cursor-pointer"
        >
          {loading ? "Saving..." : isEditMode ? "Update" : "Create"}
        </button>
      </form>

      {errors.length > 0 && (
        <ul className="text-red-400 text-sm mt-3 space-y-1">
          {errors.map((err, idx) => (
            <li key={idx}>{err.field ? `${err.field}: ` : ""}{err.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductForm;