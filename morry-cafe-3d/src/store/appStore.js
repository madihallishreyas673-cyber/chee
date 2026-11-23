import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

const MENU_CATEGORIES = [
  { id: 'coffee', name: '☕ Coffee', icon: '☕' },
  { id: 'tea', name: '🍵 Tea', icon: '🍵' },
  { id: 'pastries', name: '🥐 Pastries', icon: '🥐' },
  { id: 'sandwiches', name: '🥪 Sandwiches', icon: '🥪' },
  { id: 'desserts', name: '🍰 Desserts', icon: '🍰' },
  { id: 'cold', name: '🧊 Cold Drinks', icon: '🧊' }
]

const MENU_ITEMS = [
  // Coffee
  { id: 'espresso', name: 'Espresso', description: 'Rich, bold single shot', price: 3.50, category: 'coffee', emoji: '☕' },
  { id: 'americano', name: 'Americano', description: 'Espresso with hot water', price: 4.00, category: 'coffee', emoji: '☕' },
  { id: 'cappuccino', name: 'Cappuccino', description: 'Espresso, steamed milk, foam', price: 5.00, category: 'coffee', emoji: '☕' },
  { id: 'latte', name: 'Latte', description: 'Espresso with steamed milk', price: 5.00, category: 'coffee', emoji: '🥛' },
  { id: 'mocha', name: 'Mocha', description: 'Espresso, chocolate, steamed milk', price: 5.50, category: 'coffee', emoji: '🍫' },
  { id: 'flat-white', name: 'Flat White', description: 'Double shot, microfoam milk', price: 5.00, category: 'coffee', emoji: '☕' },
  { id: 'macchiato', name: 'Macchiato', description: 'Espresso with milk foam', price: 4.50, category: 'coffee', emoji: '☕' },
  { id: 'cold-brew', name: 'Cold Brew', description: 'Steeped 18 hours, smooth', price: 5.50, category: 'coffee', emoji: '🧊' },

  // Tea
  { id: 'earl-grey', name: 'Earl Grey', description: 'Bergamot black tea', price: 4.00, category: 'tea', emoji: '🍵' },
  { id: 'green-tea', name: 'Green Tea', description: 'Fresh Japanese sencha', price: 4.00, category: 'tea', emoji: '🍵' },
  { id: 'chai-latte', name: 'Chai Latte', description: 'Spiced tea with steamed milk', price: 5.00, category: 'tea', emoji: '🫖' },
  { id: 'matcha-latte', name: 'Matcha Latte', description: 'Ceremonial grade matcha', price: 5.50, category: 'tea', emoji: '🍵' },
  { id: 'herbal-tea', name: 'Herbal Blend', description: 'Caffeine-free chamomile mint', price: 4.00, category: 'tea', emoji: '🌿' },

  // Pastries
  { id: 'croissant', name: 'Butter Croissant', description: 'Flaky, golden, baked fresh', price: 4.50, category: 'pastries', emoji: '🥐' },
  { id: 'pain-chocolat', name: 'Pain au Chocolat', description: 'Croissant with dark chocolate', price: 5.00, category: 'pastries', emoji: '🍫' },
  { id: 'cinnamon-roll', name: 'Cinnamon Roll', description: 'Warm, gooey, cream cheese frosting', price: 5.50, category: 'pastries', emoji: '🍯' },
  { id: 'almond-croissant', name: 'Almond Croissant', description: 'Frangipane filling, toasted almonds', price: 5.50, category: 'pastries', emoji: '🌰' },
  { id: 'danish', name: 'Fruit Danish', description: 'Seasonal fruit, vanilla custard', price: 5.00, category: 'pastries', emoji: '🍓' },

  // Sandwiches
  { id: 'avocado-toast', name: 'Avocado Toast', description: 'Sourdough, smashed avo, chili flakes', price: 9.00, category: 'sandwiches', emoji: '🥑' },
  { id: 'blt', name: 'BLT Sandwich', description: 'Bacon, lettuce, tomato, aioli', price: 10.00, category: 'sandwiches', emoji: '🥓' },
  { id: 'chicken-pesto', name: 'Chicken Pesto', description: 'Grilled chicken, basil pesto, mozzarella', price: 11.00, category: 'sandwiches', emoji: '🍗' },
  { id: 'veggie-wrap', name: 'Mediterranean Wrap', description: 'Hummus, roasted veg, feta, greens', price: 9.50, category: 'sandwiches', emoji: '🥗' },
  { id: 'club-sandwich', name: 'Club Sandwich', description: 'Triple-decker, turkey, bacon, egg', price: 12.00, category: 'sandwiches', emoji: '🥪' },

  // Desserts
  { id: 'tiramisu', name: 'Tiramisu', description: 'Classic Italian, mascarpone, espresso', price: 7.00, category: 'desserts', emoji: '🍰' },
  { id: 'cheesecake', name: 'NY Cheesecake', description: 'Creamy, graham cracker crust', price: 7.00, category: 'desserts', emoji: '🍰' },
  { id: 'chocolate-cake', name: 'Chocolate Fudge Cake', description: 'Rich, dense, ganache frosting', price: 7.50, category: 'desserts', emoji: '🍫' },
  { id: 'fruit-tart', name: 'Fresh Fruit Tart', description: 'Vanilla custard, seasonal fruits', price: 6.50, category: 'desserts', emoji: '🍓' },
  { id: 'affogato', name: 'Affogato', description: 'Vanilla gelato drowned in espresso', price: 6.00, category: 'desserts', emoji: '🍨' },

  // Cold Drinks
  { id: 'iced-latte', name: 'Iced Latte', description: 'Espresso, cold milk, ice', price: 5.00, category: 'cold', emoji: '🧊' },
  { id: 'iced-matcha', name: 'Iced Matcha Latte', description: 'Ceremonial matcha, cold milk', price: 6.00, category: 'cold', emoji: '🍵' },
  { id: 'lemonade', name: 'Fresh Lemonade', description: 'Hand-squeezed, mint garnish', price: 4.50, category: 'cold', emoji: '🍋' },
  { id: 'iced-tea', name: 'Iced Tea', description: 'Cold brewed, peach or classic', price: 4.00, category: 'cold', emoji: '🧊' },
  { id: 'smoothie', name: 'Berry Smoothie', description: 'Mixed berries, banana, yogurt', price: 6.50, category: 'cold', emoji: '🥤' },
  { id: 'frappuccino', name: 'Caramel Frappuccino', description: 'Blended coffee, caramel, cream', price: 6.50, category: 'cold', emoji: '🧊' }
]

export const useAppStore = create((set, get) => ({
  // Tables
  tables: [],
  setTables: (tables) => set({ tables }),
  updateTableStatus: (tableId, status, order = null) =>
    set((state) => ({
      tables: state.tables.map((t) =>
        t.id === tableId ? { ...t, status, currentOrder: order } : t
      )
    })),

  // Menu
  menuCategories: MENU_CATEGORIES,
  menuItems: MENU_ITEMS,
  selectedCategory: 'coffee',
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  // Cart
  cart: [],
  cartTableId: null,
  addToCart: (item, tableId) =>
    set((state) => {
      const existing = state.cart.find((c) => c.item.id === item.id)
      let newCart
      if (existing) {
        newCart = state.cart.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      } else {
        newCart = [...state.cart, { id: uuidv4(), item, quantity: 1 }]
      }
      return { cart: newCart, cartTableId: tableId }
    }),
  updateQuantity: (cartItemId, quantity) =>
    set((state) => ({
      cart: quantity <= 0
        ? state.cart.filter((c) => c.id !== cartItemId)
        : state.cart.map((c) => (c.id === cartItemId ? { ...c, quantity } : c))
    })),
  removeFromCart: (cartItemId) =>
    set((state) => ({
      cart: state.cart.filter((c) => c.id !== cartItemId)
    })),
  clearCart: () => set({ cart: [], cartTableId: null }),

  // Orders
  orders: [],
  addOrder: (order) =>
    set((state) => ({
      orders: [order, ...state.orders]
    })),
  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o
      )
    })),
  getOrdersByStatus: (status) =>
    get().orders.filter((o) => o.status === status),

  // Notifications
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        { id: uuidv4(), ...notification, timestamp: new Date().toISOString() },
        ...state.notifications.slice(0, 49)
      ]
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id)
    })),

  // UI State
  isOrderModalOpen: false,
  openOrderModal: (tableId) => set({ isOrderModalOpen: true, cartTableId: tableId }),
  closeOrderModal: () => set({ isOrderModalOpen: false }),

  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  // Staff view
  staffActiveTab: 'pending',
  setStaffActiveTab: (tab) => set({ staffActiveTab: tab })
}))