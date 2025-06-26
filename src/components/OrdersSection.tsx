import { useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Eye,
  Download,
  Filter,
  Search,
  Calendar,
  User,
  CreditCard,
  Package
} from "lucide-react"

// Типы для заказов
interface Order {
  id: string
  customerName: string
  email: string
  course: string
  amount: number
  status: 'pending' | 'completed' | 'cancelled' | 'processing'
  date: string
  paymentMethod: string
}

// Данные заказов
const ordersData: Order[] = [
  {
    id: "ORD-001",
    customerName: "Иван Петров",
    email: "ivan.petrov@email.com",
    course: "Базовый курс пилотирования БПЛА",
    amount: 45000,
    status: "completed",
    date: "2024-06-25",
    paymentMethod: "Банковская карта"
  },
  {
    id: "ORD-002",
    customerName: "Мария Сидорова",
    email: "maria.sidorova@email.com",
    course: "Продвинутый курс коммерческого пилотирования",
    amount: 85000,
    status: "processing",
    date: "2024-06-24",
    paymentMethod: "Банковский перевод"
  },
  {
    id: "ORD-003",
    customerName: "Алексей Козлов",
    email: "alexey.kozlov@email.com",
    course: "Курс аэрофотосъемки и картографии",
    amount: 62000,
    status: "pending",
    date: "2024-06-24",
    paymentMethod: "Банковская карта"
  },
  {
    id: "ORD-004",
    customerName: "Светлана Волкова",
    email: "svetlana.volkova@email.com",
    course: "Базовый курс пилотирования БПЛА",
    amount: 45000,
    status: "cancelled",
    date: "2024-06-23",
    paymentMethod: "Банковская карта"
  },
  {
    id: "ORD-005",
    customerName: "Дмитрий Новиков",
    email: "dmitry.novikov@email.com",
    course: "Инструкторский курс",
    amount: 120000,
    status: "completed",
    date: "2024-06-22",
    paymentMethod: "Банковский перевод"
  }
]

const getStatusBadge = (status: Order['status']) => {
  switch (status) {
    case 'completed':
      return <Badge variant="default" className="bg-green-500">Завершен</Badge>
    case 'processing':
      return <Badge variant="default" className="bg-blue-500">В обработке</Badge>
    case 'pending':
      return <Badge variant="outline">Ожидает оплаты</Badge>
    case 'cancelled':
      return <Badge variant="destructive">Отменен</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB'
  }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function OrdersSection() {
  const [orders] = useState<Order[]>(ordersData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: orders.length,
    completed: orders.filter(o => o.status === 'completed').length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    totalRevenue: orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.amount, 0)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Заказы</h1>
        <p className="text-muted-foreground">Управление заказами и платежами</p>
      </div>

      {/* Статистика */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего заказов</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Завершенные</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">В обработке</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.processing + stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Общая выручка</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatAmount(stats.totalRevenue)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Фильтры */}
      <Card>
        <CardHeader>
          <CardTitle>Фильтры и поиск</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по имени, email или номеру заказа..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Статус заказа" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="pending">Ожидает оплаты</SelectItem>
                <SelectItem value="processing">В обработке</SelectItem>
                <SelectItem value="completed">Завершен</SelectItem>
                <SelectItem value="cancelled">Отменен</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Экспорт
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Таблица заказов */}
      <Card>
        <CardHeader>
          <CardTitle>Список заказов</CardTitle>
          <CardDescription>
            Найдено {filteredOrders.length} заказов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Список всех заказов в системе</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>№ заказа</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Курс</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-sm text-muted-foreground">{order.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{order.course}</TableCell>
                  <TableCell className="font-medium">{formatAmount(order.amount)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Детали заказа {order.id}</DialogTitle>
                            <DialogDescription>
                              Подробная информация о заказе
                            </DialogDescription>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Информация о клиенте
                                  </h4>
                                  <p className="text-sm text-muted-foreground">Имя: {selectedOrder.customerName}</p>
                                  <p className="text-sm text-muted-foreground">Email: {selectedOrder.email}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold flex items-center gap-2">
                                    <Package className="h-4 w-4" />
                                    Детали заказа
                                  </h4>
                                  <p className="text-sm text-muted-foreground">Курс: {selectedOrder.course}</p>
                                  <p className="text-sm text-muted-foreground">Сумма: {formatAmount(selectedOrder.amount)}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold flex items-center gap-2">
                                  <CreditCard className="h-4 w-4" />
                                  Оплата и статус
                                </h4>
                                <div className="flex items-center gap-4 mt-2">
                                  <span>Статус: {getStatusBadge(selectedOrder.status)}</span>
                                  <span className="text-sm text-muted-foreground">Способ оплаты: {selectedOrder.paymentMethod}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">
                                  <Calendar className="h-4 w-4 inline mr-1" />
                                  Дата заказа: {formatDate(selectedOrder.date)}
                                </p>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
