import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL
const token = localStorage.getItem("token")
console.log(API_URL)

export const getNotes = async (
  search = "",
  page = 1,
  limit = 5
) => {

  const response = await axios.get(
    `${API_URL}/note?search=${search}&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const addNote = async (data) => {

  try {
    const response = await axios.post(`${API_URL}/note`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })


    toast.success(response?.data?.
      message
    )
    console.log(response)
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Something went wrong");
  }
}

export const editNote = async (data, id) => {
  console.log(data)
  try {
    const response = await axios.put(`${API_URL}/note/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    toast.success(response?.data?.
      message
    )
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
}

export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/note/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
    toast.success(response?.data?.
      message
    )
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }

}