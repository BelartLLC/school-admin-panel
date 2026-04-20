import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Award,
  Search,
  MoreHorizontal,
  Download,
  Eye,
  Plus,
  FileText,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  RefreshCw,
  Mail,
  Printer
} from "lucide-react"

interface Certificate {
  id: string
  studentId: string
  studentName: string
  studentEmail: string
  courseId: string
  courseName: string
  templateId: string
  templateName: string
  issueDate: string
  expiryDate?: string
  status: 'active' | 'expired' | 'revoked'
  certificateNumber: string
  downloadUrl: string
}

interface CertificateTemplate {
  id: string
  name: string
  description: string
  courseId: string
  courseName: string
  validityPeriod: number // months, 0 = unlimited
  isActive: boolean
  createdDate: string
  issuedCount: number
}

const certificatesData: Certificate[] = [
  {
    id: "CERT-001",
    studentId: "STD-001",
    studentName: "Иван Петров",
    studentEmail: "ivan.petrov@email.com",
    courseId: "CRS-001",
    courseName: "Базовый курс пилотирования БПЛА",
    templateId: "TPL-001",
    templateName: "Сертификат пилота БПЛА",
    issueDate: "2024-06-15",
    expiryDate: "2025-06-15",
    status: "active",
    certificateNumber: "BPLA-2024-001234",
    downloadUrl: "#"
  },
  {
    id: "CERT-002",
    studentId: "STD-002",
    studentName: "Мария Сидорова",
    studentEmail: "maria.sidorova@email.com",
    courseId: "CRS-003",
    courseName: "Курс аэрофотосъемки и картографии",
    templateId: "TPL-002",
    templateName: "Сертификат аэрофотосъёмщика",
    issueDate: "2024-05-20",
    status: "active",
    certificateNumber: "AERO-2024-000892",
    downloadUrl: "#"
  },
  {
    id: "CERT-003",
    studentId: "STD-005",
    studentName: "Дмитрий Новиков",
    studentEmail: "dmitry.novikov@email.com",
    courseId: "CRS-001",
    courseName: "Базовый курс пилотирования БПЛА",
    templateId: "TPL-001",
    templateName: "Сертификат пилота БПЛА",
    issueDate: "2024-04-10",
    expiryDate: "2025-04-10",
    status: "active",
    certificateNumber: "BPLA-2024-000756",
    downloadUrl: "#"
  },
  {
    id: "CERT-004",
    studentId: "STD-005",
    studentName: "Дмитрий Новиков",
    studentEmail: "dmitry.novikov@email.com",
    courseId: "CRS-002",
    courseName: "Продвинутый курс коммерческого пилотирования",
    templateId: "TPL-003",
    templateName: "Сертификат коммерческого пилота",
    issueDate: "2024-06-01",
    expiryDate: "2025-06-01",
    status: "active",
    certificateNumber: "COM-2024-000234",
    downloadUrl: "#"
  },
  {
    id: "CERT-005",
    studentId: "STD-004",
    studentName: "Светлана Волкова",
    studentEmail: "svetlana.volkova@email.com",
    courseId: "CRS-001",
    courseName: "Базовый курс пилотирования БПЛА",
    templateId: "TPL-001",
    templateName: "Сертификат пилота БПЛА",
    issueDate: "2023-06-15",
    expiryDate: "2024-06-15",
    status: "expired",
    certificateNumber: "BPLA-2023-000421",
    downloadUrl: "#"
  }
]

const templatesData: CertificateTemplate[] = [
  {
    id: "TPL-001",
    name: "Сертификат пилота БПЛА",
    description: "Базовый сертификат для пилотов БПЛА массой до 30 кг",
    courseId: "CRS-001",
    courseName: "Базовый курс пилотирования БПЛА",
    validityPeriod: 12,
    isActive: true,
    createdDate: "2024-01-15",
    issuedCount: 156
  },
  {
    id: "TPL-002",
    name: "Сертификат аэрофотосъёмщика",
    description: "Сертификат специалиста по аэрофотосъёмке и картографии",
    courseId: "CRS-003",
    courseName: "Курс аэрофотосъемки и картографии",
    validityPeriod: 0,
    isActive: true,
    createdDate: "2024-02-20",
    issuedCount: 45
  },
  {
    id: "TPL-003",
    name: "Сертификат коммерческого пилота",
    description: "Сертификат для коммерческих операций с БПЛА",
    courseId: "CRS-002",
    courseName: "Продвинутый курс коммерческого пилотирования",
    validityPeriod: 12,
    isActive: true,
    createdDate: "2024-03-10",
    issuedCount: 78
  },
  {
    id: "TPL-004",
    name: "Сертификат инструктора",
    description: "Сертификат инструктора по обучению пилотов БПЛА",
    courseId: "CRS-004",
    courseName: "Инструкторский курс",
    validityPeriod: 24,
    isActive: false,
    createdDate: "2024-01-05",
    issuedCount: 12
  }
]

const coursesData = [
  { id: "CRS-001", name: "Базовый курс пилотирования БПЛА" },
  { id: "CRS-002", name: "Продвинутый курс коммерческого пилотирования" },
  { id: "CRS-003", name: "Курс аэрофотосъемки и картографии" },
  { id: "CRS-004", name: "Инструкторский курс" }
]

const getStatusBadge = (status: Certificate['status']) => {
  switch (status) {
    case 'active':
      return (
        <Badge className="bg-green-500">
          <CheckCircle className="h-3 w-3 mr-1" />
          Действителен
        </Badge>
      )
    case 'expired':
      return (
        <Badge variant="outline" className="text-amber-600 border-amber-300">
          <Calendar className="h-3 w-3 mr-1" />
          Истёк
        </Badge>
      )
    case 'revoked':
      return (
        <Badge variant="destructive">
          <XCircle className="h-3 w-3 mr-1" />
          Отозван
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function CertificatesSection() {
  const [certificates, setCertificates] = useState<Certificate[]>(certificatesData)
  const [templates, setTemplates] = useState<CertificateTemplate[]>(templatesData)
  const [activeTab, setActiveTab] = useState("certificates")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [isCreateTemplateDialogOpen, setIsCreateTemplateDialogOpen] = useState(false)
  const [isIssueCertificateDialogOpen, setIsIssueCertificateDialogOpen] = useState(false)

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    courseId: "",
    validityPeriod: 12
  })

  const [newCertificate, setNewCertificate] = useState({
    studentEmail: "",
    templateId: ""
  })

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch =
      cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.courseName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || cert.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const stats = {
    total: certificates.length,
    active: certificates.filter(c => c.status === 'active').length,
    expired: certificates.filter(c => c.status === 'expired').length,
    templates: templates.length,
    activeTemplates: templates.filter(t => t.isActive).length
  }

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.courseId) return

    const template: CertificateTemplate = {
      id: `TPL-${String(templates.length + 1).padStart(3, '0')}`,
      name: newTemplate.name,
      description: newTemplate.description,
      courseId: newTemplate.courseId,
      courseName: coursesData.find(c => c.id === newTemplate.courseId)?.name || "",
      validityPeriod: newTemplate.validityPeriod,
      isActive: true,
      createdDate: new Date().toISOString().split('T')[0],
      issuedCount: 0
    }

    setTemplates([...templates, template])
    setNewTemplate({ name: "", description: "", courseId: "", validityPeriod: 12 })
    setIsCreateTemplateDialogOpen(false)
  }

  const handleRevokeCertificate = (certId: string) => {
    setCertificates(certificates.map(c =>
      c.id === certId ? { ...c, status: 'revoked' as Certificate['status'] } : c
    ))
  }

  const handleToggleTemplate = (templateId: string) => {
    setTemplates(templates.map(t =>
      t.id === templateId ? { ...t, isActive: !t.isActive } : t
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Сертификаты</h1>
          <p className="text-muted-foreground">Управление сертификатами и шаблонами</p>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего сертификатов</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Действительных</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Истекших</CardTitle>
            <Calendar className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{stats.expired}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Шаблонов</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.templates}</div>
            <p className="text-xs text-muted-foreground">{stats.activeTemplates} активных</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="certificates">Сертификаты</TabsTrigger>
          <TabsTrigger value="templates">Шаблоны</TabsTrigger>
        </TabsList>

        <TabsContent value="certificates" className="space-y-4">
          {/* Фильтры */}
          <div className="flex justify-between items-center gap-4">
            <div className="flex gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по студенту, номеру или курсу..."
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
                  <SelectItem value="active">Действительные</SelectItem>
                  <SelectItem value="expired">Истекшие</SelectItem>
                  <SelectItem value="revoked">Отозванные</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Dialog open={isIssueCertificateDialogOpen} onOpenChange={setIsIssueCertificateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Выдать сертификат
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Выдача сертификата</DialogTitle>
                  <DialogDescription>Выдайте сертификат студенту вручную</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Email студента</Label>
                    <Input
                      placeholder="email@example.com"
                      value={newCertificate.studentEmail}
                      onChange={(e) => setNewCertificate({ ...newCertificate, studentEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Шаблон сертификата</Label>
                    <Select
                      value={newCertificate.templateId}
                      onValueChange={(value) => setNewCertificate({ ...newCertificate, templateId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите шаблон" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.filter(t => t.isActive).map(template => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsIssueCertificateDialogOpen(false)}>
                      Отмена
                    </Button>
                    <Button>
                      Выдать
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Таблица сертификатов */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Номер</TableHead>
                    <TableHead>Студент</TableHead>
                    <TableHead>Курс / Шаблон</TableHead>
                    <TableHead>Дата выдачи</TableHead>
                    <TableHead>Срок действия</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="w-[100px]">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCertificates.map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell className="font-mono text-sm">{cert.certificateNumber}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <User className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{cert.studentName}</p>
                            <p className="text-sm text-muted-foreground">{cert.studentEmail}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{cert.templateName}</p>
                          <p className="text-sm text-muted-foreground">{cert.courseName}</p>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(cert.issueDate)}</TableCell>
                      <TableCell>
                        {cert.expiryDate ? formatDate(cert.expiryDate) : 'Бессрочно'}
                      </TableCell>
                      <TableCell>{getStatusBadge(cert.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedCertificate(cert)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Просмотреть
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Скачать PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Printer className="h-4 w-4 mr-2" />
                              Печать
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Отправить на email
                            </DropdownMenuItem>
                            {cert.status === 'active' && (
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleRevokeCertificate(cert.id)}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Отозвать
                              </DropdownMenuItem>
                            )}
                            {cert.status === 'expired' && (
                              <DropdownMenuItem>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Продлить
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredCertificates.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12">
                        <div className="text-muted-foreground">
                          <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Сертификаты не найдены</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isCreateTemplateDialogOpen} onOpenChange={setIsCreateTemplateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Создать шаблон
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Создание шаблона сертификата</DialogTitle>
                  <DialogDescription>Настройте новый шаблон сертификата</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Название шаблона</Label>
                    <Input
                      placeholder="Сертификат пилота БПЛА"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Описание</Label>
                    <Input
                      placeholder="Описание сертификата"
                      value={newTemplate.description}
                      onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Курс</Label>
                    <Select
                      value={newTemplate.courseId}
                      onValueChange={(value) => setNewTemplate({ ...newTemplate, courseId: value })}
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
                    <Label>Срок действия (месяцев)</Label>
                    <Input
                      type="number"
                      min={0}
                      placeholder="0 = бессрочно"
                      value={newTemplate.validityPeriod}
                      onChange={(e) => setNewTemplate({ ...newTemplate, validityPeriod: Number(e.target.value) })}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateTemplateDialogOpen(false)}>
                      Отмена
                    </Button>
                    <Button onClick={handleCreateTemplate}>
                      Создать
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Сетка шаблонов */}
          <div className="grid gap-4 md:grid-cols-2">
            {templates.map(template => (
              <Card key={template.id} className={!template.isActive ? 'opacity-60' : ''}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                    <Badge variant={template.isActive ? 'default' : 'secondary'}>
                      {template.isActive ? 'Активен' : 'Неактивен'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Курс:</span>
                      <span>{template.courseName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Срок действия:</span>
                      <span>{template.validityPeriod > 0 ? `${template.validityPeriod} мес.` : 'Бессрочно'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Выдано:</span>
                      <span>{template.issuedCount} сертификатов</span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Превью
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleTemplate(template.id)}
                    >
                      {template.isActive ? 'Деактивировать' : 'Активировать'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Диалог просмотра сертификата */}
      <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Сертификат {selectedCertificate?.certificateNumber}</DialogTitle>
          </DialogHeader>
          {selectedCertificate && (
            <div className="space-y-6">
              <div className="aspect-[1.414] bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-4 border-blue-200 p-8 flex flex-col items-center justify-center text-center">
                <Award className="h-16 w-16 text-blue-600 mb-4" />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">СЕРТИФИКАТ</h2>
                <p className="text-lg text-blue-800 mb-4">{selectedCertificate.templateName}</p>
                <p className="text-xl font-semibold mb-2">Настоящим подтверждается, что</p>
                <p className="text-2xl font-bold text-blue-900 mb-4">{selectedCertificate.studentName}</p>
                <p className="text-lg mb-4">успешно завершил(а) курс</p>
                <p className="text-lg font-semibold text-blue-800 mb-6">{selectedCertificate.courseName}</p>
                <div className="text-sm text-blue-700">
                  <p>Дата выдачи: {formatDate(selectedCertificate.issueDate)}</p>
                  <p className="font-mono mt-1">{selectedCertificate.certificateNumber}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedCertificate(null)}>
                  Закрыть
                </Button>
                <Button variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  Печать
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Скачать PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
