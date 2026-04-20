import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
  Plus,
  FileText,
  Edit,
  Trash2,
  Copy,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  GripVertical,
  CheckCircle2,
  XCircle,
  Clock,
  BarChart3
} from "lucide-react"

interface Question {
  id: string
  text: string
  type: 'single' | 'multiple' | 'text'
  options: { id: string; text: string; isCorrect: boolean }[]
  points: number
}

interface Test {
  id: string
  title: string
  courseId: string
  courseName: string
  lessonId?: string
  lessonName?: string
  questions: Question[]
  passingScore: number
  timeLimit: number // in minutes, 0 = no limit
  attemptsAllowed: number // 0 = unlimited
  status: 'active' | 'draft' | 'archived'
  totalAttempts: number
  avgScore: number
  createdDate: string
}

const coursesData = [
  { id: "CRS-001", name: "Специалист по эксплуатации БПЛА (до 30 кг)" },
  { id: "CRS-002", name: "Специалист по борьбе с БПЛА (АНТИБПЛА)" },
  { id: "CRS-003", name: "Внешний пилот (FPV)" },
]

const lessonsData = [
  { id: "LSN-001", name: "Введение в БПЛА", courseId: "CRS-001" },
  { id: "LSN-002", name: "Основы аэродинамики", courseId: "CRS-001" },
  { id: "LSN-003", name: "Навигационные системы", courseId: "CRS-001" },
  { id: "LSN-004", name: "Методы обнаружения БПЛА", courseId: "CRS-002" },
  { id: "LSN-005", name: "Системы противодействия", courseId: "CRS-002" },
]

const testsData: Test[] = [
  {
    id: "TST-001",
    title: "Тест по основам БПЛА",
    courseId: "CRS-001",
    courseName: "Специалист по эксплуатации БПЛА",
    lessonId: "LSN-001",
    lessonName: "Введение в БПЛА",
    questions: [
      {
        id: "Q1",
        text: "Что означает аббревиатура БПЛА?",
        type: "single",
        options: [
          { id: "O1", text: "Беспилотный летательный аппарат", isCorrect: true },
          { id: "O2", text: "Большой пилотируемый летающий агрегат", isCorrect: false },
          { id: "O3", text: "Базовая платформа летной автоматики", isCorrect: false },
        ],
        points: 10
      },
      {
        id: "Q2",
        text: "Какие типы БПЛА существуют?",
        type: "multiple",
        options: [
          { id: "O1", text: "Мультикоптеры", isCorrect: true },
          { id: "O2", text: "Самолетного типа", isCorrect: true },
          { id: "O3", text: "Вертолетного типа", isCorrect: true },
          { id: "O4", text: "Подводные", isCorrect: false },
        ],
        points: 15
      }
    ],
    passingScore: 70,
    timeLimit: 30,
    attemptsAllowed: 3,
    status: "active",
    totalAttempts: 245,
    avgScore: 82,
    createdDate: "2024-05-15"
  },
  {
    id: "TST-002",
    title: "Тест по аэродинамике",
    courseId: "CRS-001",
    courseName: "Специалист по эксплуатации БПЛА",
    lessonId: "LSN-002",
    lessonName: "Основы аэродинамики",
    questions: [],
    passingScore: 75,
    timeLimit: 45,
    attemptsAllowed: 2,
    status: "active",
    totalAttempts: 189,
    avgScore: 78,
    createdDate: "2024-05-20"
  },
  {
    id: "TST-003",
    title: "Итоговый тест по противодействию БПЛА",
    courseId: "CRS-002",
    courseName: "АНТИБПЛА",
    questions: [],
    passingScore: 80,
    timeLimit: 60,
    attemptsAllowed: 1,
    status: "draft",
    totalAttempts: 0,
    avgScore: 0,
    createdDate: "2024-06-10"
  }
]

const getStatusBadge = (status: Test['status']) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-500">Активен</Badge>
    case 'draft':
      return <Badge variant="outline">Черновик</Badge>
    case 'archived':
      return <Badge variant="secondary">Архив</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function TestsSection() {
  const [tests, setTests] = useState<Test[]>(testsData)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("tests")
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>("all")
  const [expandedTest, setExpandedTest] = useState<string | null>(null)

  const [newTest, setNewTest] = useState({
    title: "",
    courseId: "",
    lessonId: "",
    passingScore: 70,
    timeLimit: 0,
    attemptsAllowed: 0,
    questions: [] as Question[]
  })

  const [newQuestion, setNewQuestion] = useState({
    text: "",
    type: "single" as Question['type'],
    options: [
      { id: "1", text: "", isCorrect: false },
      { id: "2", text: "", isCorrect: false },
    ],
    points: 10
  })

  const filteredTests = tests.filter(test =>
    selectedCourseFilter === "all" || test.courseId === selectedCourseFilter
  )

  const filteredLessons = lessonsData.filter(lesson =>
    lesson.courseId === newTest.courseId
  )

  const handleAddOption = () => {
    setNewQuestion({
      ...newQuestion,
      options: [...newQuestion.options, { id: String(newQuestion.options.length + 1), text: "", isCorrect: false }]
    })
  }

  const handleRemoveOption = (optionId: string) => {
    if (newQuestion.options.length <= 2) return
    setNewQuestion({
      ...newQuestion,
      options: newQuestion.options.filter(o => o.id !== optionId)
    })
  }

  const handleOptionChange = (optionId: string, text: string) => {
    setNewQuestion({
      ...newQuestion,
      options: newQuestion.options.map(o =>
        o.id === optionId ? { ...o, text } : o
      )
    })
  }

  const handleCorrectChange = (optionId: string, isCorrect: boolean) => {
    if (newQuestion.type === "single") {
      setNewQuestion({
        ...newQuestion,
        options: newQuestion.options.map(o => ({
          ...o,
          isCorrect: o.id === optionId ? isCorrect : false
        }))
      })
    } else {
      setNewQuestion({
        ...newQuestion,
        options: newQuestion.options.map(o =>
          o.id === optionId ? { ...o, isCorrect } : o
        )
      })
    }
  }

  const handleAddQuestion = () => {
    if (!newQuestion.text.trim()) return

    const question: Question = {
      id: `Q-${Date.now()}`,
      text: newQuestion.text,
      type: newQuestion.type,
      options: newQuestion.options,
      points: newQuestion.points
    }

    setNewTest({
      ...newTest,
      questions: [...newTest.questions, question]
    })

    setNewQuestion({
      text: "",
      type: "single",
      options: [
        { id: "1", text: "", isCorrect: false },
        { id: "2", text: "", isCorrect: false },
      ],
      points: 10
    })
  }

  const handleCreateTest = () => {
    if (!newTest.title.trim() || !newTest.courseId) return

    const test: Test = {
      id: `TST-${String(tests.length + 1).padStart(3, '0')}`,
      title: newTest.title,
      courseId: newTest.courseId,
      courseName: coursesData.find(c => c.id === newTest.courseId)?.name || "",
      lessonId: newTest.lessonId || undefined,
      lessonName: lessonsData.find(l => l.id === newTest.lessonId)?.name,
      questions: newTest.questions,
      passingScore: newTest.passingScore,
      timeLimit: newTest.timeLimit,
      attemptsAllowed: newTest.attemptsAllowed,
      status: "draft",
      totalAttempts: 0,
      avgScore: 0,
      createdDate: new Date().toISOString().split('T')[0]
    }

    setTests([...tests, test])
    setNewTest({
      title: "",
      courseId: "",
      lessonId: "",
      passingScore: 70,
      timeLimit: 0,
      attemptsAllowed: 0,
      questions: []
    })
    setIsCreateDialogOpen(false)
  }

  const handleDeleteTest = (testId: string) => {
    setTests(tests.filter(t => t.id !== testId))
  }

  const handleDuplicateTest = (test: Test) => {
    const duplicatedTest: Test = {
      ...test,
      id: `TST-${String(tests.length + 1).padStart(3, '0')}`,
      title: `${test.title} (копия)`,
      status: "draft",
      totalAttempts: 0,
      avgScore: 0,
      createdDate: new Date().toISOString().split('T')[0]
    }
    setTests([...tests, duplicatedTest])
  }

  const stats = {
    total: tests.length,
    active: tests.filter(t => t.status === 'active').length,
    totalAttempts: tests.reduce((sum, t) => sum + t.totalAttempts, 0),
    avgScore: tests.length > 0
      ? Math.round(tests.reduce((sum, t) => sum + t.avgScore, 0) / tests.filter(t => t.avgScore > 0).length)
      : 0
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Тесты</h1>
          <p className="text-muted-foreground">Управление тестированием и оценкой знаний</p>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего тестов</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активных</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего попыток</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAttempts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Средний балл</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgScore}%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="tests">Тесты</TabsTrigger>
          <TabsTrigger value="results">Результаты</TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="space-y-4">
          {/* Фильтры и кнопка создания */}
          <div className="flex justify-between items-center gap-4">
            <div className="flex gap-4">
              <Select value={selectedCourseFilter} onValueChange={setSelectedCourseFilter}>
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Фильтр по курсу" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все курсы</SelectItem>
                  {coursesData.map(course => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Создать тест
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Создание нового теста</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  {/* Основные настройки */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Название теста</Label>
                      <Input
                        placeholder="Введите название теста"
                        value={newTest.title}
                        onChange={(e) => setNewTest({ ...newTest, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Проходной балл (%)</Label>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        value={newTest.passingScore}
                        onChange={(e) => setNewTest({ ...newTest, passingScore: Number(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Курс</Label>
                      <Select
                        value={newTest.courseId}
                        onValueChange={(value) => setNewTest({ ...newTest, courseId: value, lessonId: "" })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите курс" />
                        </SelectTrigger>
                        <SelectContent>
                          {coursesData.map(course => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Урок (опционально)</Label>
                      <Select
                        value={newTest.lessonId}
                        onValueChange={(value) => setNewTest({ ...newTest, lessonId: value })}
                        disabled={!newTest.courseId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Привязать к уроку" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Не привязан</SelectItem>
                          {filteredLessons.map(lesson => (
                            <SelectItem key={lesson.id} value={lesson.id}>
                              {lesson.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Ограничение по времени (мин)</Label>
                      <Input
                        type="number"
                        min={0}
                        placeholder="0 = без ограничения"
                        value={newTest.timeLimit || ""}
                        onChange={(e) => setNewTest({ ...newTest, timeLimit: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Количество попыток</Label>
                      <Input
                        type="number"
                        min={0}
                        placeholder="0 = без ограничения"
                        value={newTest.attemptsAllowed || ""}
                        onChange={(e) => setNewTest({ ...newTest, attemptsAllowed: Number(e.target.value) })}
                      />
                    </div>
                  </div>

                  {/* Добавленные вопросы */}
                  {newTest.questions.length > 0 && (
                    <div className="space-y-2">
                      <Label>Добавленные вопросы ({newTest.questions.length})</Label>
                      <div className="border rounded-md divide-y max-h-40 overflow-auto">
                        {newTest.questions.map((q, index) => (
                          <div key={q.id} className="p-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">{index + 1}.</span>
                              <span className="truncate max-w-md">{q.text}</span>
                              <Badge variant="outline">{q.points} баллов</Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setNewTest({
                                ...newTest,
                                questions: newTest.questions.filter(question => question.id !== q.id)
                              })}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Форма добавления вопроса */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Добавить вопрос</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Текст вопроса</Label>
                        <Textarea
                          placeholder="Введите текст вопроса"
                          value={newQuestion.text}
                          onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Тип вопроса</Label>
                          <Select
                            value={newQuestion.type}
                            onValueChange={(value: Question['type']) => setNewQuestion({ ...newQuestion, type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="single">Один правильный ответ</SelectItem>
                              <SelectItem value="multiple">Несколько правильных ответов</SelectItem>
                              <SelectItem value="text">Текстовый ответ</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Баллы за вопрос</Label>
                          <Input
                            type="number"
                            min={1}
                            value={newQuestion.points}
                            onChange={(e) => setNewQuestion({ ...newQuestion, points: Number(e.target.value) })}
                          />
                        </div>
                      </div>

                      {newQuestion.type !== "text" && (
                        <div className="space-y-2">
                          <Label>Варианты ответов</Label>
                          <div className="space-y-2">
                            {newQuestion.options.map((option, index) => (
                              <div key={option.id} className="flex items-center gap-2">
                                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                                {newQuestion.type === "single" ? (
                                  <RadioGroup
                                    value={option.isCorrect ? option.id : ""}
                                    onValueChange={() => handleCorrectChange(option.id, true)}
                                  >
                                    <RadioGroupItem value={option.id} />
                                  </RadioGroup>
                                ) : (
                                  <Checkbox
                                    checked={option.isCorrect}
                                    onCheckedChange={(checked) => handleCorrectChange(option.id, checked as boolean)}
                                  />
                                )}
                                <Input
                                  placeholder={`Вариант ${index + 1}`}
                                  value={option.text}
                                  onChange={(e) => handleOptionChange(option.id, e.target.value)}
                                  className="flex-1"
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveOption(option.id)}
                                  disabled={newQuestion.options.length <= 2}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                          <Button variant="outline" size="sm" onClick={handleAddOption}>
                            <Plus className="h-4 w-4 mr-2" />
                            Добавить вариант
                          </Button>
                        </div>
                      )}

                      <Button onClick={handleAddQuestion} disabled={!newQuestion.text.trim()}>
                        <Plus className="h-4 w-4 mr-2" />
                        Добавить вопрос
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Отмена
                    </Button>
                    <Button onClick={handleCreateTest} disabled={!newTest.title.trim() || !newTest.courseId}>
                      Создать тест
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Таблица тестов */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8"></TableHead>
                    <TableHead>Название</TableHead>
                    <TableHead>Курс / Урок</TableHead>
                    <TableHead>Вопросов</TableHead>
                    <TableHead>Проходной балл</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Статистика</TableHead>
                    <TableHead className="w-[100px]">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTests.map((test) => (
                    <>
                      <TableRow key={test.id}>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedTest(expandedTest === test.id ? null : test.id)}
                          >
                            {expandedTest === test.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium">{test.title}</TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{test.courseName}</div>
                            {test.lessonName && (
                              <div className="text-xs text-muted-foreground">{test.lessonName}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{test.questions.length}</TableCell>
                        <TableCell>{test.passingScore}%</TableCell>
                        <TableCell>{getStatusBadge(test.status)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Попыток: {test.totalAttempts}</div>
                            <div className="text-muted-foreground">Ср. балл: {test.avgScore}%</div>
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
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Редактировать
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDuplicateTest(test)}>
                                <Copy className="h-4 w-4 mr-2" />
                                Дублировать
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteTest(test.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Удалить
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      {expandedTest === test.id && test.questions.length > 0 && (
                        <TableRow>
                          <TableCell colSpan={8} className="bg-muted/50 p-4">
                            <div className="space-y-3">
                              <h4 className="font-medium">Вопросы теста:</h4>
                              {test.questions.map((q, index) => (
                                <div key={q.id} className="bg-background p-3 rounded-md border">
                                  <div className="flex items-start gap-2">
                                    <span className="font-medium text-muted-foreground">{index + 1}.</span>
                                    <div className="flex-1">
                                      <p className="font-medium">{q.text}</p>
                                      <div className="mt-2 space-y-1">
                                        {q.options.map(opt => (
                                          <div key={opt.id} className="flex items-center gap-2 text-sm">
                                            {opt.isCorrect ? (
                                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                                            ) : (
                                              <XCircle className="h-4 w-4 text-muted-foreground" />
                                            )}
                                            <span className={opt.isCorrect ? "text-green-600" : ""}>
                                              {opt.text}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <Badge variant="outline">{q.points} б.</Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                  {filteredTests.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12">
                        <div className="text-muted-foreground">
                          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Тесты не найдены</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Результаты тестирования</CardTitle>
              <CardDescription>Просмотр результатов прохождения тестов студентами</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Студент</TableHead>
                    <TableHead>Тест</TableHead>
                    <TableHead>Результат</TableHead>
                    <TableHead>Время</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div>
                        <div className="font-medium">Иван Петров</div>
                        <div className="text-sm text-muted-foreground">ivan@email.com</div>
                      </div>
                    </TableCell>
                    <TableCell>Тест по основам БПЛА</TableCell>
                    <TableCell>
                      <div className="font-medium">85%</div>
                      <div className="text-sm text-muted-foreground">17/20 баллов</div>
                    </TableCell>
                    <TableCell>24:35</TableCell>
                    <TableCell>25.06.2024</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Сдан</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div>
                        <div className="font-medium">Мария Сидорова</div>
                        <div className="text-sm text-muted-foreground">maria@email.com</div>
                      </div>
                    </TableCell>
                    <TableCell>Тест по аэродинамике</TableCell>
                    <TableCell>
                      <div className="font-medium">62%</div>
                      <div className="text-sm text-muted-foreground">31/50 баллов</div>
                    </TableCell>
                    <TableCell>38:12</TableCell>
                    <TableCell>24.06.2024</TableCell>
                    <TableCell>
                      <Badge variant="destructive">Не сдан</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div>
                        <div className="font-medium">Алексей Козлов</div>
                        <div className="text-sm text-muted-foreground">alexey@email.com</div>
                      </div>
                    </TableCell>
                    <TableCell>Тест по основам БПЛА</TableCell>
                    <TableCell>
                      <div className="font-medium">95%</div>
                      <div className="text-sm text-muted-foreground">19/20 баллов</div>
                    </TableCell>
                    <TableCell>18:45</TableCell>
                    <TableCell>23.06.2024</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Сдан</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
