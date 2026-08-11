// import React, { useEffect } from 'react'
// import { useState } from 'react';
// import { getNotes } from '../services/noteService';
// import Loader from '../components/Loader';

// function Notes() {
//     const [loading, setLoading] = useState(false);
//     const [notes, setNotes] = useState([])
//     const [isOpen, setIsOpen] = useState(false);
//     const [editingNote, setEditingNote] = useState(null)

//     const [totalPage, SetTotalPage] = useState(0)
//     const [limit, setLimit] = useState(5)
//     const [totalNotes, setTotalNotes] = useState(0)
//     const [search, setSearch] = useState("")
//     const [page, setPage] = useState(1)
//     const [debouncedSearch, setDebouncedSearch] = useState("")

//     const fetchNotes = async () => {
//         try {
//             setLoading(true);
//             const res = await getNotes(debouncedSearch, page, limit);
//             setNotes(res.data);
//             setPage(res?.pagination?.
//                 currentPage)
//             SetTotalPage(res?.pagination?.totalPages)

//         } catch (err) {
//             console.log(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchNotes()
//     }, [])

//     return (
//         <div>  <div className="overflow-x-auto bg-white mt-10 rounded-xl shadow-md">
//             {loading ? (
//                 <Loader />
//             ) : (
//                 <table className="min-w-full border-collapse">
//                     <thead className="bg-gray-400 text-gray-900">
//                         <tr>
//                             {/* <th className="px-4 py-3 text-left">Sr. No</th> */}
//                             <th className="px-4 py-3 text-left">Title</th>
//                             <th className="px-4 py-3 text-left">Category</th>
//                             <th className="px-4 py-3 text-center">Priority</th>
//                             <th className="px-4 py-3 text-center">Pinned</th>
//                             <th className="px-4 py-3 text-center">Created</th>
//                             <th className="px-4 py-3 text-center">Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {notes?.map((note, index) => (
//                             <tr
//                                 key={note._id}
//                                 className=" hover:bg-gray-200 transition"
//                             >
//                                 {/* <td className="px-4 py-3">{index + 1}</td> */}
//                                 <td className="px-4 py-3">
//                                     <p className="font-semibold">{note.title}</p>
//                                     <p className="text-sm text-gray-500 line-clamp-2">
//                                         {note.description}
//                                     </p>
//                                 </td>

//                                 <td className="px-4 py-3">
//                                     {Array.isArray(note.category)
//                                         ? note.category.join(", ")
//                                         : note.category}
//                                 </td>

//                                 <td className="px-4 py-3 text-center">
//                                     {note.priority ? (
//                                         <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
//                                             High
//                                         </span>
//                                     ) : (
//                                         <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
//                                             Normal
//                                         </span>
//                                     )}
//                                 </td>

//                                 {/* <td className="px-4 py-3 text-center">
//                                     {note.pinned ? (
//                                         <PushPinIcon className="text-yellow-500" onClick={() => handlePin(note)} />
//                                     ) : (
//                                         <PushPinOutlinedIcon
//                                             onClick={() => handlePin(note)}
//                                         />
//                                     )}
//                                 </td>

//                                 <td className="px-4 py-3 text-center">
//                                     {new Date(note.createdAt).toLocaleDateString()}
//                                 </td>

//                                 <td className="px-4 py-3">
//                                     <div className="flex justify-center gap-3">
//                                         <button
//                                             onClick={() => handleEdit(note)}
//                                             className="text-blue-600 hover:text-blue-800"
//                                         >
//                                             <EditIcon />
//                                         </button>

//                                         <button
//                                             onClick={() => handleDelete(note._id)}
//                                             className="text-red-600 hover:text-red-800"
//                                         >
//                                             <DeleteIcon />
//                                         </button>
//                                     </div>
//                                 </td> */}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}


//         </div>
//             <div className="flex gap-2 mt-4 justify-end">
//                 {Array.from({ length: totalPage }).map((_, index) => (
//                     <button
//                         key={index}
//                         onClick={() => setPage(index + 1)}
//                         className={`px-3 py-1 rounded-md transition ${page === index + 1
//                             ? "bg-blue-800 text-white"
//                             : "bg-blue-500 text-white hover:bg-blue-700"
//                             }`}
//                     >
//                         {index + 1}
//                     </button>
//                 ))}
//             </div></div>
//     )
// }

// export default Notes

import React, { useEffect, useState } from "react";
import { getNotes } from "../services/noteService";
import Loader from "../components/Loader";

function Notes() {
    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState([]);

    const [totalPage, setTotalPage] = useState(0);
    const [limit, setLimit] = useState(6);
    const [page, setPage] = useState(1);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // -----------------------------
    // Debounce Search
    // -----------------------------
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    // -----------------------------
    // Fetch Notes
    // -----------------------------
    const fetchNotes = async () => {
        try {
            setLoading(true);

            const res = await getNotes(
                debouncedSearch,
                page,
                limit
            );

            setNotes(res?.data || []);

            setTotalPage(
                res?.pagination?.totalPages || 0
            );

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, [page, limit, debouncedSearch]);

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 mb-5">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5 mb-6">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        My Notes
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage and organize your notes
                    </p>
                </div>

                {/* Search + Limit */}
                {/* <div className="flex flex-col sm:flex-row gap-3">
                    <select
                        value={limit}
                        onChange={(e) => {
                            setLimit(Number(e.target.value));
                            setPage(1);
                        }}
                        className="border border-gray-300 rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value={6}>6</option>
                        <option value={9}>9</option>
                        <option value={12}>12</option>
                    </select>

                
                
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search notes..."
                        className="w-full sm:w-64 border border-gray-300 rounded-lg px-4 py-2 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div> */}
            </div>

            {/* Notes */}
            {loading ? (
                <Loader />
            ) : notes.length === 0 ? (

                /* Empty State */
                <div className="bg-white rounded-xl shadow-sm p-10 text-center">
                    <div className="text-5xl mb-4">
                        📝
                    </div>

                    <h2 className="text-xl font-semibold text-gray-700">
                        No notes found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Try creating a new note or changing your search.
                    </p>
                </div>

            ) : (

                /* Card Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                    {notes.map((note) => (

                        <div
                            key={note._id}
                            className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition duration-300"
                        >

                            {/* Card Header */}
                            <div className="flex justify-between items-start gap-3">

                                <div className="min-w-0">

                                    <h2 className="text-lg font-bold text-gray-800 truncate">
                                        {note.title}
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                                        {note.description}
                                    </p>

                                </div>

                                {/* Pin */}
                                <div className="text-xl">
                                    {note.pinned ? "📌" : "📍"}
                                </div>

                            </div>


                            {/* Divider */}
                            <div className="border-t border-gray-100 my-4"></div>


                            {/* Category */}
                            <div className="mb-4">

                                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
                                    Category
                                </p>

                                <div className="flex flex-wrap gap-2">

                                    {Array.isArray(note.category) ? (
                                        note.category.map((category, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                                            >
                                                {category}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm">
                                            {note.category}
                                        </span>
                                    )}

                                </div>

                            </div>


                            {/* Priority */}
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-semibold">
                                        Priority
                                    </p>

                                    {note.priority ? (
                                        <span className="inline-block mt-1 px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                                            High
                                        </span>
                                    ) : (
                                        <span className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                                            Normal
                                        </span>
                                    )}
                                </div>


                                {/* Created Date */}
                                <div className="text-right">

                                    <p className="text-xs text-gray-400 uppercase font-semibold">
                                        Created
                                    </p>

                                    <p className="text-sm text-gray-600 mt-1">
                                        {new Date(
                                            note.createdAt
                                        ).toLocaleDateString()}
                                    </p>

                                </div>

                            </div>


                            {/* Actions */}
                            {/* <div className="border-t border-gray-100 mt-4 pt-4 flex justify-end gap-3">

                                <button
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition"
                                >
                                    ✏️ Edit
                                </button>

                                <button
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition"
                                >
                                    🗑️ Delete
                                </button>

                            </div> */}

                        </div>

                    ))}

                </div>
            )}


            {/* Pagination */}
            {totalPage > 1 && (
                <div className="flex justify-center gap-2 mt-8">

                    {Array.from({ length: totalPage }).map((_, index) => {

                        const pageNumber = index + 1;

                        return (
                            <button
                                key={pageNumber}
                                onClick={() => setPage(pageNumber)}
                                className={`w-10 h-10 rounded-lg font-medium transition ${page === pageNumber
                                    ? "bg-indigo-600 text-white"
                                    : "bg-white text-gray-700 border hover:bg-indigo-50"
                                    }`}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}

                </div>
            )}

        </div>
    );
}

export default Notes;