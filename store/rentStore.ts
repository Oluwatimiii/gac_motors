import { create } from 'zustand'

interface RentState {
  startDate: Date | null
  endDate: Date | null
  isAppointedDriver: boolean
  vehicleId: string | null
  driverId: string | null
  totalAmount: number
  setStartDate: (date: Date) => void
  setEndDate: (date: Date | null) => void
  setIsAppointedDriver: (isAppointed: boolean) => void
  setVehicleId: (id: string) => void
  setDriverId: (id: string) => void
  setTotalAmount: (amount: number) => void
  reset: () => void
}

export const useRentStore = create<RentState>((set) => ({
  startDate: null,
  endDate: null,
  isAppointedDriver: false,
  vehicleId: null,
  driverId: null,
  totalAmount: 0,
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setIsAppointedDriver: (isAppointed) => set({ isAppointedDriver: isAppointed }),
  setVehicleId: (id) => set({ vehicleId: id }),
  setDriverId: (id) => set({ driverId: id }),
  setTotalAmount: (amount) => set({ totalAmount: amount }),
  reset: () => set({ startDate: null, endDate: null, isAppointedDriver: false, vehicleId: null, totalAmount: 0, driverId: null }),
}))