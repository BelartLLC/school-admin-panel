import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ClipboardList,
  Search,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  User,
  FileText,
  Download,
  Filter,
  Send,
  Paperclip,
  Star
} from "lucide-react"

interface HomeworkSubmission {
  id: string
  studentId: string
  studentName: string
  studentEmail: string
  lessonId: string
  lessonName: string
  courseId: string
  courseName: string
  submittedAt: string
  status: 'pending' | 'approved' | 'rejected' | 'revision'
  content: string
  attachments: { name: string; size: string; url: string }[]
  feedback?: string
  grade?: number
  reviewedAt?: string
  reviewedBy?: string
}

const submissionsData: HomeworkSubmission[] = [
  {
    id: "HW-001",
    studentId: "STD-001",
    studentName: "Иван Петров",
    studentEmail: "ivan.petrov@email.com",
    lessonId: "LSN-001",
    lessonName: "Введение в БПЛА",
    courseId: "CRS-001",
    courseName: "Базовый курс пилотирования БПЛА",
    submittedAt: "2024-06-25T14:30:00",
    status: "pending",
    content: "Выполнил домашнее задание по теме введения в БПЛА. Изучил основные типы дронов и их применение. Составил сравнительную таблицу характеристик мультикоптеров и самолётного типа БПЛА.",
    attachments: [
      { name: "homework-1.pdf", size: "2.4 MB", url: "#" },
      { name: "comparison-table.xlsx", size: "156 KB", url: "#" }
    ]
  },
  {
    id: "HW-002",
    studentId: "STD-002",
    studentName: "Мария Сидорова",
    studentEmail: "maria.sidorova@email.com",
    lessonId: "LSN-002",
    lessonName: "Основы аэродинамики",
    courseId: "CRS-001",
    courseName: "Базовый курс пилотирования БПЛА",
    submittedAt: "2024-06-24T09:15:00",
    status: "approved",
    content: "Домашняя работа по аэродинамике. Рассчитала подъёмную силу для различных конфигураций винтов. Приложила расчёты и схемы.",
    attachments: [
      { name: "calculations.pdf", size: "1.8 MB", url: "#" }
    ],
    feedback: "Отличная работа! Расчёты выполнены верно, схемы наглядные и понятные.",
    grade: 95,
    reviewedAt: "2024-06-24T16:45:00",
    reviewedBy: "Алексей Воронов"
  },
  {
    id: "HW-003",
    studentId: "STD-003",
    studentName: "Алексей Козлов",
    studentEmail: "alexey.kozlov@email.com",
    lessonId: "LSN-003",
    lessonName: "Навигационные системы",
    courseId: "CRS-001",
    courseName: "Базовый курс пилотирования БПЛА",
    submittedAt: "2024-06-23T18:20:00",
    status: "revision",
    content: "Работа по навигационным системам GPS и ГЛОНАСС.",
    attachments: [
      { name: "navigation-work.docx", size: "890 KB", url: "#" }
    ],
    feedback: "Работа требует доработки. Необходимо добавить сравнение точности систем GPS и ГЛОНАСС в различных условиях.",
    reviewedAt: "2024-06-24T10:00:00",
    reviewedBy: "Мария Кузнецова"
  },
  {
    id: "HW-004",
    studentId: "STD-005",
    studentName: "Дмитрий Новиков",
    studentEmail: "dmitry.novikov@email.com",
    lessonId: "LSN-004",
    lessonName: "Методы обнаружения БПЛА",
    courseId: "CRS-002",
    courseName: "АНТИБПЛА",
    submittedAt: "2024-06-22T12:00:00",
    status: "rejected",
    content: "Краткий обзор методов.",
    attachments: [],
    feedback: "Работа не соответствует требованиям. Необходимо предоставить развёрнутый анализ минимум 5 методов обнаружения БПЛА с примерами оборудования.",
    reviewedAt: "2024-06-22T17:30:00",
    reviewedBy: "Дмитрий Соколов"
  },
  {
    id: "HW-005",
    studentId: "STD-001",
    studentName: "Иван Петров",
    studentEmail: "ivan.petrov@email.com",
    lessonId: "LSN-005",
    lessonName: "Безопасность полётов",
    courseId: "CRS-001",
    courseName: "Базовый курс пилотирования БПЛА",
    submittedAt: "2024-06-21T08:45:00",
    status: "approved",
    content: "Работа по безопасности полётов. Составил чек-лист предполётной подготовки и описал основные аварийные ситуации с алгоритмами действий.",
    attachments: [
      { name: "safety-checklist.pdf", size: "1.2 MB", url: "#" },
      { name: "emergency-procedures.pdf", size: "2.1 MB", url: "#" }
    ],
    feedback: "Хорошая работа. Чек-лист полный, аварийные процедуры описаны корректно.",
    grade: 88,
    reviewedAt: "2024-06-21T14:20:00",
    reviewedBy: "Алексей Воронов"
  }
]

const getStatusBadge = (status: HomeworkSubmission['status']) => {
  switch (status) {
    case 'pending':
      return (
        <Badge variant="outline" className="text-amber-600 border-amber-300">
          <Clock className="h-3 w-3 mr-1" />
          Ожидает проверки
        </Badge>
      )
    case 'approved':
      return (
        <Badge className="bg-green-500">
          <CheckCircle className="h-3 w-3 mr-1" />
          Принято
        </Badge>
      )
    case 'rejected':
      return (
        <Badge variant="destructive">
          <XCircle className="h-3 w-3 mr-1" />
          Отклонено
        </Badge>
      )
    case 'revision':
      return (
        <Badge variant="outline" className="text-blue-600 border-blue-300">
          <MessageSquare className="h-3 w-3 mr-1" />
          На доработку
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default function HomeworkSection() {
  const [submissions, setSubmissions] = useState<HomeworkSubmission[]>(submissionsData)
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedSubmission, setSelectedSubmission] = useState<HomeworkSubmission | null>(null)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [reviewFeedback, setReviewFeedback] = useState("")
  const [reviewGrade, setReviewGrade] = useState("")
  const [reviewAction, setReviewAction] = useState<'approved' | 'rejected' | 'revision'>('approved')

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch =
      submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.lessonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.courseName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || submission.status === statusFilter

    const matchesTab = activeTab === "all" ||
      (activeTab === "pending" && submission.status === "pending") ||
      (activeTab === "reviewed" && submission.status !== "pending")

    return matchesSearch && matchesStatus && matchesTab
  })

  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    revision: submissions.filter(s => s.status === 'revision').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
    avgGrade: Math.round(
      submissions.filter(s => s.grade).reduce((sum, s) => sum + (s.grade || 0), 0) /
      submissions.filter(s => s.grade).length
    ) || 0
  }

  const handleReviewSubmit = () => {
    if (!selectedSubmission) return

    setSubmissions(submissions.map(s =>
      s.id === selectedSubmission.id
        ? {
          ...s,
          status: reviewAction,
          feedback: reviewFeedback,
          grade: reviewAction === 'approved' ? Number(reviewGrade) || undefined : undefined,
          reviewedAt: new Date().toISOString(),
          reviewedBy: "Текущий пользователь"
        }
        : s
    ))

    setIsReviewDialogOpen(false)
    setSelectedSubmission(null)
    setReviewFeedback("")
    setReviewGrade("")
  }

  const openReviewDialog = (submission: HomeworkSubmission) => {
    setSelectedSubmission(submission)
    setReviewFeedback(submission.feedback || "")
    setReviewGrade(submission.grade?.toString() || "")
    setIsReviewDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Домашние задания</h1>
          <p className="text-muted-foreground">Проверка и оценка домашних работ студентов</p>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего работ</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ожидают проверки</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Принято</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">На доработке</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.revision}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Средний балл</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgGrade}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-fit grid-cols-3">
          <TabsTrigger value="all">Все работы</TabsTrigger>
          <TabsTrigger value="pending">
            Ожидают проверки
            {stats.pending > 0 && (
              <Badge variant="destructive" className="ml-2">{stats.pending}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="reviewed">Проверенные</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {/* Фильтры */}
          <div className="flex justify-between items-center gap-4">
            <div className="flex gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по студенту, уроку или курсу..."
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
                  <SelectItem value="pending">Ожидает проверки</SelectItem>
                  <SelectItem value="approved">Принято</SelectItem>
                  <SelectItem value="revision">На доработку</SelectItem>
                  <SelectItem value="rejected">Отклонено</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Экспорт
            </Button>
          </div>

          {/* Таблица работ */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Студент</TableHead>
                    <TableHead>Урок / Курс</TableHead>
                    <TableHead>Дата отправки</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Оценка</TableHead>
                    <TableHead>Вложения</TableHead>
                    <TableHead className="w-[100px]">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <User className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{submission.studentName}</p>
                            <p className="text-sm text-muted-foreground">{submission.studentEmail}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{submission.lessonName}</p>
                          <p className="text-sm text-muted-foreground">{submission.courseName}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {formatDateTime(submission.submittedAt)}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(submission.status)}</TableCell>
                      <TableCell>
                        {submission.grade ? (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">{submission.grade}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {submission.attachments.length > 0 ? (
                          <div className="flex items-center gap-1">
                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                            <span>{submission.attachments.length}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedSubmission(submission)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Просмотреть
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openReviewDialog(submission)}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Проверить
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredSubmissions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12">
                        <div className="text-muted-foreground">
                          <ClipboardList className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Домашние работы не найдены</p>
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

      {/* Диалог просмотра работы */}
      <Dialog open={!!selectedSubmission && !isReviewDialogOpen} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Домашняя работа</DialogTitle>
            <DialogDescription>
              {selectedSubmission?.lessonName} - {selectedSubmission?.studentName}
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Студент</h4>
                  <p className="font-medium">{selectedSubmission.studentName}</p>
                  <p className="text-sm text-muted-foreground">{selectedSubmission.studentEmail}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Курс / Урок</h4>
                  <p className="font-medium">{selectedSubmission.lessonName}</p>
                  <p className="text-sm text-muted-foreground">{selectedSubmission.courseName}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Статус</h4>
                {getStatusBadge(selectedSubmission.status)}
                {selectedSubmission.grade && (
                  <span className="ml-4">
                    Оценка: <strong>{selectedSubmission.grade}</strong>
                  </span>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Содержание работы</h4>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedSubmission.content}</p>
                </div>
              </div>

              {selectedSubmission.attachments.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Вложения</h4>
                  <div className="space-y-2">
                    {selectedSubmission.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{file.name}</span>
                          <span className="text-sm text-muted-foreground">({file.size})</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedSubmission.feedback && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Отзыв преподавателя</h4>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p>{selectedSubmission.feedback}</p>
                    {selectedSubmission.reviewedAt && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {selectedSubmission.reviewedBy}, {formatDateTime(selectedSubmission.reviewedAt)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
                  Закрыть
                </Button>
                <Button onClick={() => openReviewDialog(selectedSubmission)}>
                  Проверить работу
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Диалог проверки работы */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Проверка домашней работы</DialogTitle>
            <DialogDescription>
              {selectedSubmission?.lessonName} - {selectedSubmission?.studentName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Решение</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={reviewAction === 'approved' ? 'default' : 'outline'}
                  className={reviewAction === 'approved' ? 'bg-green-500 hover:bg-green-600' : ''}
                  onClick={() => setReviewAction('approved')}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Принять
                </Button>
                <Button
                  variant={reviewAction === 'revision' ? 'default' : 'outline'}
                  className={reviewAction === 'revision' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                  onClick={() => setReviewAction('revision')}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  На доработку
                </Button>
                <Button
                  variant={reviewAction === 'rejected' ? 'destructive' : 'outline'}
                  onClick={() => setReviewAction('rejected')}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Отклонить
                </Button>
              </div>
            </div>

            {reviewAction === 'approved' && (
              <div className="space-y-2">
                <Label>Оценка (0-100)</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="Введите оценку"
                  value={reviewGrade}
                  onChange={(e) => setReviewGrade(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Комментарий / Отзыв</Label>
              <Textarea
                placeholder="Напишите отзыв о работе..."
                rows={5}
                value={reviewFeedback}
                onChange={(e) => setReviewFeedback(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleReviewSubmit}>
                <Send className="h-4 w-4 mr-2" />
                Отправить решение
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
