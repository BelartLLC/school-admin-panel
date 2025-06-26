import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
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
  Settings,
  Upload,
  ChevronDown,
  FileText,
  Image,
  Folder,
  FolderPlus,
  Search,
  Eye,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link,
  Code,
  RotateCcw,
  RotateCw,
  Trash2,
  Calendar,
  X
} from "lucide-react"

interface Lesson {
  id: string
  title: string
  courseId: string
  courseName: string
  shortDescription: string
  content: string
  hasTest: boolean
  publishTime: string
  scheduleDate?: string
  previewImage?: string
  createdDate: string
}

interface CourseData {
  id: string
  name: string
  lessonsCount: number
}

interface FileItem {
  id: string
  name: string
  type: 'file' | 'folder'
  size?: string
  createdDate: string
  path: string
}

// Данные курсов для уроков
const coursesData: CourseData[] = [
  {
    id: "CRS-001",
    name: "Специалист по эксплуатации беспилотных авиационных систем, включающих в себя одно или несколько беспилотных воздушных судов с максимальной взлетной массой 30 кг и менее",
    lessonsCount: 29
  },
  {
    id: "CRS-002",
    name: "Специалист по борьбе с БПЛА и защите объектов от угроз связанных с применением БПЛА (АНТИБПЛА)",
    lessonsCount: 15
  },
  {
    id: "CRS-003",
    name: "Внешний пилот (FPV) расчёта гражданской противовоздушной обороны",
    lessonsCount: 0
  },
  {
    id: "no-course",
    name: "Без курса",
    lessonsCount: 30
  }
]

// Пример существующих уроков для выпадающего списка
const existingLessons = [
  { id: "LSN-001", title: "Введение в БПЛА" },
  { id: "LSN-002", title: "Основы аэродинамики" },
  { id: "LSN-003", title: "Навигационные системы" },
  { id: "LSN-004", title: "Безопасность полетов" },
  { id: "LSN-005", title: "Правила воздушного движения" }
]

// Файловая система для демонстрации
const mockFiles: FileItem[] = [
  { id: "1", name: "Изображения курсов", type: "folder", createdDate: "2024-06-20", path: "/" },
  { id: "2", name: "Видео материалы", type: "folder", createdDate: "2024-06-19", path: "/" },
  { id: "3", name: "preview-1.jpg", type: "file", size: "245 KB", createdDate: "2024-06-25", path: "/" },
  { id: "4", name: "lesson-intro.png", type: "file", size: "156 KB", createdDate: "2024-06-24", path: "/" },
  { id: "5", name: "course-banner.jpg", type: "file", size: "312 KB", createdDate: "2024-06-23", path: "/" }
]

export default function LessonsSection() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const [isFileManagerOpen, setIsFileManagerOpen] = useState(false)
  const [editorMode, setEditorMode] = useState<'visual' | 'code'>('visual')
  const [files, setFiles] = useState<FileItem[]>(mockFiles)
  const [currentPath, setCurrentPath] = useState("/")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [newLesson, setNewLesson] = useState({
    title: "",
    shortDescription: "",
    content: "<p>Введите содержимое урока...</p>",
    insertTestFrom: "",
    publishTime: "immediately",
    scheduleDate: "",
    courseId: "",
    previewImage: ""
  })

  // Файловый менеджер
  const filteredFiles = files.filter(file =>
    file.path === currentPath &&
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleFileSelect = (file: FileItem) => {
    if (file.type === 'file') {
      setSelectedFile(file)
      setNewLesson({...newLesson, previewImage: file.name})
      setIsFileManagerOpen(false)
    } else {
      // Навигация по папкам (пока не реализована)
    }
  }

  const handleCreateFolder = () => {
    const folderName = prompt("Введите название папки:")
    if (folderName) {
      const newFolder: FileItem = {
        id: String(files.length + 1),
        name: folderName,
        type: "folder",
        createdDate: new Date().toISOString().split('T')[0],
        path: currentPath
      }
      setFiles([...files, newFolder])
    }
  }

  // HTML редактор функции
  const insertHtmlTag = (tag: string, hasClosing = true) => {
    const textarea = document.getElementById('htmlEditor') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)

    let replacement = ""
    if (hasClosing) {
      replacement = `<${tag}>${selectedText}</${tag}>`
    } else {
      replacement = `<${tag}>`
    }

    const newContent = textarea.value.substring(0, start) + replacement + textarea.value.substring(end)
    setNewLesson({...newLesson, content: newContent})

    // Установить курсор после вставки
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + replacement.length, start + replacement.length)
    }, 0)
  }

  const handleCreateLesson = () => {
    if (!newLesson.title.trim()) return

    const lesson: Lesson = {
      id: `LSN-${String(lessons.length + 1).padStart(3, '0')}`,
      title: newLesson.title,
      courseId: newLesson.courseId || "no-course",
      courseName: coursesData.find(c => c.id === newLesson.courseId)?.name || "Без курса",
      shortDescription: newLesson.shortDescription,
      content: newLesson.content,
      hasTest: !!newLesson.insertTestFrom,
      publishTime: newLesson.publishTime,
      scheduleDate: newLesson.scheduleDate,
      previewImage: newLesson.previewImage,
      createdDate: new Date().toISOString().split('T')[0]
    }

    setLessons([...lessons, lesson])

    // Сброс формы
    setNewLesson({
      title: "",
      shortDescription: "",
      content: "<p>Введите содержимое урока...</p>",
      insertTestFrom: "",
      publishTime: "immediately",
      scheduleDate: "",
      courseId: "",
      previewImage: ""
    })
    setIsCreateDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Уроки</h1>
          <p className="text-muted-foreground">Управление уроками курсов</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Создать новый урок
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[95vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>Новый урок</DialogTitle>
              </DialogHeader>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-fit grid-cols-3">
                  <TabsTrigger value="basic">Основное</TabsTrigger>
                  <TabsTrigger value="homework">Домашнее задание</TabsTrigger>
                  <TabsTrigger value="other">Прочее</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-6 mt-6">
                  {/* Кнопка "Вставить тест" */}
                  <div className="space-y-2">
                    <Label>Вставить тест</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          {newLesson.insertTestFrom ?
                            existingLessons.find(l => l.id === newLesson.insertTestFrom)?.title :
                            "Выберите урок с тестом"
                          }
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full min-w-[400px]">
                        <DropdownMenuItem onClick={() => setNewLesson({...newLesson, insertTestFrom: ""})}>
                          Не добавлять тест
                        </DropdownMenuItem>
                        <Separator />
                        {existingLessons.map((lesson) => (
                          <DropdownMenuItem
                            key={lesson.id}
                            onClick={() => setNewLesson({...newLesson, insertTestFrom: lesson.id})}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            {lesson.title}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Название урока */}
                  <div className="space-y-2">
                    <Label htmlFor="lessonTitle">Название урока</Label>
                    <Input
                      id="lessonTitle"
                      placeholder="Название урока"
                      value={newLesson.title}
                      onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
                    />
                  </div>

                  {/* Время публикации */}
                  <div className="space-y-2">
                    <Label htmlFor="publishTime">Время публикации</Label>
                    <Select value={newLesson.publishTime} onValueChange={(value) => setNewLesson({...newLesson, publishTime: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediately">Немедленно</SelectItem>
                        <SelectItem value="scheduled">Назначить время</SelectItem>
                        <SelectItem value="draft">Черновик</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Поле для назначения времени */}
                    {newLesson.publishTime === "scheduled" && (
                      <div className="mt-2">
                        <Input
                          type="datetime-local"
                          value={newLesson.scheduleDate}
                          onChange={(e) => setNewLesson({...newLesson, scheduleDate: e.target.value})}
                        />
                      </div>
                    )}
                  </div>

                  {/* Краткое описание урока */}
                  <div className="space-y-2">
                    <Label htmlFor="shortDescription">Краткое описание урока</Label>
                    <Textarea
                      id="shortDescription"
                      rows={3}
                      value={newLesson.shortDescription}
                      onChange={(e) => setNewLesson({...newLesson, shortDescription: e.target.value})}
                    />
                  </div>

                  {/* Превью-изображение с файловым менеджером */}
                  <div className="space-y-2">
                    <Label>Превью-изображение в списке уроков</Label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" onClick={() => setIsFileManagerOpen(true)}>
                        <Upload className="h-4 w-4 mr-2" />
                        Выбрать файл
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        {newLesson.previewImage || "Файл не выбран"}
                      </span>
                      {newLesson.previewImage && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setNewLesson({...newLesson, previewImage: ""})}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    {/* Файловый менеджер */}
                    <Dialog open={isFileManagerOpen} onOpenChange={setIsFileManagerOpen}>
                      <DialogContent className="max-w-4xl max-h-[80vh]">
                        <DialogHeader>
                          <DialogTitle>Файловый менеджер</DialogTitle>
                          <DialogDescription>Выберите изображение для превью урока</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                          {/* Панель инструментов файлового менеджера */}
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={handleCreateFolder}>
                                <FolderPlus className="h-4 w-4 mr-2" />
                                Создать папку
                              </Button>
                              <Button variant="outline" size="sm">
                                <Upload className="h-4 w-4 mr-2" />
                                Загрузить файлы
                              </Button>
                            </div>
                            <div className="flex gap-2">
                              <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="Поиск файлов..."
                                  value={searchTerm}
                                  onChange={(e) => setSearchTerm(e.target.value)}
                                  className="pl-8 w-60"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Список файлов */}
                          <div className="border rounded-md h-96 overflow-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Название</TableHead>
                                  <TableHead>Размер</TableHead>
                                  <TableHead>Дата создания</TableHead>
                                  <TableHead>Действия</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {filteredFiles.map((file) => (
                                  <TableRow
                                    key={file.id}
                                    className="cursor-pointer hover:bg-muted/50"
                                    onClick={() => handleFileSelect(file)}
                                  >
                                    <TableCell className="flex items-center gap-2">
                                      {file.type === 'folder' ? (
                                        <Folder className="h-4 w-4 text-blue-500" />
                                      ) : (
                                        <Image className="h-4 w-4 text-green-500" />
                                      )}
                                      {file.name}
                                    </TableCell>
                                    <TableCell>{file.size || '-'}</TableCell>
                                    <TableCell>{new Date(file.createdDate).toLocaleDateString('ru-RU')}</TableCell>
                                    <TableCell>
                                      <div className="flex gap-1">
                                        <Button variant="ghost" size="sm">
                                          <Eye className="h-3 w-3" />
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                                {filteredFiles.length === 0 && (
                                  <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                      Файлы не найдены
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Полноценный HTML редактор по спецификации Emdesell */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="lessonContent">Содержимое урока</Label>
                      <div className="flex gap-2">
                        <Button
                          variant={editorMode === 'visual' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setEditorMode('visual')}
                        >
                          Визуальный
                        </Button>
                        <Button
                          variant={editorMode === 'code' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setEditorMode('code')}
                        >
                          Исходный код
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-md">
                      {/* Панель инструментов редактора по спецификации Emdesell */}
                      <div className="border-b bg-gray-50 p-2">
                        {/* Первая строка панели инструментов */}
                        <div className="flex gap-1 mb-2">
                          <Select defaultValue="file">
                            <SelectTrigger className="w-20 h-7 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="file">Файл</SelectItem>
                              <SelectItem value="new">Новый</SelectItem>
                              <SelectItem value="open">Открыть</SelectItem>
                              <SelectItem value="save">Сохранить</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select defaultValue="edit">
                            <SelectTrigger className="w-24 h-7 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="edit">Изменить</SelectItem>
                              <SelectItem value="undo">Отменить</SelectItem>
                              <SelectItem value="redo">Повторить</SelectItem>
                              <SelectItem value="cut">Вырезать</SelectItem>
                              <SelectItem value="copy">Копировать</SelectItem>
                              <SelectItem value="paste">Вставить</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select defaultValue="insert">
                            <SelectTrigger className="w-24 h-7 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="insert">Вставить</SelectItem>
                              <SelectItem value="link">Ссылка</SelectItem>
                              <SelectItem value="image">Изображение</SelectItem>
                              <SelectItem value="video">Видео</SelectItem>
                              <SelectItem value="table">Таблица</SelectItem>
                              <SelectItem value="hr">Линия</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select defaultValue="view">
                            <SelectTrigger className="w-16 h-7 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="view">Вид</SelectItem>
                              <SelectItem value="preview">Предпросмотр</SelectItem>
                              <SelectItem value="source">Код</SelectItem>
                              <SelectItem value="fullscreen">Полный экран</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select defaultValue="format">
                            <SelectTrigger className="w-20 h-7 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="format">Формат</SelectItem>
                              <SelectItem value="bold">Жирный</SelectItem>
                              <SelectItem value="italic">Курсив</SelectItem>
                              <SelectItem value="underline">Подчеркнутый</SelectItem>
                              <SelectItem value="strikethrough">Зачеркнутый</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select defaultValue="table">
                            <SelectTrigger className="w-20 h-7 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="table">Таблица</SelectItem>
                              <SelectItem value="insert-table">Вставить таблицу</SelectItem>
                              <SelectItem value="table-props">Свойства таблицы</SelectItem>
                              <SelectItem value="insert-row">Вставить строку</SelectItem>
                              <SelectItem value="insert-col">Вставить столбец</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select defaultValue="tools">
                            <SelectTrigger className="w-28 h-7 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tools">Инструменты</SelectItem>
                              <SelectItem value="spell-check">Проверка орфографии</SelectItem>
                              <SelectItem value="find-replace">Найти и заменить</SelectItem>
                              <SelectItem value="word-count">Подсчет слов</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Вторая строка панели инструментов */}
                        <div className="flex gap-1 mb-2 items-center">
                          {/* Отменить/Повторить */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            title="Отменить"
                          >
                            <RotateCcw className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            title="Повторить"
                          >
                            <RotateCw className="h-3 w-3" />
                          </Button>

                          <Separator orientation="vertical" className="mx-1 h-6" />

                          {/* Формат текста */}
                          <Select defaultValue="p">
                            <SelectTrigger className="w-28 h-7 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="p">Обычный</SelectItem>
                              <SelectItem value="h1">Заголовок 1</SelectItem>
                              <SelectItem value="h2">Заголовок 2</SelectItem>
                              <SelectItem value="h3">Заголовок 3</SelectItem>
                              <SelectItem value="h4">Заголовок 4</SelectItem>
                              <SelectItem value="h5">Заголовок 5</SelectItem>
                              <SelectItem value="h6">Заголовок 6</SelectItem>
                              <SelectItem value="pre">Предформатированный</SelectItem>
                            </SelectContent>
                          </Select>

                          {/* Размер шрифта */}
                          <Select defaultValue="12pt">
                            <SelectTrigger className="w-16 h-7 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="8pt">8pt</SelectItem>
                              <SelectItem value="9pt">9pt</SelectItem>
                              <SelectItem value="10pt">10pt</SelectItem>
                              <SelectItem value="11pt">11pt</SelectItem>
                              <SelectItem value="12pt">12pt</SelectItem>
                              <SelectItem value="14pt">14pt</SelectItem>
                              <SelectItem value="16pt">16pt</SelectItem>
                              <SelectItem value="18pt">18pt</SelectItem>
                              <SelectItem value="24pt">24pt</SelectItem>
                              <SelectItem value="36pt">36pt</SelectItem>
                            </SelectContent>
                          </Select>

                          <Separator orientation="vertical" className="mx-1 h-6" />

                          {/* Форматирование текста */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => insertHtmlTag('strong')}
                            title="Полужирный"
                          >
                            <Bold className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => insertHtmlTag('em')}
                            title="Курсив"
                          >
                            <Italic className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => insertHtmlTag('u')}
                            title="Подчеркнутый"
                          >
                            <Underline className="h-3 w-3" />
                          </Button>

                          <Separator orientation="vertical" className="mx-1 h-6" />

                          {/* Выравнивание */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => insertHtmlTag('div style="text-align: left;"')}
                            title="По левому краю"
                          >
                            <AlignLeft className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => insertHtmlTag('div style="text-align: center;"')}
                            title="По центру"
                          >
                            <AlignCenter className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => insertHtmlTag('div style="text-align: right;"')}
                            title="По правому краю"
                          >
                            <AlignRight className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => insertHtmlTag('div style="text-align: justify;"')}
                            title="По ширине"
                          >
                            <AlignJustify className="h-3 w-3" />
                          </Button>

                          <Separator orientation="vertical" className="mx-1 h-6" />

                          {/* Списки */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => insertHtmlTag('ul')}
                            title="Маркированный список"
                          >
                            <List className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => insertHtmlTag('ol')}
                            title="Нумерованный список"
                          >
                            <ListOrdered className="h-3 w-3" />
                          </Button>

                          {/* Отступы */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            title="Уменьшить отступ"
                          >
                            ⇤
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            title="Увеличить отступ"
                          >
                            ⇥
                          </Button>
                        </div>

                        {/* Третья строка панели инструментов */}
                        <div className="flex gap-1 items-center">
                          {/* Ссылки и медиа */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => insertHtmlTag('a href=""')}
                            title="Вставить/редактировать ссылку"
                          >
                            <Link className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => insertHtmlTag('img src=""', false)}
                            title="Вставить/редактировать изображение"
                          >
                            <Image className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => insertHtmlTag('video controls', false)}
                            title="Вставить/редактировать видео"
                          >
                            📹
                          </Button>

                          <Separator orientation="vertical" className="mx-1 h-6" />

                          {/* Специальные функции */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            title="Таймкод"
                          >
                            ⏰
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            title="Видеохранилище"
                          >
                            🎬
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            title="Предпросмотр"
                            onClick={() => setEditorMode(editorMode === 'visual' ? 'code' : 'visual')}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            title="Исходный код"
                            onClick={() => setEditorMode('code')}
                          >
                            <Code className="h-3 w-3" />
                          </Button>

                          <Separator orientation="vertical" className="mx-1 h-6" />

                          {/* Цвета */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            title="Цвет текста"
                          >
                            🎨
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            title="Цвет фона"
                          >
                            🖍️
                          </Button>

                          <Separator orientation="vertical" className="mx-1 h-6" />

                          {/* Дополнительные функции */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            title="Добавить смайл"
                          >
                            😊
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => insertHtmlTag('code')}
                            title="Вставить/Изменить код"
                          >
                            &lt;/&gt;
                          </Button>
                        </div>
                      </div>

                      {/* Область редактирования */}
                      {editorMode === 'visual' ? (
                        <div
                          className="min-h-[300px] p-4 prose max-w-none focus:outline-none"
                          contentEditable
                          suppressContentEditableWarning
                          dangerouslySetInnerHTML={{ __html: newLesson.content }}
                          onBlur={(e) => setNewLesson({...newLesson, content: e.currentTarget.innerHTML})}
                          style={{
                            border: 'none',
                            outline: 'none',
                            fontFamily: 'Arial, sans-serif',
                            fontSize: '12pt',
                            lineHeight: '1.6'
                          }}
                        />
                      ) : (
                        <Textarea
                          id="htmlEditor"
                          className="border-0 min-h-[300px] resize-none font-mono text-sm focus:ring-0"
                          value={newLesson.content}
                          onChange={(e) => setNewLesson({...newLesson, content: e.target.value})}
                          placeholder="<p>Введите HTML код...</p>"
                          style={{
                            border: 'none',
                            outline: 'none',
                            boxShadow: 'none'
                          }}
                        />
                      )}

                      {/* Статус бар */}
                      <div className="border-t bg-gray-50 p-2 text-xs text-muted-foreground flex justify-between">
                        <div className="flex gap-4">
                          <span>Режим: {editorMode === 'visual' ? 'Визуальный редактор' : 'HTML код'}</span>
                          <span>Кодировка: UTF-8</span>
                          <span>Строка: 1</span>
                        </div>
                        <div className="flex gap-4">
                          <span>Символов: {newLesson.content.length}</span>
                          <span>Слов: {newLesson.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Присоединение урока к курсу */}
                  <div className="space-y-4">
                    <Label>Присоединение урока к курсу</Label>
                    <RadioGroup
                      value={newLesson.courseId}
                      onValueChange={(value) => setNewLesson({...newLesson, courseId: value})}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no-course" id="no-course" />
                        <Label htmlFor="no-course">Без курса</Label>
                      </div>
                      {coursesData.filter(c => c.id !== "no-course").map((course) => (
                        <div key={course.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={course.id} id={course.id} />
                          <Label htmlFor={course.id} className="text-sm leading-relaxed">
                            {course.name}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Кнопки действий */}
                  <div className="flex gap-3 pt-6 border-t">
                    <Button
                      onClick={handleCreateLesson}
                      disabled={!newLesson.title.trim()}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Сохранить изменения
                    </Button>
                    <Button variant="outline">
                      Удалить все ДЗ
                    </Button>
                    <Button variant="outline">
                      Очистить комментарии
                    </Button>
                    <Button variant="outline">
                      Сбросить просмотры
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="homework" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Функционал домашних заданий будет добавлен позже</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="other" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Дополнительные настройки будут добавлены позже</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>

          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Группировка
          </Button>
        </div>
      </div>

      {/* Таблица курсов и уроков */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[70%]">Название курса</TableHead>
                <TableHead className="text-right">Кол-во уроков</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coursesData.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <p className={course.id === "no-course" ? "text-muted-foreground" : "text-blue-600 hover:underline cursor-pointer"}>
                      {course.name}
                    </p>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-muted-foreground">{course.lessonsCount}</span>
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
