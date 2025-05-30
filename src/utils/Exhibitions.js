export function createExhibition(name, description) {
    const exhibitionData = localStorage.getItem("exhibitionData")

    const allArtworks = exhibitionData ? JSON.parse(exhibitionData) : {}
    allArtworks[name] = { name, description, artworks: [] }

    localStorage.setItem("exhibitionData", JSON.stringify(allArtworks))
}


export function deleteExhibition(name) {

    const exhibitionData = localStorage.getItem("exhibitionData")
    const allArtworks = JSON.parse(exhibitionData)

    if (allArtworks[name]) {
        delete allArtworks[name]

        localStorage.setItem("exhibitionData", JSON.stringify(allArtworks))
    }
}


export function addArtworkToExhibition(exhibitionName, artwork) {
    const exhibitionData = localStorage.getItem("exhibitionData")
    const allArtworks = JSON.parse(exhibitionData)

    allArtworks[exhibitionName].artworks.push(artwork)

    localStorage.setItem("exhibitionData", JSON.stringify(allArtworks))
}


export function deleteArtworkFromExhibition(artworkId) {

    const exhibitionData = localStorage.getItem("exhibitionData")
    const allArtworks = JSON.parse(exhibitionData)

    const exhibition = allArtworks[exhibitionName];

    if (exhibition.artworks.length > 0) {
        exhibition.artworks = exhibition.artworks.filter((item) => item.id !== artworkId);

    }
    localStorage.setItem("exhibitionData", JSON.stringify(allArtworks));
}

export function getNumberOfArworks(exhibitionName) {

    const exhibitionData = localStorage.getItem("exhibitionData")
    const allArtworks = JSON.parse(exhibitionData)

    for (const key in allArtworks) {
        if (key === exhibitionName) {
            const numberOfArtworks = allArtworks[key].artworks.length
            return numberOfArtworks
        } else {
            return 0
        }
    }
}


export function getExhibitionImage(name) {
    const stored = localStorage.getItem("exhibitionData");
    if (!stored) return null;

    try {
        const parsed = JSON.parse(stored);
        const exhibition = parsed[name];
        if (!exhibition || !Array.isArray(exhibition.artworks) || exhibition.artworks.length === 0) {
            return null;
        }
        return exhibition.artworks[0].image || null;
    } catch (e) {
        console.error("Failed to parse exhibition data:", e);
        return null;
    }
}


export function renameExhibition(exhibitionName, newName) {

    const exhibitionData = localStorage.getItem("exhibitionData")
    const allArtworks = JSON.parse(exhibitionData)

    if (allArtworks[exhibitionName]) {
        allArtworks[exhibitionName] = { ...allArtworks[exhibitionName], name: newName }
    }
    delete allArtworks[exhibitionName];

    localStorage.setItem("exhibitionData", JSON.stringify(allArtworks));
}


export function getAllExhibitions() {

    const exhibitionData = localStorage.getItem("exhibitionData")
    const allArtworks = exhibitionData ? JSON.parse(exhibitionData) : {}


    const allExhibitions = Object.values(allArtworks);

    return allExhibitions;
}


export function isArtworkInExhibition(allExhibitions, artwork) {

    const exhibitionData = localStorage.getItem("exhibitionData")
    const allArtworks = JSON.parse(exhibitionData)

    const exhibition = allExhibitions[exhibitionName]

    if (!exhibition || exhibition.artworks.length === 0) {
        return false
    } else {
        return exhibition.artworks.find((item) => item.id === artwork.id)
    }
}