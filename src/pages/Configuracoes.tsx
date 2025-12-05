import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  Key,
  MessageSquare,
  Settings,
  CheckCircle,
  XCircle,
  Loader2,
  Eye,
  EyeOff,
  Send,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

export default function Configuracoes() {
  const [asaasEnvironment, setAsaasEnvironment] = useState("sandbox");
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [testingAsaas, setTestingAsaas] = useState(false);
  const [testingEvolution, setTestingEvolution] = useState(false);
  const [asaasConnected, setAsaasConnected] = useState<boolean | null>(null);
  const [evolutionConnected, setEvolutionConnected] = useState<boolean | null>(true);

  const handleTestAsaas = async () => {
    setTestingAsaas(true);
    setAsaasConnected(null);
    setTimeout(() => {
      setAsaasConnected(true);
      setTestingAsaas(false);
      toast.success("Conexão com Asaas estabelecida!");
    }, 2000);
  };

  const handleTestEvolution = async () => {
    setTestingEvolution(true);
    setTimeout(() => {
      setTestingEvolution(false);
      toast.success("Mensagem de teste enviada!");
    }, 2000);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Configurações"
        description="Configure as integrações e preferências do sistema"
      />

      <Tabs defaultValue="asaas" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[500px]">
          <TabsTrigger value="asaas" className="gap-2">
            <Key className="h-4 w-4" />
            Asaas API
          </TabsTrigger>
          <TabsTrigger value="evolution" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Evolution API
          </TabsTrigger>
          <TabsTrigger value="geral" className="gap-2">
            <Settings className="h-4 w-4" />
            Geral
          </TabsTrigger>
        </TabsList>

        {/* Asaas API */}
        <TabsContent value="asaas">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                Configuração Asaas API
              </CardTitle>
              <CardDescription>
                Configure as chaves de API do Asaas para produção e sandbox
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Environment Selection */}
              <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
                <div>
                  <Label className="text-sm font-medium">Ambiente Ativo</Label>
                  <p className="text-xs text-muted-foreground">
                    Selecione o ambiente que será utilizado nas operações
                  </p>
                </div>
                <Select value={asaasEnvironment} onValueChange={setAsaasEnvironment}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sandbox">Sandbox</SelectItem>
                    <SelectItem value="production">Produção</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sandbox Keys */}
              <div className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-warning" />
                  <Label className="font-medium">Sandbox</Label>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="sandbox-public">Chave Pública</Label>
                    <Input
                      id="sandbox-public"
                      type={showApiKeys ? "text" : "password"}
                      placeholder="$aact_..."
                      className="mt-1.5 font-mono"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sandbox-private">Chave Privada</Label>
                    <Input
                      id="sandbox-private"
                      type={showApiKeys ? "text" : "password"}
                      placeholder="$aact_..."
                      className="mt-1.5 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Production Keys */}
              <div className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <Label className="font-medium">Produção</Label>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="prod-public">Chave Pública</Label>
                    <Input
                      id="prod-public"
                      type={showApiKeys ? "text" : "password"}
                      placeholder="$aact_..."
                      className="mt-1.5 font-mono"
                    />
                  </div>
                  <div>
                    <Label htmlFor="prod-private">Chave Privada</Label>
                    <Input
                      id="prod-private"
                      type={showApiKeys ? "text" : "password"}
                      placeholder="$aact_..."
                      className="mt-1.5 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowApiKeys(!showApiKeys)}
                >
                  {showApiKeys ? (
                    <>
                      <EyeOff className="mr-2 h-4 w-4" />
                      Ocultar Chaves
                    </>
                  ) : (
                    <>
                      <Eye className="mr-2 h-4 w-4" />
                      Mostrar Chaves
                    </>
                  )}
                </Button>
                <div className="flex items-center gap-2">
                  {asaasConnected !== null && (
                    <span className={`flex items-center gap-1 text-sm ${asaasConnected ? "text-success" : "text-destructive"}`}>
                      {asaasConnected ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      {asaasConnected ? "Conectado" : "Erro"}
                    </span>
                  )}
                  <Button onClick={handleTestAsaas} disabled={testingAsaas}>
                    {testingAsaas ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle className="mr-2 h-4 w-4" />
                    )}
                    Testar Conexão
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Evolution API */}
        <TabsContent value="evolution">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-success" />
                Configuração Evolution API
              </CardTitle>
              <CardDescription>
                Configure a conexão com o WhatsApp via Evolution API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Connection Status */}
              <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${evolutionConnected ? "bg-success animate-pulse-soft" : "bg-destructive"}`} />
                  <div>
                    <p className="font-medium">
                      {evolutionConnected ? "WhatsApp Conectado" : "WhatsApp Desconectado"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {evolutionConnected ? "+55 11 99999-1234" : "Escaneie o QR Code para conectar"}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  {evolutionConnected ? "Desconectar" : "Conectar"}
                </Button>
              </div>

              {/* API Configuration */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="evolution-url">URL da API</Label>
                  <Input
                    id="evolution-url"
                    placeholder="https://api.evolution.com"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="evolution-token">Token</Label>
                  <Input
                    id="evolution-token"
                    type="password"
                    placeholder="Seu token de acesso"
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="evolution-instance">Instância</Label>
                  <Input
                    id="evolution-instance"
                    placeholder="Nome da instância"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="evolution-number">Número Conectado</Label>
                  <Input
                    id="evolution-number"
                    placeholder="+55 11 99999-1234"
                    className="mt-1.5"
                    disabled
                    value={evolutionConnected ? "+55 11 99999-1234" : ""}
                  />
                </div>
              </div>

              {/* Test Message */}
              <div className="rounded-lg border p-4">
                <Label className="font-medium">Enviar Mensagem de Teste</Label>
                <p className="mb-3 text-xs text-muted-foreground">
                  Envie uma mensagem de teste para verificar a conexão
                </p>
                <div className="flex gap-2">
                  <Input placeholder="Número para teste (+55...)" className="max-w-xs" />
                  <Button onClick={handleTestEvolution} disabled={testingEvolution}>
                    {testingEvolution ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    Enviar Teste
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* General Settings */}
        <TabsContent value="geral">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Dados da Empresa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="company-name">Nome da Empresa</Label>
                  <Input
                    id="company-name"
                    placeholder="Minha Empresa Ltda"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label>Logo da Empresa</Label>
                  <div className="mt-1.5 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed bg-muted">
                      <Building2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Carregar Logo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Preferências
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notificações por E-mail</Label>
                    <p className="text-xs text-muted-foreground">
                      Receber alertas de erros por e-mail
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Modo Debug</Label>
                    <p className="text-xs text-muted-foreground">
                      Habilitar logs detalhados
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Backup Automático</Label>
                    <p className="text-xs text-muted-foreground">
                      Realizar backup diário dos dados
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <Button onClick={() => toast.success("Configurações salvas!")}>
              Salvar Configurações
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
