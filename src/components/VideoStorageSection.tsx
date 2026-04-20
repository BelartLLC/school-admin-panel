import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
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
  Video,
  Upload,
  Search,
  MoreHorizontal,
  Play,
  Trash2,
  Copy,
  Download,
  Eye,
  Clock,
  HardDrive,
  Film,
  FolderPlus,
  Folder,
  Link,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react"

interface VideoFile {
  id: string
  title: string
  fileName: string
  duration: string
  size: string
  sizeBytes: number
  resolution: string
  format: string
  status: 'ready' | 'processing' | 'error'
  uploadDate: string
  views: number
  linkedLessons: { id: string; name: string }[]
  thumbnail?: string
  url: string
}

interface Folder {
  id: string
  name: string
  videosCount: number
  createdDate: string
}

const foldersData: Folder[] = [
  { id: "FLD-001", name: "Курс БПЛА до 30 кг", videosCount: 15, createdDate: "2024-03-15" },
  { id: "FLD-002", name: "Курс АНТИБПЛА", videosCount: 8, createdDate: "2024-04-20" },
  { id: "FLD-003", name: "FPV Пилотирование", videosCount: 12, createdDate: "2024-05-10" },
  { id: "FLD-004", name: "Вебинары", videosCount: 5, createdDate: "2024-06-01" },
]

const videosData: VideoFile[] = [
  {
    id: "VID-001",
    title: "Введение в беспилотные системы",
    fileName: "intro-bpla.mp4",
    duration: "15:32",
    size: "245 MB",
    sizeBytes: 256901120,
    resolution: "1920x1080",
    format: "MP4",
    status: "ready",
    uploadDate: "2024-06-20",
    views: 1245,
    linkedLessons: [{ id: "LSN-001", name: "Введение в БПЛА" }],
    url: "https://storage.example.com/videos/intro-bpla.mp4"
  },
  {
    id: "VID-002",
    title: "Основы аэродинамики дронов",
    fileName: "aerodynamics.mp4",
    duration: "28:45",
    size: "512 MB",
    sizeBytes: 536870912,
    resolution: "1920x1080",
    format: "MP4",
    status: "ready",
    uploadDate: "2024-06-18",
    views: 987,
    linkedLessons: [{ id: "LSN-002", name: "Основы аэродинамики" }],
    url: "https://storage.example.com/videos/aerodynamics.mp4"
  },
  {
    id: "VID-003",
    title: "Практика управления квадрокоптером",
    fileName: "quadcopter-practice.mp4",
    duration: "45:12",
    size: "890 MB",
    sizeBytes: 933232640,
    resolution: "1920x1080",
    format: "MP4",
    status: "ready",
    uploadDate: "2024-06-15",
    views: 756,
    linkedLessons: [],
    url: "https://storage.example.com/videos/quadcopter-practice.mp4"
  },
  {
    id: "VID-004",
    title: "Системы навигации БПЛА",
    fileName: "navigation-systems.mp4",
    duration: "32:18",
    size: "620 MB",
    sizeBytes: 650117120,
    resolution: "1920x1080",
    format: "MP4",
    status: "processing",
    uploadDate: "2024-06-25",
    views: 0,
    linkedLessons: [],
    url: ""
  },
  {
    id: "VID-005",
    title: "Техническое обслуживание дронов",
    fileName: "maintenance.mp4",
    duration: "22:45",
    size: "410 MB",
    sizeBytes: 429916160,
    resolution: "1280x720",
    format: "MP4",
    status: "error",
    uploadDate: "2024-06-24",
    views: 0,
    linkedLessons: [],
    url: ""
  }
]

const getStatusBadge = (status: VideoFile['status']) => {
  switch (status) {
    case 'ready':
      return (
        <Badge className="bg-green-500">
          <CheckCircle className="h-3 w-3 mr-1" />
          Готово
        </Badge>
      )
    case 'processing':
      return (
        <Badge variant="outline" className="text-blue-600 border-blue-300">
          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          Обработка
        </Badge>
      )
    case 'error':
      return (
        <Badge variant="destructive">
          <XCircle className="h-3 w-3 mr-1" />
          Ошибка
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export default function VideoStorageSection() {
  const [videos, setVideos] = useState<VideoFile[]>(videosData)
  const [folders, setFolders] = useState<Folder[]>(foldersData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFolder, setSelectedFolder] = useState<string>("all")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isCreateFolderDialogOpen, setIsCreateFolderDialogOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<VideoFile | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")

  const [newVideo, setNewVideo] = useState({
    title: "",
    file: null as File | null
  })

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalStorage = videos.reduce((sum, v) => sum + v.sizeBytes, 0)
  const totalVideos = videos.length
  const readyVideos = videos.filter(v => v.status === 'ready').length
  const totalViews = videos.reduce((sum, v) => sum + v.views, 0)

  const handleUpload = () => {
    if (!newVideo.file || !newVideo.title) return

    setIsUploading(true)
    setUploadProgress(0)

    // Симуляция загрузки
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)

          const video: VideoFile = {
            id: `VID-${String(videos.length + 1).padStart(3, '0')}`,
            title: newVideo.title,
            fileName: newVideo.file!.name,
            duration: "00:00",
            size: formatBytes(newVideo.file!.size),
            sizeBytes: newVideo.file!.size,
            resolution: "Обрабатывается",
            format: newVideo.file!.name.split('.').pop()?.toUpperCase() || "MP4",
            status: "processing",
            uploadDate: new Date().toISOString().split('T')[0],
            views: 0,
            linkedLessons: [],
            url: ""
          }

          setVideos([video, ...videos])
          setNewVideo({ title: "", file: null })
          setIsUploadDialogOpen(false)
          return 0
        }
        return prev + 10
      })
    }, 200)
  }

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return

    const folder: Folder = {
      id: `FLD-${String(folders.length + 1).padStart(3, '0')}`,
      name: newFolderName,
      videosCount: 0,
      createdDate: new Date().toISOString().split('T')[0]
    }

    setFolders([...folders, folder])
    setNewFolderName("")
    setIsCreateFolderDialogOpen(false)
  }

  const handleDeleteVideo = (videoId: string) => {
    setVideos(videos.filter(v => v.id !== videoId))
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Видео хранилище</h1>
          <p className="text-muted-foreground">Управление видеоматериалами курсов</p>
        </div>
      </div>

      {/* Статистика хранилища */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего видео</CardTitle>
            <Film className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVideos}</div>
            <p className="text-xs text-muted-foreground">{readyVideos} готово к просмотру</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Использовано</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBytes(totalStorage)}</div>
            <Progress value={35} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-1">35% от 10 GB</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Папок</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{folders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего просмотров</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Панель действий */}
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск видео..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={selectedFolder} onValueChange={setSelectedFolder}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Папка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все папки</SelectItem>
              {folders.map(folder => (
                <SelectItem key={folder.id} value={folder.id}>
                  <div className="flex items-center gap-2">
                    <Folder className="h-4 w-4" />
                    {folder.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Dialog open={isCreateFolderDialogOpen} onOpenChange={setIsCreateFolderDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FolderPlus className="h-4 w-4 mr-2" />
                Создать папку
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Создание папки</DialogTitle>
                <DialogDescription>Введите название новой папки</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Название папки</Label>
                  <Input
                    placeholder="Введите название"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateFolderDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button onClick={handleCreateFolder}>
                    Создать
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Загрузить видео
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Загрузка видео</DialogTitle>
                <DialogDescription>Загрузите новое видео в хранилище</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Название видео</Label>
                  <Input
                    placeholder="Введите название"
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Файл видео</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    {newVideo.file ? (
                      <div className="space-y-2">
                        <Video className="h-10 w-10 mx-auto text-muted-foreground" />
                        <p className="text-sm font-medium">{newVideo.file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatBytes(newVideo.file.size)}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setNewVideo({ ...newVideo, file: null })}
                        >
                          Выбрать другой
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Перетащите файл сюда или
                        </p>
                        <Input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          id="video-upload"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              setNewVideo({ ...newVideo, file })
                            }
                          }}
                        />
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById('video-upload')?.click()}
                        >
                          Выберите файл
                        </Button>
                        <p className="text-xs text-muted-foreground">
                          MP4, WebM, MOV до 2GB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Загрузка...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)} disabled={isUploading}>
                    Отмена
                  </Button>
                  <Button onClick={handleUpload} disabled={!newVideo.file || !newVideo.title || isUploading}>
                    {isUploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Загрузка...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Загрузить
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Папки */}
      <div className="grid gap-4 md:grid-cols-4">
        {folders.map(folder => (
          <Card
            key={folder.id}
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setSelectedFolder(folder.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Folder className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{folder.name}</p>
                  <p className="text-sm text-muted-foreground">{folder.videosCount} видео</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Таблица видео */}
      <Card>
        <CardHeader>
          <CardTitle>Видеофайлы</CardTitle>
          <CardDescription>Найдено {filteredVideos.length} видео</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Видео</TableHead>
                <TableHead>Длительность</TableHead>
                <TableHead>Размер</TableHead>
                <TableHead>Разрешение</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Связанные уроки</TableHead>
                <TableHead>Просмотров</TableHead>
                <TableHead className="w-[100px]">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVideos.map((video) => (
                <TableRow key={video.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-10 bg-muted rounded flex items-center justify-center">
                        <Video className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{video.title}</p>
                        <p className="text-sm text-muted-foreground">{video.fileName}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {video.duration}
                    </div>
                  </TableCell>
                  <TableCell>{video.size}</TableCell>
                  <TableCell>{video.resolution}</TableCell>
                  <TableCell>{getStatusBadge(video.status)}</TableCell>
                  <TableCell>
                    {video.linkedLessons.length > 0 ? (
                      <div className="space-y-1">
                        {video.linkedLessons.map(lesson => (
                          <Badge key={lesson.id} variant="outline" className="text-xs">
                            {lesson.name}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Не привязано</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3 text-muted-foreground" />
                      {video.views.toLocaleString()}
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
                        {video.status === 'ready' && (
                          <>
                            <DropdownMenuItem onClick={() => setSelectedVideo(video)}>
                              <Play className="h-4 w-4 mr-2" />
                              Просмотр
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCopyUrl(video.url)}>
                              <Link className="h-4 w-4 mr-2" />
                              Копировать ссылку
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Скачать
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteVideo(video.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Удалить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredVideos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <div className="text-muted-foreground">
                      <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Видео не найдено</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Диалог просмотра видео */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          {selectedVideo && (
            <div className="space-y-4">
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="h-16 w-16 mx-auto mb-2 opacity-50" />
                  <p className="text-sm opacity-75">Видеоплеер</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Длительность</p>
                  <p className="font-medium">{selectedVideo.duration}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Размер</p>
                  <p className="font-medium">{selectedVideo.size}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Разрешение</p>
                  <p className="font-medium">{selectedVideo.resolution}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Просмотров</p>
                  <p className="font-medium">{selectedVideo.views.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
