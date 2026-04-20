import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
  HelpCircle,
  Search,
  MoreHorizontal,
  MessageCircle,
  Clock,
  CheckCircle,
  User,
  Send,
  Archive,
  Filter,
  Download
} from "lucide-react"

interface Question {
  id: string
  studentId: string
  studentName: string
  studentEmail: string
  lessonId: string
  lessonName: string
  courseId: string
  courseName: string
  question: string
  answer?: string
  answeredBy?: string
  answeredAt?: string
  status: 'pending' | 'answered' | 'archived'
  createdAt: string
  priority: 'low' | 'medium' | 'high'
}

const questionsData: Question[] = [
  {
    id: "Q-001",
    studentId: "STD-001",
    studentName: "Иван Петров",
    studentEmail: "ivan.petrov@email.com",
    lessonId: "LSN-001",
    lessonName: "Введение в БПЛА",
    courseId: "CRS-001",
    courseName: "Базовый курс пилотирования БПЛА",
    question: "Добрый день! Подскажите, пожалуйста, какие документы нужны для регистрации БПЛА массой до 30 кг? И куда их подавать?",
    status: "pending",
    createdAt: "2024-06-25T10:30:00",
    priority: "high"
  },
  {
    id: "Q-002",
    studentId: "STD-002",
    studentName: "Мария Сидорова",
    studentEmail: "maria.sidorova@email.com",
    lessonId: "LSN-002",
    lessonName: "Основы аэродинамики",
    courseId: "CRS-001",
    courseName: "Базовый курс пилотирования БПЛА",
    question: "Не совсем понял формулу расчёта подъёмной силы. Можете объяснить подробнее, как коэффициент подъёмной силы зависит от угла атаки?",
    answer: "Добрый день! Коэффициент подъёмной силы (Cy) зависит от угла атаки линейно на малых углах (до критического угла атаки). Формула: Cy = Cy0 + Cyα × α, где Cy0 - коэффициент при нулевом угле атаки, Cyα - производная по углу атаки, α - угол атаки в радианах. При превышении критического угла происходит срыв потока и резкое падение Cy.",
    answeredBy: "Алексей Воронов",
    answeredAt: "2024-06-24T15:20:00",
    status: "answered",
    createdAt: "2024-06-24T09:15:00",
    priority: "medium"
  },
  {
    id: "Q-003",
    studentId: "STD-005",
    studentName: "Дмитрий Новиков",
    studentEmail: "dmitry.novikov@email.com",
    lessonId: "LSN-004",
    lessonName: "Методы обнаружения БПЛА",
    courseId: "CRS-002",
    courseName: "АНТИБПЛА",
    question: "Какое оборудование вы рекомендуете для обнаружения малоразмерных БПЛА на дистанции до 5 км? Интересует соотношение цена/качество.",
    status: "pending",
    createdAt: "2024-06-25T14:00:00",
    priority: "medium"
  },
  {
    id: "Q-004",
    studentId: "STD-003",
    studentName: "Алексей Козлов",
    studentEmail: "alexey.kozlov@email.com",
    lessonId: "LSN-003",
    lessonName: "Навигационные системы",
    courseId: "CRS-001",
    courseName: "Базовый курс пилотирования БПЛА",
    question: "Как работает система RTK и в каких случаях её применение оправдано?",
    answer: "RTK (Real-Time Kinematic) - это технология высокоточного позиционирования, использующая поправки от базовой станции. Точность достигает 1-2 см. Применяется в геодезии, картографии, точном земледелии. Оправдано при необходимости сантиметровой точности позиционирования.",
    answeredBy: "Мария Кузнецова",
    answeredAt: "2024-06-23T11:45:00",
    status: "answered",
    createdAt: "2024-06-22T16:30:00",
    priority: "low"
  },
  {
    id: "Q-005",
    studentId: "STD-001",
    studentName: "Иван Петров",
    studentEmail: "ivan.petrov@email.com",
    lessonId: "LSN-005",
    lessonName: "Безопасность полётов",
    courseId: "CRS-001",
    courseName: "Базовый курс пилотирования БПЛА",
    question: "Вопрос по аварийным процедурам - если во время полёта пропала связь с пультом, какие действия должен выполнить БПЛА автоматически?",
    status: "pending",
    createdAt: "2024-06-25T08:00:00",
    priority: "high"
  }
]

const getStatusBadge = (status: Question['status']) => {
  switch (status) {
    case 'pending':
      return (
        <Badge variant="outline" className="text-amber-600 border-amber-300">
          <Clock className="h-3 w-3 mr-1" />
          Ожидает ответа
        </Badge>
      )
    case 'answered':
      return (
        <Badge className="bg-green-500">
          <CheckCircle className="h-3 w-3 mr-1" />
          Отвечено
        </Badge>
      )
    case 'archived':
      return (
        <Badge variant="secondary">
          <Archive className="h-3 w-3 mr-1" />
          Архив
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const getPriorityBadge = (priority: Question['priority']) => {
  switch (priority) {
    case 'high':
      return <Badge variant="destructive">Высокий</Badge>
    case 'medium':
      return <Badge variant="outline">Средний</Badge>
    case 'low':
      return <Badge variant="secondary">Низкий</Badge>
    default:
      return <Badge variant="outline">{priority}</Badge>
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

const getTimeAgo = (dateString: string) => {
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)

  if (diffDays > 0) return `${diffDays} дн. назад`
  if (diffHours > 0) return `${diffHours} ч. назад`
  return 'Только что'
}

export default function QuestionsSection() {
  const [questions, setQuestions] = useState<Question[]>(questionsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [isAnswerDialogOpen, setIsAnswerDialogOpen] = useState(false)
  const [answerText, setAnswerText] = useState("")

  const filteredQuestions = questions.filter(question => {
    const matchesSearch =
      question.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.lessonName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || question.status === statusFilter
    const matchesPriority = priorityFilter === "all" || question.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const stats = {
    total: questions.length,
    pending: questions.filter(q => q.status === 'pending').length,
    answered: questions.filter(q => q.status === 'answered').length,
    highPriority: questions.filter(q => q.status === 'pending' && q.priority === 'high').length
  }

  const handleAnswer = () => {
    if (!selectedQuestion || !answerText.trim()) return

    setQuestions(questions.map(q =>
      q.id === selectedQuestion.id
        ? {
          ...q,
          answer: answerText,
          answeredBy: "Текущий пользователь",
          answeredAt: new Date().toISOString(),
          status: 'answered' as Question['status']
        }
        : q
    ))

    setIsAnswerDialogOpen(false)
    setSelectedQuestion(null)
    setAnswerText("")
  }

  const handleArchive = (questionId: string) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, status: 'archived' as Question['status'] } : q
    ))
  }

  const openAnswerDialog = (question: Question) => {
    setSelectedQuestion(question)
    setAnswerText(question.answer || "")
    setIsAnswerDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Вопросы учеников</h1>
          <p className="text-muted-foreground">Ответы на вопросы студентов по урокам</p>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего вопросов</CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ожидают ответа</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Отвечено</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.answered}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Срочные</CardTitle>
            <MessageCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.highPriority}</div>
          </CardContent>
        </Card>
      </div>

      {/* Фильтры */}
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по студенту, вопросу или уроку..."
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
              <SelectItem value="pending">Ожидает ответа</SelectItem>
              <SelectItem value="answered">Отвечено</SelectItem>
              <SelectItem value="archived">Архив</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Приоритет" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="high">Высокий</SelectItem>
              <SelectItem value="medium">Средний</SelectItem>
              <SelectItem value="low">Низкий</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Экспорт
        </Button>
      </div>

      {/* Список вопросов */}
      <div className="space-y-4">
        {filteredQuestions.map((question) => (
          <Card key={question.id} className={question.status === 'pending' && question.priority === 'high' ? 'border-red-200' : ''}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-medium">{question.studentName}</span>
                      <span className="text-sm text-muted-foreground">в</span>
                      <span className="text-sm text-blue-600">{question.lessonName}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{getTimeAgo(question.createdAt)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{question.courseName}</p>
                    <p className="mb-3">{question.question}</p>

                    {question.answer && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-700">Ответ от {question.answeredBy}</span>
                          <span className="text-xs text-green-600">{formatDateTime(question.answeredAt!)}</span>
                        </div>
                        <p className="text-sm">{question.answer}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-3">
                      {getStatusBadge(question.status)}
                      {getPriorityBadge(question.priority)}
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openAnswerDialog(question)}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {question.answer ? 'Редактировать ответ' : 'Ответить'}
                    </DropdownMenuItem>
                    {question.status !== 'archived' && (
                      <DropdownMenuItem onClick={() => handleArchive(question.id)}>
                        <Archive className="h-4 w-4 mr-2" />
                        В архив
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredQuestions.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50 text-muted-foreground" />
              <p className="text-muted-foreground">Вопросы не найдены</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Диалог ответа */}
      <Dialog open={isAnswerDialogOpen} onOpenChange={setIsAnswerDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ответ на вопрос</DialogTitle>
            <DialogDescription>
              {selectedQuestion?.studentName} - {selectedQuestion?.lessonName}
            </DialogDescription>
          </DialogHeader>
          {selectedQuestion && (
            <div className="space-y-4 py-4">
              <div>
                <Label className="text-muted-foreground">Вопрос</Label>
                <div className="p-3 bg-muted rounded-lg mt-1">
                  <p>{selectedQuestion.question}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ваш ответ</Label>
                <Textarea
                  placeholder="Введите ответ на вопрос..."
                  rows={6}
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAnswerDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleAnswer} disabled={!answerText.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Отправить ответ
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
