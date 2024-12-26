import { useRef, useState } from "react";
import bsp from '../public/sbp.png';
import EditForm from "./EditForm";

export default function ListCard({ index, image, price, name, sold, id, description, email }) {
    const [confirmation, setConfirmation] = useState(false);
    const [editForm, setEditForm] = useState(false)
    const red = useRef();
    async function markDone() {
        red.current = id;
        const repso = await fetch("http://localhost:3000/userListings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                id: id,
                sold: true
            })
        })

        const res = await repso.json();
        location.reload()
        setConfirmation(false);
    }
    return (
        <>
            <div key={index} className="flex w-full h-[200px] items-center border border-gray-800 rounded-lg shadow-md mb-4 bg-Gld overflow-hidden">
                <div className="w-[30%] bg-white h-full flex items-center justify-center p-6 bg-gray-100">
                    <img src={image} className="w-full h-full object-contain p-2" alt={name} />
                </div>
                <div className="w-[70%] h-full flex flex-col justify-between p-6">
                    <div>
                        <h3 className="text-lg font-bold mb-2 text-black">{name}</h3>
                        <p className="text-gray-800 mb-1"><span className="font-semibold">Current Price:</span> ${price}</p>
                        <p className="text-gray-800"><span className="font-semibold">Sold:</span> {sold ? "Yes" : "No"}</p>
                        <p className="text-gray-800 truncate max-w-full"><span className="font-semibold">Description:</span> {description}</p>
                    </div>
                    <div className="flex space-x-4 mt-4">
                        {sold === false ? (
                            <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition" onClick={() => setEditForm(true)}>Edit Listing</button>
                        ) : (
                            <button className="px-6 py-2 bg-black text-white rounded-lg transition disabled cursor-not-allowed bg-gray-400">Edit Listing</button>
                        )}
                        {sold ? (
                            <button className="px-6 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed" disabled>Mark as Sold</button>
                        ) : (
                            <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition" onClick={() => setConfirmation(true)}>
                                Mark as Sold
                            </button>
                        )}
                    </div>
                </div>

                {/* Confirmation Modal */}
                {confirmation && (
                    <div className="fixed inset-0 w-screen bg-black h-screen z-50 flex justify-center items-center bg-gray-700 bg-opacity-50">
                        <div className="bg-white relative w-[30%] border-[2px] border-solid border-black rounded-lg">
                            <div className="h-[25%] w-full bg-white flex items-center justify-between p-4">
                                <span className="font-bold text-lg">Confirm Action</span>
                                <button onClick={() => setConfirmation(false)}>
                                    <img src={bsp} alt="Close" className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="h-[25%] w-full p-4 text-center">
                                Are you sure that you want to mark this item as sold? <br />
                                <span className="text-sm text-gray-600">Note: you will not be able to undo this change.</span>
                            </div>
                            <div className="h-[50%] w-full flex justify-center items-center pb-4">
                                <button
                                    className="w-[80%] h-[50px] bg-black text-white rounded-lg"
                                    onClick={markDone}
                                >
                                    Confirm Action
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {editForm === true ? <EditForm  editForm={editForm} setEditForm={setEditForm} email={email} name={name} price={price} description={description} id={id}/>: null}
            </div>
        </>
    );
}
