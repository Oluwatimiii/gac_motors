import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
 
interface User {
  id?: string
  name?: string
  email?: string
  image?: any
  address?: string
  phoneNumber?: string
}

 export interface UserAuthState {
  user: User | null
  setAuth: (authUser: User | null) => void
  setUserData: (userData: Partial<User>) => void
  isHydrated: boolean
  setIsHydrated: (state: boolean) => void
}

export const useUserStore = create<UserAuthState>()(
    persist(
      (set, get) => ({
        user: null,
        isHydrated: false,
        setAuth: (authUser) => set({ user: authUser }),
        setUserData: (userData) => 
          set((state) => ({ 
            user: state.user ? { ...state.user, ...userData } : userData 
          })),
        setIsHydrated: (state: boolean) => set({ isHydrated: state })
        }),
        { 
        name: 'userStore', 
        storage: createJSONStorage(() => AsyncStorage),   
        onRehydrateStorage: () => (state) => {
            state?.setIsHydrated(true)
        }
      },
    )
)