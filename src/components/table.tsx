import { CircularProgress } from "@mui/material"
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid"
import { frFR } from "@mui/x-data-grid/locales"
import { useEffect, useState } from "react"
import useFetch from "../hooks/useFetch"
import { APIType } from "../types/data"

const columns = (api: APIType): GridColDef[] => {
    switch (api) {
        case "fontaines-a-boire":
            return [
                {
                    field: "type_objet",
                    headerName: "Type",
                    flex: 1,
                },
                {
                    field: "modele",
                    headerName: "Modèle",
                    flex: 1,
                },
                {
                    field: "dispo",
                    headerName: "Disponible",
                    flex: 0.5,
                },
                {
                    field: "statut_ouverture",
                    headerName: "Statut ouverture",
                    flex: 0.5,
                },
            ]
        default:
            return [
                { field: "nom", headerName: "Nom", flex: 1 },
                { field: "type", headerName: "Type", flex: 1 },
                {
                    field: "adresse",
                    headerName: "Adresse",
                    flex: 1,
                },
                {
                    field: "arrondissement",
                    headerName: "Arrondissement",
                    flex: 0.5,
                },
                {
                    field: "statut_ouverture",
                    headerName: "Statut ouverture",
                    flex: 0.5,
                },
            ]
    }
}

const DataTable = ({ api }: { api: APIType }) => {
    const [offset, setOffset] = useState(0)
    const { data, loading } = useFetch(api, {
        offset,
    })
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 0,
    })
    const [rows, setRows] = useState<GridRowsProp>()

    useEffect(() => {
        if (data && data.total_count > 0) {
            setRows(
                data.results.map((row, id) => ({
                    id,
                    ...row,
                    statut_ouverture: row.statut_ouverture ? "Ouvert" : "Fermé",
                }))
            )
        }
    }, [data])

    return (
        <>
            {!rows && <CircularProgress sx={{ m: "auto" }} />}
            {rows && (
                <DataGrid
                    rows={rows}
                    columns={columns(api)}
                    sx={{ minHeight: 200, width: "100%" }}
                    paginationModel={paginationModel}
                    pageSizeOptions={[5, 10, 25]}
                    onPaginationModelChange={setPaginationModel}
                    rowCount={data?.total_count ?? 0}
                    paginationMode="server"
                    loading={loading}
                    rowSelection={false}
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    slotProps={{
                        pagination: {
                            onPageChange(_, page) {
                                setOffset(page)
                                setPaginationModel({ page, pageSize: 10 })
                            },
                        },
                    }}
                />
            )}
        </>
    )
}

export default DataTable
