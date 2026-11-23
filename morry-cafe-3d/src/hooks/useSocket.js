import { useEffect, useRef, useCallback } from 'react'
import { io } from 'socket.io-client'
import { useAppStore } from '../store/appStore'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001'

export function useSocket() {
  const socketRef = useRef(null)
  const { addNotification, updateOrderStatus, updateTableStatus, orders } = useAppStore()

  const initSocket = useCallback(() => {
    if (socketRef.current?.connected) return

    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    })

    socketRef.current.on('connect', () => {
      console.log('Socket connected:', socketRef.current.id)
      addNotification({
        type: 'info',
        title: 'Connected',
        message: 'Real-time updates enabled'
      })
    })

    socketRef.current.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason)
      addNotification({
        type: 'error',
        title: 'Disconnected',
        message: 'Real-time updates paused'
      })
    })

    socketRef.current.on('order:new', (order) => {
      addNotification({
        type: 'info',
        title: 'New Order',
        message: `Table ${order.tableNumber} - ${order.items.length} items`
      })
      // The order will be added via the REST API response
    })

    socketRef.current.on('order:status', ({ orderId, status }) => {
      updateOrderStatus(orderId, status)
      addNotification({
        type: status === 'ready' ? 'success' : 'info',
        title: 'Order Update',
        message: `Order ${orderId.slice(0, 8)} is now ${status}`
      })
    })

    socketRef.current.on('table:status', ({ tableId, status }) => {
      updateTableStatus(tableId, status)
    })

    socketRef.current.on('morry:alert', (data) => {
      addNotification({
        type: 'info',
        title: 'Morry\'s Attention',
        message: data.message
      })
    })

    return socketRef.current
  }, [addNotification, updateOrderStatus, updateTableStatus])

  const emit = useCallback((event, data) => {
    socketRef.current?.emit(event, data)
  }, [])

  const disconnect = useCallback(() => {
    socketRef.current?.disconnect()
    socketRef.current = null
  }, [])

  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  return { socket: socketRef.current, initSocket, emit, disconnect }
}