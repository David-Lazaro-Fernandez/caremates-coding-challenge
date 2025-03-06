export const facilities = [
    {
      id: "A",
      careType: "Stationary",
      servesZipCodes: "10000-14999",
      facilityZipCode: "12000",
      capacity: "Full",
      zipCodeStart: 10000,
      zipCodeEnd: 14999,
    },
    {
      id: "B",
      careType: "Stationary",
      servesZipCodes: "15000-19999",
      facilityZipCode: "17000",
      capacity: "Available",
      zipCodeStart: 15000,
      zipCodeEnd: 19999,
    },
    {
      id: "C",
      careType: "Ambulatory",
      servesZipCodes: "20000-24999",
      facilityZipCode: "22000",
      capacity: "Full",
      zipCodeStart: 20000,
      zipCodeEnd: 24999,
    },
    {
      id: "D",
      careType: "Ambulatory",
      servesZipCodes: "25000-29999",
      facilityZipCode: "27000",
      capacity: "Available",
      zipCodeStart: 25000,
      zipCodeEnd: 29999,
    },
    {
      id: "E",
      careType: "Stationary & Ambulatory",
      servesZipCodes: "10000-24999",
      facilityZipCode: "18000",
      capacity: "Available",
      zipCodeStart: 10000,
      zipCodeEnd: 24999,
    },
  ]
  
  function parseZip(zip: string): number {
    return Number.parseInt(zip, 10);
  }
  
  function facilityMatchesCareType(requiredCareType: string, facilityCareType: string): boolean {
    if (requiredCareType === "stationary") {
      return facilityCareType === "Stationary" || facilityCareType === "Stationary & Ambulatory";
    }
    if (requiredCareType === "ambulatory") {
      return facilityCareType === "Ambulatory" || facilityCareType === "Stationary & Ambulatory";
    }
    return false;
  }
  
  function patientZipWithinFacilityRange(patientZip: number, facility: typeof facilities[number]): boolean {
    return patientZip >= facility.zipCodeStart && patientZip <= facility.zipCodeEnd;
  }
  
  function calculateDistance(patientZip: number, facilityZip: string): number {
    return Math.abs(parseZip(facilityZip) - patientZip);
  }
  
  export function findMatchingFacility(careType: string, zipCode: string) {
    const patientZip = parseZip(zipCode);
  
    const careTypeMatchedFacilities = facilities.filter(facility =>
      facilityMatchesCareType(careType, facility.careType)
    );
  
    const facilitiesServingPatient = careTypeMatchedFacilities.filter(facility =>
      patientZipWithinFacilityRange(patientZip, facility)
    );
  
    if (facilitiesServingPatient.length === 0) {
      return { matched: false };
    }
  
    const facilitiesSortedByDistance = facilitiesServingPatient.sort((a, b) =>
      calculateDistance(patientZip, a.facilityZipCode) - calculateDistance(patientZip, b.facilityZipCode)
    );
  
    const nearestFacilityWithCapacity = facilitiesSortedByDistance.find(facility => facility.capacity === "Available");
  
    if (nearestFacilityWithCapacity) {
      return { matched: true, facility: nearestFacilityWithCapacity };
    }
  
    const anyAvailableFacility = careTypeMatchedFacilities
      .filter(facility => facility.capacity === "Available")
      .sort((a, b) =>
        calculateDistance(patientZip, a.facilityZipCode) - calculateDistance(patientZip, b.facilityZipCode)
      )[0];
  
    if (anyAvailableFacility && calculateDistance(patientZip, anyAvailableFacility.facilityZipCode) <= 3000) {
      return { matched: true, facility: anyAvailableFacility };
    }
  
    return { matched: false };
  }
  