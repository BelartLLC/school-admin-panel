import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  Users,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MoreHorizontal,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  Eye,
  Download,
  Filter,
  BookOpen,
  Award,
  Clock,
  Calendar
} from "lucide-react"

interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  status: 'active' | 'blocked' | 'pending'
  courses: { id: string; name: string; progress: number; enrolledDate: string }[]
  registeredDate: string
  lastActivity: string
  totalSpent: number
  certificatesCount: number
}

interface Author {
  id: string
  firstName: string
  lastName: string
  email: string
  role: 'admin' | 'instructor' | 'moderator'
  coursesCount: number
  studentsCount: number
  status: 'active' | 'inactive'
  createdDate: string
}

const studentsData: Student[] = [
  {
    id: "STD-001",
    firstName: "Иван",
    lastName: "Петров",
    email: "ivan.petrov@email.com",
    phone: "+7 (999) 123-45-67",
    status: "active",
    courses: [
      { id: "CRS-001", name: "Базовый курс пилотирования БПЛА", progress: 75, enrolledDate: "2024-03-15" },
      { id: "CRS-002", name: "Продвинутый курс", progress: 30, enrolledDate: "2024-05-20" }
    ],
    registeredDate: "2024-02-10",
    lastActivity: "2024-06-25",
    totalSpent: 130000,
    certificatesCount: 1
  },
  {
    id: "STD-002",
    firstName: "Мария",
    lastName: "Сидорова",
    email: "maria.sidorova@email.com",
    phone: "+7 (999) 234-56-78",
    status: "active",
    courses: [
      { id: "CRS-003", name: "Курс аэрофотосъемки", progress: 100, enrolledDate: "2024-01-10" }
    ],
    registeredDate: "2024-01-05",
    lastActivity: "2024-06-24",
    totalSpent: 62000,
    certificatesCount: 1
  },
  {
    id: "STD-003",
    firstName: "Алексей",
    lastName: "Козлов",
    email: "alexey.kozlov@email.com",
    phone: "+7 (999) 345-67-89",
    status: "pending",
    courses: [],
    registeredDate: "2024-06-20",
    lastActivity: "2024-06-20",
    totalSpent: 0,
    certificatesCount: 0
  },
  {
    id: "STD-004",
    firstName: "Светлана",
    lastName: "Волкова",
    email: "svetlana.volkova@email.com",
    phone: "+7 (999) 456-78-90",
    status: "blocked",
    courses: [
      { id: "CRS-001", name: "Базовый курс пилотирования БПЛА", progress: 45, enrolledDate: "2024-02-20" }
    ],
    registeredDate: "2024-02-15",
    lastActivity: "2024-04-10",
    totalSpent: 45000,
    certificatesCount: 0
  },
  {
    id: "STD-005",
    firstName: "Дмитрий",
    lastName: "Новиков",
    email: "dmitry.novikov@email.com",
    phone: "+7 (999) 567-89-01",
    status: "active",
    courses: [
      { id: "CRS-001", name: "Базовый курс пилотирования БПЛА", progress: 100, enrolledDate: "2024-01-15" },
      { id: "CRS-002", name: "Продвинутый курс", progress: 100, enrolledDate: "2024-03-10" },
      { id: "CRS-004", name: "Инструкторский курс", progress: 60, enrolledDate: "2024-05-01" }
    ],
    registeredDate: "2024-01-10",
    lastActivity: "2024-06-25",
    totalSpent: 250000,
    certificatesCount: 2
  }
]

const authorsData: Author[] = [
  {
    id: "AUTH-001",
    firstName: "Александр",
    lastName: "Ко",
    email: "aleksandr.ko@school.com",
    role: "admin",
    coursesCount: 5,
    studentsCount: 342,
    status: "active",
    createdDate: "2023-01-15"
  },
  {
    id: "AUTH-002",
    firstName: "Алексей",
    lastName: "Воронов",
    email: "alexey.voronov@school.com",
    role: "instructor",
    coursesCount: 3,
    studentsCount: 189,
    status: "active",
    createdDate: "2023-06-20"
  },
  {
    id: "AUTH-003",
    firstName: "Мария",
    lastName: "Кузнецова",
    email: "maria.kuznetsova@school.com",
    role: "instructor",
    coursesCount: 2,
    studentsCount: 156,
    status: "active",
    createdDate: "2023-09-10"
  },
  {
    id: "AUTH-004",
    firstName: "Дмитрий",
    lastName: "Соколов",
    email: "dmitry.sokolov@school.com",
    role: "moderator",
    coursesCount: 0,
    studentsCount: 0,
    status: "inactive",
    createdDate: "2024-02-05"
  }
]

const coursesForAssignment = [
  { id: "CRS-001", name: "Базовый курс пилотирования БПЛА" },
  { id: "CRS-002", name: "Продвинутый курс коммерческого пилотирования" },
  { id: "CRS-003", name: "Курс аэрофотосъемки и картографии" },
  { id: "CRS-004", name: "Инструкторский курс" }
]

const getStatusBadge = (status: Student['status']) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-500">Активен</Badge>
    case 'blocked':
      return <Badge variant="destructive">Заблокирован</Badge>
    case 'pending':
      return <Badge variant="outline">Ожидает</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const getRoleBadge = (role: Author['role']) => {
  switch (role) {
    case 'admin':
      return <Badge className="bg-purple-500">Администратор</Badge>
    case 'instructor':
      return <Badge className="bg-blue-500">Инструктор</Badge>
    case 'moderator':
      return <Badge variant="outline">Модератор</Badge>
    default:
      return <Badge variant="outline">{role}</Badge>
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(amount)
}

export default function AccountsSection() {
  const [students, setStudents] = useState<Student[]>(studentsData)
  const [authors, setAuthors] = useState<Author[]>(authorsData)
  const [activeTab, setActiveTab] = useState("students")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isCreateStudentDialogOpen, setIsCreateStudentDialogOpen] = useState(false)
  const [isCreateAuthorDialogOpen, setIsCreateAuthorDialogOpen] = useState(false)
  const [isAssignCourseDialogOpen, setIsAssignCourseDialogOpen] = useState(false)

  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    selectedCourses: [] as string[]
  })

  const [newAuthor, setNewAuthor] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "instructor" as Author['role']
  })

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || student.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredAuthors = authors.filter(author =>
    author.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    author.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    author.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateStudent = () => {
    if (!newStudent.firstName || !newStudent.lastName || !newStudent.email) return

    const student: Student = {
      id: `STD-${String(students.length + 1).padStart(3, '0')}`,
      firstName: newStudent.firstName,
      lastName: newStudent.lastName,
      email: newStudent.email,
      phone: newStudent.phone,
      status: "active",
      courses: newStudent.selectedCourses.map(courseId => ({
        id: courseId,
        name: coursesForAssignment.find(c => c.id === courseId)?.name || "",
        progress: 0,
        enrolledDate: new Date().toISOString().split('T')[0]
      })),
      registeredDate: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0],
      totalSpent: 0,
      certificatesCount: 0
    }

    setStudents([...students, student])
    setNewStudent({ firstName: "", lastName: "", email: "", phone: "", selectedCourses: [] })
    setIsCreateStudentDialogOpen(false)
  }

  const handleCreateAuthor = () => {
    if (!newAuthor.firstName || !newAuthor.lastName || !newAuthor.email) return

    const author: Author = {
      id: `AUTH-${String(authors.length + 1).padStart(3, '0')}`,
      firstName: newAuthor.firstName,
      lastName: newAuthor.lastName,
      email: newAuthor.email,
      role: newAuthor.role,
      coursesCount: 0,
      studentsCount: 0,
      status: "active",
      createdDate: new Date().toISOString().split('T')[0]
    }

    setAuthors([...authors, author])
    setNewAuthor({ firstName: "", lastName: "", email: "", role: "instructor" })
    setIsCreateAuthorDialogOpen(false)
  }

  const handleBlockStudent = (studentId: string) => {
    setStudents(students.map(s =>
      s.id === studentId ? { ...s, status: s.status === 'blocked' ? 'active' : 'blocked' as Student['status'] } : s
    ))
  }

  const handleDeleteStudent = (studentId: string) => {
    setStudents(students.filter(s => s.id !== studentId))
  }

  const stats = {
    totalStudents: students.length,
    activeStudents: students.filter(s => s.status === 'active').length,
    blockedStudents: students.filter(s => s.status === 'blocked').length,
    totalAuthors: authors.length,
    activeAuthors: authors.filter(a => a.status === 'active').length
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Аккаунты</h1>
          <p className="text-muted-foreground">Управление студентами и авторами</p>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего студентов</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активных</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeStudents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Заблокированных</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blockedStudents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Авторов/Инструкторов</CardTitle>
            <Award className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAuthors}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="students">Студенты</TabsTrigger>
          <TabsTrigger value="authors">Авторы</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          {/* Поиск и фильтры */}
          <div className="flex justify-between items-center gap-4">
            <div className="flex gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по имени, email или телефону..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="active">Активные</SelectItem>
                  <SelectItem value="blocked">Заблокированные</SelectItem>
                  <SelectItem value="pending">Ожидающие</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Экспорт
              </Button>
            </div>

            <Dialog open={isCreateStudentDialogOpen} onOpenChange={setIsCreateStudentDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить студента
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Добавление студента</DialogTitle>
                  <DialogDescription>Создайте новый аккаунт студента</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Имя</Label>
                      <Input
                        placeholder="Введите имя"
                        value={newStudent.firstName}
                        onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Фамилия</Label>
                      <Input
                        placeholder="Введите фамилию"
                        value={newStudent.lastName}
                        onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        value={newStudent.email}
                        onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Телефон</Label>
                      <Input
                        placeholder="+7 (999) 123-45-67"
                        value={newStudent.phone}
                        onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Назначить курсы</Label>
                    <div className="border rounded-md p-3 space-y-2">
                      {coursesForAssignment.map(course => (
                        <div key={course.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={course.id}
                            checked={newStudent.selectedCourses.includes(course.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setNewStudent({ ...newStudent, selectedCourses: [...newStudent.selectedCourses, course.id] })
                              } else {
                                setNewStudent({ ...newStudent, selectedCourses: newStudent.selectedCourses.filter(id => id !== course.id) })
                              }
                            }}
                          />
                          <Label htmlFor={course.id} className="text-sm font-normal cursor-pointer">
                            {course.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateStudentDialogOpen(false)}>
                      Отмена
                    </Button>
                    <Button onClick={handleCreateStudent}>
                      Создать студента
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Таблица студентов */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Студент</TableHead>
                    <TableHead>Контакты</TableHead>
                    <TableHead>Курсы</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Потрачено</TableHead>
                    <TableHead>Последняя активность</TableHead>
                    <TableHead className="w-[100px]">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{student.firstName} {student.lastName}</div>
                          <div className="text-sm text-muted-foreground">ID: {student.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3" />
                            {student.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {student.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {student.courses.length > 0 ? (
                            <>
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-3 w-3" />
                                <span className="text-sm">{student.courses.length} курс(ов)</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Award className="h-3 w-3" />
                                <span className="text-sm text-muted-foreground">{student.certificatesCount} сертификат(ов)</span>
                              </div>
                            </>
                          ) : (
                            <span className="text-sm text-muted-foreground">Нет курсов</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                      <TableCell className="font-medium">{formatAmount(student.totalSpent)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatDate(student.lastActivity)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedStudent(student)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Просмотреть
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Редактировать
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setSelectedStudent(student)
                              setIsAssignCourseDialogOpen(true)
                            }}>
                              <BookOpen className="h-4 w-4 mr-2" />
                              Назначить курс
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleBlockStudent(student.id)}>
                              {student.status === 'blocked' ? (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Разблокировать
                                </>
                              ) : (
                                <>
                                  <Ban className="h-4 w-4 mr-2" />
                                  Заблокировать
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteStudent(student.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Удалить
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredStudents.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12">
                        <div className="text-muted-foreground">
                          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Студенты не найдены</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Диалог просмотра студента */}
          <Dialog open={!!selectedStudent && !isAssignCourseDialogOpen} onOpenChange={() => setSelectedStudent(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Профиль студента</DialogTitle>
              </DialogHeader>
              {selectedStudent && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Личная информация</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-muted-foreground">Имя:</span> {selectedStudent.firstName} {selectedStudent.lastName}</p>
                        <p><span className="text-muted-foreground">Email:</span> {selectedStudent.email}</p>
                        <p><span className="text-muted-foreground">Телефон:</span> {selectedStudent.phone}</p>
                        <p><span className="text-muted-foreground">Статус:</span> {getStatusBadge(selectedStudent.status)}</p>
                        <p><span className="text-muted-foreground">Дата регистрации:</span> {formatDate(selectedStudent.registeredDate)}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Статистика</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-muted-foreground">Курсов:</span> {selectedStudent.courses.length}</p>
                        <p><span className="text-muted-foreground">Сертификатов:</span> {selectedStudent.certificatesCount}</p>
                        <p><span className="text-muted-foreground">Потрачено:</span> {formatAmount(selectedStudent.totalSpent)}</p>
                        <p><span className="text-muted-foreground">Последняя активность:</span> {formatDate(selectedStudent.lastActivity)}</p>
                      </div>
                    </div>
                  </div>

                  {selectedStudent.courses.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Курсы студента</h3>
                      <div className="border rounded-md divide-y">
                        {selectedStudent.courses.map(course => (
                          <div key={course.id} className="p-3 flex items-center justify-between">
                            <div>
                              <p className="font-medium">{course.name}</p>
                              <p className="text-sm text-muted-foreground">Записан: {formatDate(course.enrolledDate)}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="font-medium">{course.progress}%</p>
                                <p className="text-xs text-muted-foreground">прогресс</p>
                              </div>
                              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${course.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Диалог назначения курса */}
          <Dialog open={isAssignCourseDialogOpen} onOpenChange={setIsAssignCourseDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Назначить курс</DialogTitle>
                <DialogDescription>
                  Выберите курсы для студента {selectedStudent?.firstName} {selectedStudent?.lastName}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="border rounded-md p-3 space-y-2">
                  {coursesForAssignment.map(course => {
                    const isEnrolled = selectedStudent?.courses.some(c => c.id === course.id)
                    return (
                      <div key={course.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`assign-${course.id}`}
                          checked={isEnrolled}
                          disabled={isEnrolled}
                        />
                        <Label
                          htmlFor={`assign-${course.id}`}
                          className={`text-sm font-normal cursor-pointer ${isEnrolled ? 'text-muted-foreground' : ''}`}
                        >
                          {course.name}
                          {isEnrolled && <span className="ml-2 text-xs">(уже записан)</span>}
                        </Label>
                      </div>
                    )
                  })}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAssignCourseDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button>
                    Назначить
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="authors" className="space-y-4">
          {/* Поиск авторов */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по имени или email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>

            <Dialog open={isCreateAuthorDialogOpen} onOpenChange={setIsCreateAuthorDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить автора
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавление автора</DialogTitle>
                  <DialogDescription>Создайте новый аккаунт автора/инструктора</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Имя</Label>
                      <Input
                        placeholder="Введите имя"
                        value={newAuthor.firstName}
                        onChange={(e) => setNewAuthor({ ...newAuthor, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Фамилия</Label>
                      <Input
                        placeholder="Введите фамилию"
                        value={newAuthor.lastName}
                        onChange={(e) => setNewAuthor({ ...newAuthor, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      value={newAuthor.email}
                      onChange={(e) => setNewAuthor({ ...newAuthor, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Роль</Label>
                    <Select
                      value={newAuthor.role}
                      onValueChange={(value: Author['role']) => setNewAuthor({ ...newAuthor, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instructor">Инструктор</SelectItem>
                        <SelectItem value="moderator">Модератор</SelectItem>
                        <SelectItem value="admin">Администратор</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateAuthorDialogOpen(false)}>
                      Отмена
                    </Button>
                    <Button onClick={handleCreateAuthor}>
                      Создать автора
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Таблица авторов */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Автор</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Роль</TableHead>
                    <TableHead>Курсов</TableHead>
                    <TableHead>Студентов</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Дата создания</TableHead>
                    <TableHead className="w-[100px]">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAuthors.map((author) => (
                    <TableRow key={author.id}>
                      <TableCell className="font-medium">
                        {author.firstName} {author.lastName}
                      </TableCell>
                      <TableCell>{author.email}</TableCell>
                      <TableCell>{getRoleBadge(author.role)}</TableCell>
                      <TableCell>{author.coursesCount}</TableCell>
                      <TableCell>{author.studentsCount}</TableCell>
                      <TableCell>
                        <Badge variant={author.status === 'active' ? 'default' : 'secondary'}>
                          {author.status === 'active' ? 'Активен' : 'Неактивен'}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(author.createdDate)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Редактировать
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Удалить
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredAuthors.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12">
                        <div className="text-muted-foreground">
                          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Авторы не найдены</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
