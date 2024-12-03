import { useState } from "react";

export default function ResourceRow({ resource, onUpdate, onDelete, loadingUpdate, loadingDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(resource.name); // Inicializamos con el nombre actual

    const handleEditClick = () => {
        setIsEditing(true);
        setEditName(resource.name); // Aseguramos que siempre se use el nombre actual
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditName(resource.name); // Reinicia el nombre al valor actual
    };

    const handleSaveEdit = () => {
        onUpdate(resource.id, { name: editName });
        setIsEditing(false);
    };

    return (
        <tr>
            <td>{resource.id}</td>
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
                    resource.name
                )}
            </td>
            <td>
                {isEditing ? (
                    <>
                        <button onClick={handleSaveEdit} disabled={loadingUpdate}>
                            Guardar
                        </button>
                        <button onClick={handleCancelEdit} disabled={loadingUpdate}>
                            Cancelar
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={handleEditClick} disabled={loadingUpdate}>
                            Modificar
                        </button>
                        <button onClick={() => onDelete(resource.id)} disabled={loadingDelete}>
                            Eliminar
                        </button>
                    </>
                )}
            </td>
        </tr>
    );
}

