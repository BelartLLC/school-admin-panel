import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  Building,
  Mail,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  Save,
  Upload,
  Key,
  Users,
  FileText,
  Server
} from "lucide-react"

interface SchoolSettings {
  name: string
  description: string
  email: string
  phone: string
  address: string
  logo: string
  website: string
}

interface NotificationSettings {
  emailNewOrder: boolean
  emailNewStudent: boolean
  emailHomework: boolean
  emailQuestions: boolean
  pushNotifications: boolean
  dailyDigest: boolean
}

interface SecuritySettings {
  twoFactorAuth: boolean
  sessionTimeout: number
  ipWhitelist: string
  maxLoginAttempts: number
}

interface PaymentSettings {
  currency: string
  taxRate: number
  enableStripe: boolean
  enableYookassa: boolean
  testMode: boolean
}

export default function SettingsSection() {
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)

  const [schoolSettings, setSchoolSettings] = useState<SchoolSettings>({
    name: "Русская школа внешних пилотов",
    description: "Профессиональное обучение управлению беспилотными летательными аппаратами",
    email: "info@droneschool.ru",
    phone: "+7 (495) 123-45-67",
    address: "г. Москва, ул. Авиационная, д. 10",
    logo: "",
    website: "https://droneschool.ru"
  })

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNewOrder: true,
    emailNewStudent: true,
    emailHomework: true,
    emailQuestions: false,
    pushNotifications: true,
    dailyDigest: false
  })

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    sessionTimeout: 60,
    ipWhitelist: "",
    maxLoginAttempts: 5
  })

  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    currency: "RUB",
    taxRate: 20,
    enableStripe: false,
    enableYookassa: true,
    testMode: true
  })

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Настройки</h1>
          <p className="text-muted-foreground">Управление настройками платформы</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Основные
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Уведомления
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Безопасность
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Платежи
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Внешний вид
          </TabsTrigger>
        </TabsList>

        {/* Основные настройки */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Информация о школе</CardTitle>
              <CardDescription>Основные данные вашей школы</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Название школы</Label>
                  <Input
                    value={schoolSettings.name}
                    onChange={(e) => setSchoolSettings({ ...schoolSettings, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Веб-сайт</Label>
                  <Input
                    value={schoolSettings.website}
                    onChange={(e) => setSchoolSettings({ ...schoolSettings, website: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Описание</Label>
                <Textarea
                  rows={3}
                  value={schoolSettings.description}
                  onChange={(e) => setSchoolSettings({ ...schoolSettings, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={schoolSettings.email}
                    onChange={(e) => setSchoolSettings({ ...schoolSettings, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Телефон</Label>
                  <Input
                    value={schoolSettings.phone}
                    onChange={(e) => setSchoolSettings({ ...schoolSettings, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Адрес</Label>
                <Input
                  value={schoolSettings.address}
                  onChange={(e) => setSchoolSettings({ ...schoolSettings, address: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Логотип школы</Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 border-2 border-dashed rounded-lg flex items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <Button variant="outline">Загрузить логотип</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API интеграции</CardTitle>
              <CardDescription>Настройка интеграций с внешними сервисами</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>API ключ</Label>
                <div className="flex gap-2">
                  <Input type="password" value="sk_live_xxxxxxxxxxxx" readOnly className="font-mono" />
                  <Button variant="outline">
                    <Key className="h-4 w-4 mr-2" />
                    Обновить
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <Input value="https://droneschool.ru/api/webhooks" readOnly className="font-mono" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Уведомления */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email уведомления</CardTitle>
              <CardDescription>Настройте какие уведомления вы хотите получать</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Новые заказы</p>
                  <p className="text-sm text-muted-foreground">Получать уведомления о новых заказах</p>
                </div>
                <Switch
                  checked={notificationSettings.emailNewOrder}
                  onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, emailNewOrder: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Новые студенты</p>
                  <p className="text-sm text-muted-foreground">Получать уведомления о регистрации новых студентов</p>
                </div>
                <Switch
                  checked={notificationSettings.emailNewStudent}
                  onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, emailNewStudent: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Домашние задания</p>
                  <p className="text-sm text-muted-foreground">Получать уведомления о новых домашних заданиях</p>
                </div>
                <Switch
                  checked={notificationSettings.emailHomework}
                  onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, emailHomework: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Вопросы студентов</p>
                  <p className="text-sm text-muted-foreground">Получать уведомления о новых вопросах</p>
                </div>
                <Switch
                  checked={notificationSettings.emailQuestions}
                  onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, emailQuestions: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Дополнительные уведомления</CardTitle>
              <CardDescription>Другие настройки уведомлений</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push-уведомления</p>
                  <p className="text-sm text-muted-foreground">Получать push-уведомления в браузере</p>
                </div>
                <Switch
                  checked={notificationSettings.pushNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, pushNotifications: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ежедневный дайджест</p>
                  <p className="text-sm text-muted-foreground">Получать сводку за день на email</p>
                </div>
                <Switch
                  checked={notificationSettings.dailyDigest}
                  onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, dailyDigest: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Безопасность */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Аутентификация</CardTitle>
              <CardDescription>Настройки безопасности аккаунта</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Двухфакторная аутентификация</p>
                  <p className="text-sm text-muted-foreground">Дополнительный уровень защиты аккаунта</p>
                </div>
                <Switch
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Таймаут сессии (минут)</Label>
                <Input
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: Number(e.target.value) })}
                  className="w-32"
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Максимум попыток входа</Label>
                <Input
                  type="number"
                  value={securitySettings.maxLoginAttempts}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, maxLoginAttempts: Number(e.target.value) })}
                  className="w-32"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ограничения доступа</CardTitle>
              <CardDescription>Настройка IP-фильтрации</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Белый список IP-адресов</Label>
                <Textarea
                  placeholder="Введите IP-адреса через запятую или по одному на строку"
                  rows={3}
                  value={securitySettings.ipWhitelist}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, ipWhitelist: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Оставьте пустым для доступа с любого IP</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Журнал безопасности</CardTitle>
              <CardDescription>Последние события безопасности</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { event: "Успешный вход", ip: "192.168.1.1", time: "Сегодня, 10:30" },
                  { event: "Изменение пароля", ip: "192.168.1.1", time: "Вчера, 15:45" },
                  { event: "Успешный вход", ip: "10.0.0.5", time: "Вчера, 09:00" }
                ].map((log, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{log.event}</p>
                      <p className="text-sm text-muted-foreground">IP: {log.ip}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{log.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Платежи */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Основные настройки</CardTitle>
              <CardDescription>Валюта и налоги</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Валюта</Label>
                  <Input
                    value={paymentSettings.currency}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, currency: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ставка НДС (%)</Label>
                  <Input
                    type="number"
                    value={paymentSettings.taxRate}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, taxRate: Number(e.target.value) })}
                  />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Тестовый режим</p>
                  <p className="text-sm text-muted-foreground">Использовать тестовые платежи</p>
                </div>
                <Switch
                  checked={paymentSettings.testMode}
                  onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, testMode: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Платежные системы</CardTitle>
              <CardDescription>Подключенные способы оплаты</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">ЮKassa</p>
                    <p className="text-sm text-muted-foreground">Приём платежей картами и электронными кошельками</p>
                  </div>
                </div>
                <Switch
                  checked={paymentSettings.enableYookassa}
                  onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, enableYookassa: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Stripe</p>
                    <p className="text-sm text-muted-foreground">Международные платежи</p>
                  </div>
                </div>
                <Switch
                  checked={paymentSettings.enableStripe}
                  onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, enableStripe: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Внешний вид */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Тема оформления</CardTitle>
              <CardDescription>Настройте внешний вид платформы</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Цветовая схема</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600" />
                    <span className="text-sm">Синяя</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-600" />
                    <span className="text-sm">Зелёная</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-600" />
                    <span className="text-sm">Фиолетовая</span>
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Режим темы</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline" className="h-16">
                    Светлая
                  </Button>
                  <Button variant="outline" className="h-16">
                    Тёмная
                  </Button>
                  <Button variant="outline" className="h-16">
                    Системная
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Кастомизация</CardTitle>
              <CardDescription>Дополнительные настройки оформления</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Кастомный CSS</Label>
                <Textarea
                  placeholder="/* Введите ваш CSS код */"
                  rows={6}
                  className="font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label>Favicon</Label>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border rounded-lg flex items-center justify-center">
                    <Globe className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <Button variant="outline">Загрузить favicon</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
