import { Box, Button, Stack, TextField, ThemeProvider, Typography, createTheme } from "@mui/material"
import { ChangeEvent, SyntheticEvent, useCallback, useMemo, useState } from "react"
import "./App.css"
import DataTable from "./components/table"

const App = () => {
    const [filterData, setFilterData] = useState({
        nom: "",
        type: "",
        adresse: "",
    })
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: "light",
                    primary: { main: "#5f259f" },
                },
                components: {
                    MuiTextField: {
                        defaultProps: {
                            size: "small",
                        },
                    },
                },
                typography: {
                    fontFamily: "Nexa Regular",
                },
            }),
        []
    )

    const onSubmit = useCallback(
        (e: SyntheticEvent) => {
            e.preventDefault()
            // let params = ""
            // for (const key in filterData) {
            //     const element = filterData[key as "nom" | "type" | "adresse"]
            //     if (element) {
            //         params += `${params.length > 0 ? "&" : "?"}${key}=${element}`
            //     }
            // }
            // console.log(params)
            
        },
        [filterData]
    )

    const onFilterChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setFilterData((prev) => ({
            ...prev,
            [e.target.name]: [e.target.value],
        }))
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Stack sx={{ gap: 2 }}>
                <Box
                    component="form"
                    sx={{
                        display: "flex",
                        gap: 1,
                        position: "sticky",
                        top: "1rem",
                        backgroundColor: "background.default",
                        zIndex: 1,
                    }}
                    onSubmit={onSubmit}
                >
                    <TextField placeholder="Rechercher un nom" onChange={onFilterChange} name="nom" />
                    <TextField placeholder="Rechercher un type" onChange={onFilterChange} name="type" />
                    <TextField
                        placeholder="Rechercher une adresse"
                        name="adresse"
                        onChange={onFilterChange}
                        sx={{ width: 220 }}
                    />
                    <Button type="submit" variant="contained">
                        Rechercher
                    </Button>
                </Box>
                <Typography variant="h3" component={"h1"}>
                    Espaces verts frais
                </Typography>
                <DataTable api={"ilots-de-fraicheur-espaces-verts-frais"} />
                <Typography variant="h3" component={"h1"}>
                    Equipements / Activités
                </Typography>
                <DataTable api={"ilots-de-fraicheur-equipements-activites"} />
                <Typography variant="h3" component={"h1"}>
                    Fontaines à boire
                </Typography>
                <DataTable api={"fontaines-a-boire"} />
            </Stack>
        </ThemeProvider>
    )
}

export default App
