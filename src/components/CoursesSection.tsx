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
  BookOpen,
  Plus,
  Edit,
  Play,
  Archive,
  Trash2,
  Copy,
  Settings
} from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  price: number
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  status: 'active' | 'draft' | 'archived'
  studentsCount: number
  rating: number
  instructor: string
  category: string
  type: 'Тренинг' | 'Стандартный'
  createdDate: string
  lastUpdated: string
}

const coursesData: Course[] = [
  {
    id: "CRS-001",
    title: "Специалист по эксплуатации беспилотных авиационных систем, включающих в себя одно или несколько беспилотных воздушных судов с максимальной взлетной массой 30 кг и менее",
    description: "Полный курс обучения основам управления беспилотными летательными аппаратами для начинающих. Включает теоретическую подготовку и практические занятия.",
    price: 45000,
    duration: "40 часов",
    level: "beginner",
    status: "active",
    studentsCount: 142,
    rating: 4.8,
    instructor: "Алексей Воронов",
    category: "Без категории",
    type: "Тренинг",
    createdDate: "2024-01-15",
    lastUpdated: "2024-06-20"
  },
  {
    id: "CRS-002",
    title: "Специалист по борьбе с БПЛА и защите объектов от угроз связанных с применением БПЛА (АНТИБПЛА)",
    description: "Углубленное изучение методов противодействия БПЛА и защиты объектов от угроз.",
    price: 85000,
    duration: "60 часов",
    level: "advanced",
    status: "active",
    studentsCount: 78,
    rating: 4.9,
    instructor: "Мария Кузнецова",
    category: "Без категории",
    type: "Стандартный",
    createdDate: "2024-02-01",
    lastUpdated: "2024-06-18"
  },
  {
    id: "CRS-003",
    title: "Внешний пилот (FPV) расчёта гражданской противовоздушной обороны",
    description: "Специализированный курс по управлению FPV дронами для гражданской обороны.",
    price: 62000,
    duration: "35 часов",
    level: "intermediate",
    status: "active",
    studentsCount: 95,
    rating: 4.7,
    instructor: "Дмитрий Соколов",
    category: "Без категории",
    type: "Стандартный",
    createdDate: "2024-03-10",
    lastUpdated: "2024-06-15"
  },
  {
    id: "CRS-004",
    title: "Основы безопасности полетов БПЛА (архивный)",
    description: "Архивированный курс по безопасности полетов.",
    price: 35000,
    duration: "25 часов",
    level: "beginner",
    status: "archived",
    studentsCount: 67,
    rating: 4.5,
    instructor: "Николай Смирнов",
    category: "Основы пилотирования",
    type: "Стандартный",
    createdDate: "2023-12-01",
    lastUpdated: "2024-01-15"
  }
]

const getTypeBadge = (type: Course['type']) => {
  switch (type) {
    case 'Тренинг':
      return <Badge variant="default" className="bg-blue-500">Тренинг</Badge>
    case 'Стандартный':
      return <Badge variant="default" className="bg-purple-500">Стандартный</Badge>
    default:
      return <Badge variant="outline">{type}</Badge>
  }
}

export default function CoursesSection() {
  const [courses, setCourses] = useState<Course[]>(coursesData)
  const [activeTab, setActiveTab] = useState("courses")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [showArchive, setShowArchive] = useState(false)
  const [categories, setCategories] = useState<string[]>([
    "Без категории",
    "Основы пилотирования",
    "Коммерческое пилотирование",
    "Специализация"
  ])
  const [newCategoryName, setNewCategoryName] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [newCourse, setNewCourse] = useState({
    title: "",
    saleButtonLink: "",
    saleButtonText: "",
    category: "Без категории",
    authors: [] as string[],
    showLessonDates: "enabled",
    showShortDescription: "enabled",
    courseType: "Стандартный",
    modulesEnabled: "enabled",
    autoNumbering: "enabled",
    hideCourse: false
  })

  const handleCreateCategory = () => {
    if (!newCategoryName.trim() || categories.includes(newCategoryName.trim())) return

    setCategories([...categories, newCategoryName.trim()])
    setNewCategoryName("")
  }

  const handleDeleteSelectedCategories = () => {
    const filteredCategories = categories.filter(cat => !selectedCategories.includes(cat))
    setCategories(filteredCategories)
    setSelectedCategories([])
  }

  const toggleCategorySelection = (categoryName: string) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== categoryName))
    } else {
      setSelectedCategories([...selectedCategories, categoryName])
    }
  }

  const handleArchiveCourse = (courseId: string) => {
    setCourses(courses.map(course =>
      course.id === courseId
        ? { ...course, status: 'archived' as Course['status'] }
        : course
    ))
  }

  const handleRestoreCourse = (courseId: string) => {
    setCourses(courses.map(course =>
      course.id === courseId
        ? { ...course, status: 'active' as Course['status'] }
        : course
    ))
  }

  const handleCreateCourse = () => {
    if (!newCourse.title.trim()) return

    const course: Course = {
      id: `CRS-${String(courses.length + 1).padStart(3, '0')}`,
      title: newCourse.title,
      description: "Описание курса",
      price: 0,
      duration: "0 часов",
      level: "beginner",
      status: newCourse.hideCourse ? 'draft' : 'active',
      studentsCount: 0,
      rating: 0,
      instructor: newCourse.authors.join(", ") || "Автор не указан",
      category: newCourse.category,
      type: newCourse.courseType as Course['type'],
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    }

    setCourses([...courses, course])
    setNewCourse({
      title: "",
      saleButtonLink: "",
      saleButtonText: "",
      category: "Без категории",
      authors: [],
      showLessonDates: "enabled",
      showShortDescription: "enabled",
      courseType: "Стандартный",
      modulesEnabled: "enabled",
      autoNumbering: "enabled",
      hideCourse: false
    })
    setIsCreateDialogOpen(false)
  }

  // Фильтрация курсов для отображения
  const activeCourses = courses.filter(course => course.status !== 'archived')
  const archivedCourses = courses.filter(course => course.status === 'archived')
  const displayedCourses = showArchive ? archivedCourses : activeCourses

  if (showArchive) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Архив курсов</h1>
            <p className="text-muted-foreground">Архивированные курсы</p>
          </div>
        </div>

        {/* Кнопка возврата */}
        <div>
          <Button
            variant="outline"
            onClick={() => setShowArchive(false)}
            className="mb-4"
          >
            Вернуться в список курсов
          </Button>
        </div>

        {/* Таблица архивных курсов */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[70%]">Название курса</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead className="w-[100px]">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {archivedCourses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-12">
                      <div className="text-muted-foreground">
                        <Archive className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Архив курсов пуст</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  archivedCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div className="max-w-[500px]">
                          <p className="text-muted-foreground">
                            {course.title}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-muted-foreground">{course.category}</span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRestoreCourse(course.id)}
                          title="Восстановить курс"
                        >
                          <Play className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Курсы</h1>
          <p className="text-muted-foreground">Управление образовательными программами</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="courses">Курсы</TabsTrigger>
          <TabsTrigger value="categories">Категории</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          {/* Кнопки управления */}
          <div className="flex gap-3">
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Создать новый курс
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <div className="space-y-6 p-6">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <Label className="text-right">Название</Label>
                    <div className="col-span-3">
                      <Input
                        placeholder="Введите название курса"
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 items-center">
                    <Label className="text-right">Ссылка кнопки продажи</Label>
                    <div className="col-span-3">
                      <Input
                        placeholder="https://"
                        value={newCourse.saleButtonLink}
                        onChange={(e) => setNewCourse({...newCourse, saleButtonLink: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 items-center">
                    <Label className="text-right">Текст кнопки продажи</Label>
                    <div className="col-span-3">
                      <Input
                        placeholder="Купить курс"
                        value={newCourse.saleButtonText}
                        onChange={(e) => setNewCourse({...newCourse, saleButtonText: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 items-center">
                    <Label className="text-right flex items-center gap-2">
                      Категория
                      <span className="w-4 h-4 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">?</span>
                    </Label>
                    <div className="col-span-3">
                      <Select value={newCourse.category} onValueChange={(value) => setNewCourse({...newCourse, category: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 items-start">
                    <Label className="text-right pt-2">Авторы</Label>
                    <div className="col-span-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="author-aleksandr"
                          checked={newCourse.authors.includes("Александр Ко")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewCourse({...newCourse, authors: [...newCourse.authors, "Александр Ко"]})
                            } else {
                              setNewCourse({...newCourse, authors: newCourse.authors.filter(a => a !== "Александр Ко")})
                            }
                          }}
                        />
                        <Label htmlFor="author-aleksandr" className="text-blue-600">Александр Ко</Label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 items-center">
                    <Label className="text-right">Отображение даты уроков</Label>
                    <div className="col-span-3">
                      <RadioGroup
                        value={newCourse.showLessonDates}
                        onValueChange={(value) => setNewCourse({...newCourse, showLessonDates: value})}
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="enabled" id="dates-enabled" />
                          <Label htmlFor="dates-enabled">Включено</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="disabled" id="dates-disabled" />
                          <Label htmlFor="dates-disabled">Выключено</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 items-center">
                    <Label className="text-right">Отображение краткого описания уроков</Label>
                    <div className="col-span-3">
                      <RadioGroup
                        value={newCourse.showShortDescription}
                        onValueChange={(value) => setNewCourse({...newCourse, showShortDescription: value})}
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="enabled" id="desc-enabled" />
                          <Label htmlFor="desc-enabled">Включено</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="disabled" id="desc-disabled" />
                          <Label htmlFor="desc-disabled">Выключено</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 items-start">
                    <Label className="text-right pt-2">Тип курса</Label>
                    <div className="col-span-3">
                      <RadioGroup
                        value={newCourse.courseType}
                        onValueChange={(value) => setNewCourse({...newCourse, courseType: value})}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Стандартный" id="type-standard" />
                          <Label htmlFor="type-standard" className="flex items-center gap-2">
                            Стандартный
                            <span className="w-4 h-4 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">?</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Тренинг" id="type-training" />
                          <Label htmlFor="type-training" className="flex items-center gap-2">
                            Тренинг
                            <span className="w-4 h-4 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">?</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Марафон" id="type-marathon" />
                          <Label htmlFor="type-marathon" className="flex items-center gap-2">
                            Марафон
                            <span className="w-4 h-4 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">?</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="V2" id="type-v2" />
                          <Label htmlFor="type-v2" className="flex items-center gap-2">
                            V2
                            <span className="w-4 h-4 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">?</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 items-start">
                    <Label className="text-right pt-2 flex items-center gap-2">
                      Модули в курсе
                      <span className="w-4 h-4 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">?</span>
                    </Label>
                    <div className="col-span-3">
                      <RadioGroup
                        value={newCourse.modulesEnabled}
                        onValueChange={(value) => setNewCourse({...newCourse, modulesEnabled: value})}
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="enabled" id="modules-enabled" />
                          <Label htmlFor="modules-enabled">Включены</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="disabled" id="modules-disabled" />
                          <Label htmlFor="modules-disabled">Выключены</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 items-center">
                    <Label className="text-right">Автонумерация уроков для ученика</Label>
                    <div className="col-span-3">
                      <RadioGroup
                        value={newCourse.autoNumbering}
                        onValueChange={(value) => setNewCourse({...newCourse, autoNumbering: value})}
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="enabled" id="auto-enabled" />
                          <Label htmlFor="auto-enabled">Включено</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="disabled" id="auto-disabled" />
                          <Label htmlFor="auto-disabled">Выключено</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 items-start">
                    <Label className="text-right pt-2 flex items-center gap-2">
                      Скрыть курс
                      <span className="w-4 h-4 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">?</span>
                    </Label>
                    <div className="col-span-3">
                      <Checkbox
                        id="hide-course"
                        checked={newCourse.hideCourse}
                        onCheckedChange={(checked) => setNewCourse({...newCourse, hideCourse: !!checked})}
                      />
                    </div>
                  </div>

                  <div className="flex justify-center pt-6">
                    <Button
                      onClick={handleCreateCourse}
                      disabled={!newCourse.title.trim()}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Создать
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" onClick={() => setShowArchive(true)}>
              <Archive className="h-4 w-4 mr-2" />
              Архив курсов
            </Button>
          </div>

          {/* Таблица курсов */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50%]">Название курса</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>Категория</TableHead>
                    <TableHead className="w-[200px]">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div className="max-w-[500px]">
                          <p className="text-blue-600 hover:underline cursor-pointer">
                            {course.title}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getTypeBadge(course.type)}
                      </TableCell>
                      <TableCell>
                        <span className="text-muted-foreground">{course.category}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3"
                          >
                            <Play className="h-3 w-3 mr-1" />
                            Уроки
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="p-2"
                            title="Архивировать"
                            onClick={() => handleArchiveCourse(course.id)}
                          >
                            <Archive className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="p-2"
                            title="Удалить"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="p-2"
                            title="Настройки"
                          >
                            <Settings className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="p-2"
                            title="Редактировать"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="p-2"
                            title="Копировать"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          {/* Форма создания категории */}
          <div className="flex gap-3 items-center">
            <div className="flex-1">
              <Input
                placeholder="Введите название новой категории"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreateCategory()}
              />
            </div>
            <Button
              onClick={handleCreateCategory}
              disabled={!newCategoryName.trim() || categories.includes(newCategoryName.trim())}
              className="bg-green-600 hover:bg-green-700"
            >
              Создать
            </Button>
          </div>

          {/* Кнопка удаления выбранных */}
          {selectedCategories.length > 0 && (
            <div>
              <Button
                variant="outline"
                onClick={handleDeleteSelectedCategories}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Удалить выбранное
              </Button>
            </div>
          )}

          {/* Список категорий */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-3">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategorySelection(category)}
                      disabled={category === "Без категории"} // Нельзя удалить дефолтную категорию
                    />
                    <Label
                      htmlFor={`category-${category}`}
                      className={`flex-1 ${category === "Без категории" ? "text-muted-foreground" : ""}`}
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>

              {categories.length === 1 && (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Пока что есть только одна категория. Создайте новые категории выше.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
