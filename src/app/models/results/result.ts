
export interface Result{
  date: string
  medicineSupply: string
  side: string
  accelData: Accel
  tappingData: Tapping
}

export interface Accel{
  timestamp: string[]
  x: string[]
  y: string[]
  z: string[]
}

export interface Tapping{
  timestamp: string[]
  upDown: string[]
  x: string[]
  y: string[]
  clickSide: string[]
}
