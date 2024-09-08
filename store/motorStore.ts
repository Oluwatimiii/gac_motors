import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
 
interface User {
  id?: string
  name?: string
  email?: string
}

 export interface UserAuthState {
  user: User | null
  setAuth: (authUser: User | null) => void
  setUserData: (userData: Partial<User>) => void
}

export const useUserStore = create<UserAuthState>()(
    persist(
      (set, get) => ({
        user: null,
        setAuth: (authUser) => set({ user: authUser }),
        setUserData: (userData) => 
          set((state) => ({ 
            user: state.user ? { ...state.user, ...userData } : userData 
          })),
      }),
      { 
        name: 'userStore', 
        storage: createJSONStorage(() => AsyncStorage)   
      },
    )
)