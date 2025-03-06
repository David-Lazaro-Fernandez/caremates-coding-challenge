export interface Facility {
    id: string
    name: string
    address: string
    careType: string
    servesZipCodes: string
    facilityZipCode: string
    capacity: string
    zipCodeStart: number
    zipCodeEnd: number
  }
  
  export interface FacilityMatchResult {
    matched: boolean
    facilities?: Facility[]
  }
  
  