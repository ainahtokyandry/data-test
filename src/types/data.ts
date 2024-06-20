export type DataType = {
    total_count: number
    results: (CoolIslandsType & CoolGreenSpacesType)[]
}

type CoolGreenSpacesType = {
    commune: string
    dispo: string
    geo_point_2d: GeoPoint2dType
    geo_shape: GeoShapeType
    gid: string
    modele: string
    no_voirie_impair: string
    type_objet: string
    voie: string
    nom: string
}

type CoolIslandsType = {
    adresse: string
    arrondissement: string
    geo_point_2d: GeoPoint2dType
    geo_shape: GeoShapeType
    identifiant: string
    nom: string
    payant: string
    proposition_usager: string
    type: string
    statut_ouverture?: string
}

type GeoPoint2dType = { lat: number; lon: number }
type GeoShapeType = {
    geometry: {
        coordinates: [number, number]
        type: string
    }
    type: string
}
export type APIType =
    | "ilots-de-fraicheur-equipements-activites"
    | "ilots-de-fraicheur-espaces-verts-frais"
    | "fontaines-a-boire"
