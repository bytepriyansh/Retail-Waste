import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const GOOGLE_MAPS_API_KEY = "AIzaSyBtf5CJ2Q18CytRrWxOeHW_q2u_G4rNvxs";

/**
 * Geocode a full address string to {lat, lng} using Google Maps Geocoding API
 */
export async function geocodeAddress(
  address: string
): Promise<{ lat: number; lng: number } | null> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${GOOGLE_MAPS_API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.status === "OK" && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      console.error(
        "Geocoding failed for address:",
        address,
        "Status:",
        data.status,
        "Error:",
        data.error_message,
        "Response:",
        data
      );
    }
  } catch (err) {
    console.error("Error during geocoding fetch for address:", address, err);
  }
  return null;
}

/**
 * Fetch nearby places (stores, NGOs, community centers, etc.) using backend proxy
 * @param lat Latitude
 * @param lng Longitude
 * @param type Place type (e.g., 'supermarket', 'store', etc.)
 * @param radius Search radius in meters (default 3000)
 */
export async function fetchNearbyPlaces(
  lat: number,
  lng: number,
  type: string = "supermarket|store|church|school|mosque|hindu_temple|synagogue|food_bank",
  radius: number = 3000
): Promise<
  Array<{
    name: string;
    address: string;
    place_id: string;
    location: { lat: number; lng: number };
  }>
> {
  const url = `/api/places?lat=${lat}&lng=${lng}&type=${encodeURIComponent(
    type
  )}&radius=${radius}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(
        "Failed to fetch nearby places:",
        url,
        res.status,
        res.statusText
      );
      throw new Error("Failed to fetch nearby places");
    }
    const data = await res.json();
    if (data.status === "OK" && data.results.length > 0) {
      return data.results.map((place: any) => ({
        name: place.name,
        address: place.vicinity,
        place_id: place.place_id,
        location: place.geometry.location,
      }));
    } else {
      console.error("Nearby places API error:", data.status, data.error_message, data);
    }
  } catch (err) {
    console.error("Error during fetchNearbyPlaces for lat/lng:", lat, lng, err);
  }
  return [];
}

// Helper to build a full address string from inventory item fields
export function buildFullAddress(item: any): string {
  const address = [
    item.flatNumber,
    item.apartmentNumber,
    item.street,
    item.city,
    item.state,
    item.zip,
  ]
    .filter(Boolean)
    .join(", ");
  if (!address) {
    console.warn("buildFullAddress: Inventory item is missing address fields:", item);
  }
  return address;
}
