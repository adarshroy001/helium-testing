// stores/useProductStore.ts - Advanced TypeScript version
import { create } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'
import { Product, BackendProduct } from '@/types/types'
import { transformBackendProducts } from '@/lib/productTransformer'

// API Response type
interface ProductsApiResponse {
  products: BackendProduct[]
  success: boolean
  message?: string
}

// Store state interface
interface ProductState {
  products: Product[]
  isLoading: boolean
  lastFetched: number | null
  error: string | null
}

// Store actions interface
interface ProductActions {
  fetchProducts: () => Promise<Product[]>
  clearCache: () => void
  refreshProducts: () => Promise<void>
  getProductById: (id: string) => Product | undefined
}

// Complete store interface
interface ProductStore extends ProductState, ProductActions {}

// Persist options type
type ProductPersist = (
  config: (
    set: (partial: Partial<ProductStore>) => void,
    get: () => ProductStore
  ) => ProductStore,
  options: PersistOptions<ProductStore>
) => (
  set: (partial: Partial<ProductStore>) => void,
  get: () => ProductStore
) => ProductStore

// Create the typed store with enhanced functionality
export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      // State
      products: [],
      isLoading: false,
      lastFetched: null,
      error: null,
      
      // Actions
      fetchProducts: async (): Promise<Product[]> => {
        const { products, lastFetched } = get()
        const now = Date.now()
        
        // Use cache if data is fresh (5 minutes)
        if (products.length > 0 && lastFetched && now - lastFetched < 5 * 60 * 1000) {
          return products
        }
        
        set({ isLoading: true, error: null })
        
        try {
          const res = await fetch('/api/products', {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          
          if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.status}`)
          }
          
          const data: ProductsApiResponse = await res.json()
          const transformedProducts = transformBackendProducts(data.products)
          
          set({
            products: transformedProducts,
            isLoading: false,
            lastFetched: now,
            error: null
          })
          
          return transformedProducts
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
          
          set({ 
            isLoading: false, 
            error: errorMessage 
          })
          
          throw error
        }
      },
      
      refreshProducts: async (): Promise<void> => {
        // Force refresh by clearing cache first
        set({ lastFetched: null })
        await get().fetchProducts()
      },
      
      clearCache: (): void => {
        set({ 
          products: [], 
          lastFetched: null,
          error: null 
        })
      },
      
      getProductById: (id: string): Product | undefined => {
        const { products } = get()
        return products.find(product => product.id === id || product.backendId === id)
      }
    }),
    {
      name: 'helium-products',
      partialize: (state: ProductStore) => ({
        products: state.products,
        lastFetched: state.lastFetched
      }),
      // Add version for cache invalidation
      version: 1,
    }
  )
)

// Selector hooks for better performance
export const useProducts = () => useProductStore((state) => state.products)
export const useIsLoading = () => useProductStore((state) => state.isLoading)
export const useError = () => useProductStore((state) => state.error)
export const useFetchProducts = () => useProductStore((state) => state.fetchProducts)
export const useClearCache = () => useProductStore((state) => state.clearCache)

// Export types
export type { ProductStore, ProductState, ProductActions, ProductsApiResponse }
