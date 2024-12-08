import { useState } from "react";

export default function RoomRow({ room, onUpdate, onDelete, loadingUpdate, loadingDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(room.name);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditName(room.name);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditName(room.name);
    };

    const handleSaveEdit = () => {
        onUpdate(room.id, { name: editName });
        setIsEditing(false);
    };

    return (
        <tr>
            <td>{room.id}</td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        disabled={loadingUpdate}
                        style={{
                            width: "100%",
                            padding: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                ) : (
                    room.name
                )}
            </td>
            <td>
                {isEditing ? (
                    <>
                        <button
                            onClick={handleSaveEdit}
                            disabled={loadingUpdate}
                            style={{
                                backgroundColor: "#007bff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                padding: "5px 10px",
                                marginRight: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Guardar
                        </button>
                        <button
                            onClick={handleCancelEdit}
                            disabled={loadingUpdate}
                            style={{
                                backgroundColor: "#d33",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                padding: "5px 10px",
                                cursor: "pointer",
                            }}
                        >
                            Cancelar
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleEditClick}
                            disabled={loadingUpdate}
                            style={{
                                backgroundColor: "#cc8400",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                padding: "5px 10px",
                                marginRight: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Modificar
                        </button>
                        <button
                            onClick={() => onDelete(room.id)}
                            disabled={loadingDelete}
                            style={{
                                backgroundColor: "#d33",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                padding: "5px 10px",
                                cursor: "pointer",
                            }}
                        >
                            Eliminar
                        </button>
                    </>
                )}
            </td>
        </tr>
    );
}
