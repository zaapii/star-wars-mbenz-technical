import { vi } from 'vitest'
import { ref } from 'vue'

vi.mock('vue-sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
}));

vi.mock('@/services/api', () => ({
  useSwApiQuery: vi.fn(() => ({
    data: ref([]),
    isLoading: ref(false),
    isError: ref(false),
    error: ref(null),
    refetch: vi.fn(),
  })),
}));


global.fetch = vi.fn(() => 
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({ results: [], count: 0 }),
  })
) as any; 