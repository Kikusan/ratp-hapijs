
export default function makeCoordinateProvider({ fetch = undefined } = {}) {
    if (!fetch) {
        throw new Error("makeCoordinateProvider");
    }

    const api = {
        get: async (query: string): Promise<JSON> => {
            const response = await fetch(`${process.env.RATP_API}${query}`);
            const result = response.json();
            if (response.status === 200) {
                return result;
            }
            throw new Error(result);
        },
    };

    return api;
}

