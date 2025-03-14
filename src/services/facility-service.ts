import type { Facility, FacilityMatchResult } from "@/src/types/facility";

const facilities: Facility[] = [
  {
    id: "1",
    name: "University Hospital of Ludwig Maximilian University of Munich",
    address: "Mathildenstraße 8, 80336 Munich, Germany",
    careType: "Stationary",
    servesZipCodes: "10000-14999",
    facilityZipCode: "12000",
    capacity: "Available",
    zipCodeStart: 10000,
    zipCodeEnd: 14999,
  },
  {
    id: "2",
    name: "University Hospital Rechts der Isar Munich",
    address: "Ismaninger Str. 22, 81675 Munich, Germany",
    careType: "Stationary",
    servesZipCodes: "15000-19999",
    facilityZipCode: "17000",
    capacity: "Available",
    zipCodeStart: 15000,
    zipCodeEnd: 19999,
  },
  {
    id: "3",
    name: "Charité - Universitätsmedizin Berlin",
    address: "Charitéplatz 1, 10117 Berlin, Germany",
    careType: "Ambulatory",
    servesZipCodes: "20000-24999",
    facilityZipCode: "22000",
    capacity: "Available",
    zipCodeStart: 20000,
    zipCodeEnd: 24999,
  },
  {
    id: "4",
    name: "University Medical Center Hamburg-Eppendorf",
    address: "Martinistraße 52, 20246 Hamburg, Germany",
    careType: "Ambulatory",
    servesZipCodes: "25000-29999",
    facilityZipCode: "27000",
    capacity: "Available",
    zipCodeStart: 25000,
    zipCodeEnd: 29999,
  },
  {
    id: "5",
    name: "Heidelberg University Hospital",
    address: "Im Neuenheimer Feld 672, 69120 Heidelberg, Germany",
    careType: "Stationary & Ambulatory",
    servesZipCodes: "10000-24999",
    facilityZipCode: "18000",
    capacity: "Available",
    zipCodeStart: 10000,
    zipCodeEnd: 24999,
  },
];

export function findMatchingFacilities(
  careType: string,
  zipCode: string,
): FacilityMatchResult {
  if (careType.toLowerCase() === "daycare") {
    return { matched: false, facilities: [] };
  }

  const patientZip = parseInt(zipCode, 10);

  const matchingFacilities = facilities.filter((facility) => {
    if (careType.toLowerCase() === "stationary") {
      return (
        facility.careType === "Stationary" ||
        facility.careType === "Stationary & Ambulatory"
      );
    }
    if (careType.toLowerCase() === "ambulatory") {
      return (
        facility.careType === "Ambulatory" ||
        facility.careType === "Stationary & Ambulatory"
      );
    }
    return false;
  });

  const servingFacilities = matchingFacilities.filter(
    (facility) =>
      patientZip >= facility.zipCodeStart && patientZip <= facility.zipCodeEnd,
  );

  if (servingFacilities.length === 0) {
    return { matched: false, facilities: [] };
  }

  const facilitiesWithDistance = servingFacilities.map((facility) => ({
    ...facility,
    distance: Math.abs(patientZip - parseInt(facility.facilityZipCode, 10)),
  }));

  const availableFacilities = facilitiesWithDistance.filter(
    (facility) =>
      facility.capacity === "Available" && facility.distance <= 3000,
  );
  
  availableFacilities.sort((a, b) => a.distance - b.distance);

  if (availableFacilities.length > 0) {
    return { matched: true, facilities: availableFacilities };
  }

  return { matched: false, facilities: [] };
}

export const facilityService = {
  findMatchingFacilities,
};
