import { useEffect, useState } from "react";
import ResourceSearch from "../components/resources/ResourceSearch";
import ResourceTable from "../components/resources/ResourceTable";
import ResourceForm from "../components/resources/ResourceForm";
import { useCreateResource } from "../hooks/resources/useCreateResource";
import { useGetResources } from "../hooks/resources/useGetResources";
import { useUpdateResource } from "../hooks/resources/useUpdateResource";
import { useDeleteResource } from "../hooks/resources/useDeleteResource";
import { useAuth } from "../context/AuthContext";

export default function Resources() {
    const { user } = useAuth(); // Accede al rol del usuario autenticado
    const { resources, fetchResources, loading: loadingResources } = useGetResources();
    const { handleCreate, loading: loadingCreate } = useCreateResource(fetchResources);
    const { handleUpdate, loading: loadingUpdate } = useUpdateResource(fetchResources);
    const { handleDelete, loading: loadingDelete } = useDeleteResource({
        setResources: fetchResources,
    });

    const [filteredResources, setFilteredResources] = useState([]); // Estado para recursos filtrados
    const [filters, setFilters] = useState({});
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        fetchResources();
    }, [fetchResources]);

    useEffect(() => {
        // Aplicar filtros a los recursos globales
        let results = resources;

        if (filters.name) {
            results = results.filter((resource) =>
                resource.name.toLowerCase().includes(filters.name.toLowerCase())
            );
        }
        if (filters.brand) {
            results = results.filter((resource) =>
                resource.brand.toLowerCase().includes(filters.brand.toLowerCase())
            );
        }
        if (filters.resourceType) {
            results = results.filter((resource) => resource.resourceType === filters.resourceType);
        }

        setFilteredResources(results); // Actualizar el estado de recursos filtrados
    }, [filters, resources]);

    const handleSearch = (query) => {
        // Aplicar búsqueda general sobre todos los recursos
        setFilteredResources(
            resources.filter((resource) =>
                `${resource.name.toLowerCase()} ${resource.brand.toLowerCase()} ${resource.resourceType.toLowerCase()}`
                    .includes(query.toLowerCase())
            )
        );
    };

    const handleFilterUpdate = (filter, value) => {
        // Actualizar los filtros
        setFilters((prev) => ({
            ...prev,
            [filter]: value.trim(),
        }));
    };

    const handleResetFilters = () => {
        // Resetear filtros
        setFilters({});
        setFilteredResources(resources);
    };

    return (
        <div>
            <br />
            <br />
            <br />
            <h1 style={{ textAlign: "center" }}>Recursos</h1>

            {/* Buscar Recurso */}
            <h3>Buscar Recurso</h3>
            <ResourceSearch
                onSearch={handleSearch} // Búsqueda general
                onFilterUpdate={handleFilterUpdate} // Filtros específicos
                onReset={handleResetFilters} // Resetear filtros
                loading={loadingResources}
            />

            {/* Lista de Recursos */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <h3>Lista de Recursos</h3>
                {["admin", "Encargado"].includes(user?.role) && ( // Solo el admin puede ver el botón de crear
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
                        Crear Recurso
                    </button>
                )}
            </div>

            <ResourceTable
                resources={filteredResources.length ? filteredResources : resources} // Mostrar recursos filtrados o todos
                onUpdate={["admin", "Encargado"].includes(user?.role) ? handleUpdate : null}
                onDelete={user?.role === "admin" ? handleDelete : null}
                loadingUpdate={loadingUpdate}
                loadingDelete={loadingDelete}
                role={user?.role}
            />

            {/* Modal Crear Recurso */}
            {showCreateModal && (
                <ResourceForm
                    onCreate={handleCreate}
                    loading={loadingCreate}
                    onClose={() => setShowCreateModal(false)}
                />
            )}
        </div>
    );
}