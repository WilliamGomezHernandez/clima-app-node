const axios = require('axios');


const getLugarLatlng = async(dir) => {
    const encodeUrl = encodeURI(dir)

    const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeUrl}.json`,
        params: { 'access_token': 'pk.eyJ1Ijoib3Ryb211bmRpc3RhIiwiYSI6ImNrZXN2cWg0ZDJiMzQyd284aGZwbmhhMDUifQ.ahaoTLBBU4tXQzBGSvbPgg' }
    });

    const resp = await instance.get();

    if (!resp) {
        throw new Error(`No hay resultados para ${dir}`);
    }

    const data = resp.data.features[0];
    const direccion = data.text;
    const lat = data.geometry.coordinates[1];
    const lng = data.geometry.coordinates[0];


    return {
        direccion,
        lat,
        lng
    }

}

module.exports = {
    getLugarLatlng
}