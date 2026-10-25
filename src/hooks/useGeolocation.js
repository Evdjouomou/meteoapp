import { useEffect, useState } from "react";
import { fetchPlaceName } from "../services/reverseGeocodingService";

const FALLbACK_NAME = "Ma position";

export default function useGeolocation() {
    const [state, setState] = useState({ status: "pending", place: null })

    useEffect(() => {
        if(!("geolocation" in navigator)) {
            setState({ status: "unavailable", place: null });
            return;
        }

        let cancelled = false;

        navigator.geolocation.getCurrentPosition(
            async(position) => {
                const { latitude, longitude } = position.coords;

                let found = { name: "", country: "" }
                try {
                    found = await fetchPlaceName(latitude, longitude);
                } catch {

                }

                if (cancelled) return;

                setState({
                    status: "granted",
                    place: {
                        name: found.name || FALLBACK_NAME,
                        country: found.country,
                        latitude: latitude,
                        longitude: longitude,
                    },
                });
            },
            () => {
                if (!cancelled) setState({ status: "failed", place: null })
            },
            { timeout: 10000, maximumAge: 600000}
        );

        return () => {
            cancelled = true;
        };
    }, []);

    return state;
}