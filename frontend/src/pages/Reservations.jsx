import { useEffect, useState } from "react";
import { useCreateReservation } from "../hooks/reservations/useCreateReservation";
import { useGetReservations } from "../hooks/reservations/useGetReservations";
import { useSearchReservation } from "../hooks/reservations/useSearchReservation";
import { useUpdateReservation } from "../hooks/reservations/useUpdateReservation";
import { useDeleteReservation } from "../hooks/reservations/useDeleteReservation";
import { useAuth } from "../context/AuthContext";
import ReservationTable from "../components/reservations/ReservationTable";
import ReservationForm from "../components/reservations/ReservationForm";
import ReservationSearch from "../components/reservations/ReservationSearch";

export default function Reservations() {
    const { user } = useAuth(); 
    const { reservations, fetchReservations, loading: loadingReservations } = useGetReservations();
    const { handleCreate, loading: loadingCreate } = useCreateReservation(fetchReservations);
    const { handleUpdate, loading: loadingUpdate } = useUpdateReservation(fetchReservations);
    const { handleDelete, loading: loadingDelete } = useDeleteReservation({
        reservations,
        setReservations: fetchReservations,
    });

    const { resetFilters, searchResults: filteredResults, loading: loadingSearch } =
        useSearchReservation(reservations);

    const [showCreateModal, setShowCreateModal] = useState(false);

    const [filters, setFilters] = useState({});

    useEffect(() => {
        fetchReservations();
    }, [fetchReservations]);

    const handleFilterUpdate = (filterName, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
    };

    const handleResetFilters = () => {
        setFilters({});
        resetFilters(); 
    };

    const noReservations = reservations.length === 0;
    const noSearchResults = filteredResults.length === 0 && !noReservations;

    const isProfesorOrAlumno = user?.role === "Profesor" || user?.role === "Alumno";

    return (
        <div className="around-container">
            {/* Título principal centrado */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <h1 className="around-header">
                    <br />
                    <br />
                    Reservaciones</h1>
            </div>

            {/* Buscar reservaciones */}
            <div style={{ marginBottom: "20px" }}>
                <h3 style={{ textAlign: "left", fontSize: "1.5rem", marginBottom: "10px" }}>
                    Buscar Reservación
                </h3>
                <div className="search-container">
                    <ReservationSearch
                        onFilterUpdate={handleFilterUpdate}
                        onReset={handleResetFilters}
                        loading={loadingSearch}
                    />
                </div>
            </div>

            {/* Lista de reservaciones y botón Crear */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
                <h3>Lista de Reservaciones</h3>
                {(user?.role === "admin" || user?.role === "Profesor" || user?.role === "Alumno") && (
                    <button
                        onClick={() => setShowCreateModal(true)}
                        style={{
                            height: "38px",
                            backgroundColor: "#28a745",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            padding: "10px 15px",
                            cursor: "pointer",
                            fontSize: "14px",
                        }}
                    >
                        Crear Reservación
                    </button>
                )}
            </div>

            {/* Tabla de reservaciones */}
            {loadingSearch || loadingReservations ? (
                <p>Cargando reservaciones...</p>
            ) : noReservations ? (
                <p>No hay reservaciones registradas.</p>
            ) : noSearchResults ? (
                <p>No se encontraron reservaciones que coincidan con los filtros aplicados.</p>
            ) : (
                <ReservationTable
                    reservations={filteredResults}
                    onUpdate={user?.role === "admin" || user?.role === "Encargado" ? handleUpdate : null}
                    onDelete={user?.role === "admin" ? handleDelete : null}
                    loadingDelete={loadingDelete}
                    loadingUpdate={loadingUpdate}
                    hideDevuelto={isProfesorOrAlumno}
                    user={user}
                    filters={filters} 
                />
            )}

            {/* Modal para Crear Reservación */}
            {showCreateModal && (
                <ReservationForm
                    onCreate={handleCreate}
                    loading={loadingCreate}
                    onClose={() => setShowCreateModal(false)}
                />
            )}
        </div>
    );
}