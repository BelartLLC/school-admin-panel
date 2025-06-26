import { useState } from "react"
import {
  Home,
  BookOpen,
  GraduationCap,
  FileText,
  Download,
  CreditCard,
  ShoppingCart,
  Video,
  FolderOpen,
  BarChart3,
  Users,
  ClipboardList,
  HelpCircle,
  Award,
  Play,
  Globe,
  ArrowUpDown,
  Search,
  Network,
  Settings,
  Info,
  DollarSign,
  Newspaper
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import OrdersSection from "./components/OrdersSection"
import CoursesSection from "./components/CoursesSection"
import LessonsSection from "./components/LessonsSection"



const menuItems = [
  { id: 'home', label: 'Главная', icon: Home },
  { id: 'courses', label: 'Курсы', icon: BookOpen },
  { id: 'lessons', label: 'Уроки', icon: GraduationCap },
  { id: 'tests', label: 'Тесты', icon: FileText },
  { id: 'access', label: 'Доступы', icon: Download },
  { id: 'payments', label: 'Платежные формы', icon: CreditCard },
  { id: 'orders', label: 'Заказы', icon: ShoppingCart },
  { id: 'video', label: 'Видео хранилище', icon: Video },
  { id: 'files', label: 'Файлы', icon: FolderOpen },
  { id: 'authors-stats', label: 'Статистика авторов', icon: BarChart3 },
  { id: 'accounts', label: 'Аккаунты', icon: Users },
  { id: 'homework', label: 'Домашние задания', icon: ClipboardList },
  { id: 'questions', label: 'Вопросы учеников', icon: HelpCircle },
  { id: 'certificates', label: 'Сертификаты', icon: Award },
  { id: 'webinars', label: 'Вебинары', icon: Play },
  { id: 'site', label: 'Сайт', icon: Globe },
  { id: 'import-export', label: 'Импорт и экспорт', icon: ArrowUpDown },
  { id: 'search', label: 'Поиск по ключу', icon: Search },
  { id: 'ip-manager', label: 'Менеджер IP', icon: Network },
  { id: 'settings', label: 'Настройки', icon: Settings },
  { id: 'learning-lessons', label: 'Обучающие уроки', icon: GraduationCap },
  { id: 'documentation', label: 'Документация', icon: FileText },
  { id: 'about-system', label: 'О системе', icon: Info },
  { id: 'payment-tariffs', label: 'Оплата и тарифы', icon: DollarSign },
  { id: 'system-news', label: 'Новости системы', icon: Newspaper },
]

function App() {
  const [activeSection, setActiveSection] = useState('home')

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Главная</h1>
              <p className="text-muted-foreground">Обзор системы управления обучением БПЛА</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Всего студентов</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">+12% с прошлого месяца</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Активные курсы</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-muted-foreground">+2 новых курса</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Заказы сегодня</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">47</div>
                  <p className="text-xs text-muted-foreground">+8% с вчера</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Доход за месяц</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₽892,340</div>
                  <p className="text-xs text-muted-foreground">+15% с прошлого месяца</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case 'orders':
        return <OrdersSection />
      case 'courses':
        return <CoursesSection />
      case 'lessons':
        return <LessonsSection />
      default:
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {menuItems.find(item => item.id === activeSection)?.label}
              </h1>
              <p className="text-muted-foreground">
                Раздел "{menuItems.find(item => item.id === activeSection)?.label}" в разработке
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Функционал в разработке</CardTitle>
                <CardDescription>
                  Этот раздел будет содержать все необходимые инструменты для управления {menuItems.find(item => item.id === activeSection)?.label.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Скоро здесь появится полный функционал для работы с данным разделом.
                </p>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Школа БПЛА</h2>
                <p className="text-xs text-muted-foreground">Админ панель</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    isActive={activeSection === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-6">
          <div className="flex items-center gap-4 mb-6">
            <SidebarTrigger />
            <div className="h-4 w-px bg-border" />
            <div className="text-sm text-muted-foreground">
              Русская школа внешних пилотов - Админ панель
            </div>
          </div>
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  )
}

export default App
