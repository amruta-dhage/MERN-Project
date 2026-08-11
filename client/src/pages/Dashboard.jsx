import React from "react";
import { useState, useEffect } from "react"
import { addNote, editNote, getNotes } from "../services/noteService"
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Modal from "../components/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deleteNote } from "../services/noteService";
import Loader from "../components/Loader";

function Dashboard() {
  const [notes, setNotes] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null)
  const navigate = useNavigate();
  const [totalPage, SetTotalPage] = useState(0)
  const [limit, setLimit] = useState(5)
  const [totalNotes, setTotalNotes] = useState(0)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      if (!editingNote) {
        addNote(data)

      } else {
        editNote(data, editingNote?._id)
      }

      fetchNotes()
      setIsOpen(!isOpen)
    } catch (error) {
      console.log(error)
    }

  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: [],
      priority: "false",
      pinned: "false",
      archived: "false",
    },
  });
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await getNotes(debouncedSearch, page, limit);
      setNotes(res.data);
      setPage(res?.pagination?.
        currentPage)
      SetTotalPage(res?.pagination?.totalPages)

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [debouncedSearch, page, limit]);

  //debouncing for search

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);
  const handleCancel = () => {
    reset();           // Reset form to defaultValues
    setIsOpen(false);  // Close modal
  };

  //Add Notes
  const handleAdd = () => {
    setEditingNote(null);

    reset({
      title: "",
      description: "",
      category: "",
      priority: "false",
      pinned: "false",
      archived: "false",
    });

    setIsOpen(true);
  };

  //Edit Notes
  const handleEdit = (note) => {
    setEditingNote(note);
    reset({
      title: note.title,
      description: note.description,
      category: note.category,
      priority: String(note.priority),
      pinned: String(note.pinned),
      archived: String(note.archived),
    });
    setIsOpen(true);
  };

  //Delete Notes
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;

    try {
      await deleteNote(id);
      console.log("first")
      fetchNotes();

      alert("Note deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    reset();
    setIsOpen(false);
    setEditingNote(null);

  };

  const handlePin = async (note) => {
    try {
      await editNote({
        title: note.title,
        description: note.description,
        category: note.category,
        priority: String(note.priority),
        pinned: String(!note.pinned),
        archived: String(note.archived),
      }, note?._id)
      fetchNotes()
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between mt-10 mb-5">
        <button onClick={() => handleAdd()} className="bg-indigo-600  hover:bg-indigo-700 text-white px-5 py-3 rounded-lg flex items-center gap-2">
          <AddIcon /> Add Note
        </button>
        <div className="flex flex-col md:flex-row justify-between gap-2  ">
          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-700">
              Limit
            </label>

            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1); // Go back to first page
              }}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>

            {/* <span className="text-gray-700">Entries</span> */}
          </div>
          <div className="border rounded-lg px-4 py-2 sm:flex-row"><SearchIcon className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="border-none outline-none"
              onClick={(e) => { setSearch(e.target.value); }}

            /></div>

        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        {loading ? (
          <Loader />
        ) : (
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-400 text-gray-900">
              <tr>
                {/* <th className="px-4 py-3 text-left">Sr. No</th> */}
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-center">Priority</th>
                <th className="px-4 py-3 text-center">Pinned</th>
                <th className="px-4 py-3 text-center">Created</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {notes?.map((note, index) => (
                <tr
                  key={note._id}
                  className=" hover:bg-gray-200 transition"
                >
                  {/* <td className="px-4 py-3">{index + 1}</td> */}
                  <td className="px-4 py-3">
                    <p className="font-semibold">{note.title}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {note.description}
                    </p>
                  </td>

                  <td className="px-4 py-3">
                    {Array.isArray(note.category)
                      ? note.category.join(", ")
                      : note.category}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {note.priority ? (
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                        High
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                        Normal
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {note.pinned ? (
                      <PushPinIcon className="text-yellow-500" onClick={() => handlePin(note)} />
                    ) : (
                      <PushPinOutlinedIcon
                        onClick={() => handlePin(note)}
                      />
                    )}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(note)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <EditIcon />
                      </button>

                      <button
                        onClick={() => handleDelete(note._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}


      </div>
      <div className="flex gap-2 mt-4 justify-end">
        {Array.from({ length: totalPage }).map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`px-3 py-1 rounded-md transition ${page === index + 1
              ? "bg-blue-800 text-white"
              : "bg-blue-500 text-white hover:bg-blue-700"
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {/* Add Note Model */}
      <Modal isOpen={isOpen} onClose={handleClose} title={!editingNote ? "Add Note" : "EditNote"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-200"
              placeholder="Enter your title"
              {...register("title", {
                required: "Title is required",
              })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 mt-2 text-sm font-semibold text-gray-700">Description</label>
            <textarea
              rows={4}
              placeholder="Enter your description"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 mt-2 text-sm font-semibold text-gray-700">Category</label>
            <select
              {...register("category", {
                required: "Category is required",
              })}

              className="w-full border rounded-lg p-2">
              <option >Select Category</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Study">Study</option>
              <option value="To-Do">To-Do</option>
              <option value="Ideas">Ideas</option>
              <option value="Meeting">Meeting</option>
              <option value="Finance">Finance</option>
              <option value="Health">Health</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Goals">Goals</option>
              <option value="Important">Important</option>
              <option value="Journal">Journal</option>
              <option value="Home">Home</option>
              <option value="Others">Others</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-3 block mb-2 mt-2 text-sm font-semibold text-gray-700">Priority</label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="true"
                {...register("priority")}
              />
              Yes
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="false"
                {...register("priority")}
              />
              No
            </label>
            {errors.priority && (
              <p className="text-red-500 text-sm">{errors.priority.message}</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-3 block mb-2 mt-2 text-sm font-semibold text-gray-700">Pinned</label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="true"
                {...register("pinned")}
              />
              Yes
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="false"
                {...register("pinned")}
              />
              No
            </label>
            {errors.pinned && (
              <p className="text-red-500 text-sm">{errors.pinned.message}</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-3 block mb-2 mt-2 text-sm font-semibold text-gray-700">Archived</label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="true"
                {...register("archived")}
              />
              Yes
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="false"
                {...register("archived")}
              />
              No
            </label>
            {errors.archived && (
              <p className="text-red-500 text-sm">{errors.archived.message}</p>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="w-35 mt-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >Cancel
            </button>
            <button
              type="submit"
              className="w-35 mt-3 bg-cyan-500 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Register
            </button>
          </div>

        </form>
      </Modal></>


  );
}

export default Dashboard;
