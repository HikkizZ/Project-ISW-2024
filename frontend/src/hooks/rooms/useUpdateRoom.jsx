import { useState } from "react";
import { updateRoom } from "@services/room.service";
import { showSuccessAlert, showErrorAlert } from "../../utils/alerts";

export function useUpdateRoom(fetchRooms) {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (id, updatedData) => {
        try {
            setLoading(true);

            if (!Object.keys(updatedData).length) {
                throw new Error("Debe proporcionar al menos un campo para actualizar.");
            }

            const updatedRoom = await updateRoom(id, updatedData);

            if (updatedRoom) {
                showSuccessAlert(
                    "¡Sala modificada!",
                    "La sala ha sido modificada correctamente."
                );
                fetchRooms((prevRooms) =>
                    prevRooms.map((room) =>
                        room.id === id ? { ...room, ...updatedData } : room
                    )
                );
            }
        } catch (error) {
            showErrorAlert(
                "Error al modificar la sala",
                error.message || "Hubo un problema al modificar la sala."
            );
        } finally {
            setLoading(false);
        }
    };

    return { handleUpdate, loading };
}