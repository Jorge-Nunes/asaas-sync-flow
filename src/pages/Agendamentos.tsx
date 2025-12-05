import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle,
  Bell,
  Shield,
  Play,
  Pause,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

interface AgendamentoConfig {
  id: string;
  nome: string;
  descricao: string;
  ativo: boolean;
  horario: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const agendamentos: AgendamentoConfig[] = [
  {
    id: "vence_hoje",
    nome: "Cobranças que vencem hoje",
    descricao: "Envia mensagem para cobranças com vencimento no dia atual",
    ativo: true,
    horario: "08:00",
    icon: Clock,
    color: "text-warning",
  },
  {
    id: "vencidas",
    nome: "Cobranças vencidas",
    descricao: "Envia mensagem para cobranças em atraso",
    ativo: true,
    horario: "09:00",
    icon: AlertCircle,
    color: "text-destructive",
  },
  {
    id: "agradecimento",
    nome: "Agradecimento por pagamento",
    descricao: "Envia mensagem de confirmação quando um pagamento é recebido",
    ativo: true,
    horario: "Imediato",
    icon: CheckCircle,
    color: "text-success",
  },
  {
    id: "aviso_previo",
    nome: "Aviso prévio de vencimento",
    descricao: "Envia lembrete antes da data de vencimento",
    ativo: true,
    horario: "08:00",
    icon: Calendar,
    color: "text-info",
  },
];

export default function Agendamentos() {
  const [configs, setConfigs] = useState(agendamentos);
  const [diasAntes, setDiasAntes] = useState("3");
  const [antiSpam, setAntiSpam] = useState(true);
  const [periodicidade, setPeriodicidade] = useState("3");
  const [isRunning, setIsRunning] = useState(true);

  const toggleAgendamento = (id: string) => {
    setConfigs(
      configs.map((config) =>
        config.id === id ? { ...config, ativo: !config.ativo } : config
      )
    );
    toast.success("Configuração atualizada!");
  };

  const handleRunNow = (nome: string) => {
    toast.info(`Executando: ${nome}...`);
    setTimeout(() => {
      toast.success(`${nome} executado com sucesso!`);
    }, 2000);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Agendamentos"
        description="Configure os envios automáticos de mensagens"
      >
        <Button
          variant={isRunning ? "destructive" : "default"}
          onClick={() => {
            setIsRunning(!isRunning);
            toast.success(isRunning ? "Agendamentos pausados" : "Agendamentos iniciados");
          }}
        >
          {isRunning ? (
            <>
              <Pause className="mr-2 h-4 w-4" />
              Pausar Todos
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Iniciar Todos
            </>
          )}
        </Button>
      </PageHeader>

      {/* Status Card */}
      <Card className="mb-6">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${isRunning ? "bg-success animate-pulse-soft" : "bg-muted-foreground"}`} />
            <div>
              <p className="font-medium">
                Status: {isRunning ? "Em execução" : "Pausado"}
              </p>
              <p className="text-sm text-muted-foreground">
                Próxima execução: {isRunning ? "05/12/2025 às 08:00" : "Pausado"}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Executar Agora
          </Button>
        </CardContent>
      </Card>

      {/* Agendamentos Grid */}
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        {configs.map((config) => {
          const Icon = config.icon;
          return (
            <Card key={config.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-muted p-2">
                      <Icon className={`h-5 w-5 ${config.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-base">{config.nome}</CardTitle>
                      <CardDescription className="text-xs">
                        {config.descricao}
                      </CardDescription>
                    </div>
                  </div>
                  <Switch
                    checked={config.ativo}
                    onCheckedChange={() => toggleAgendamento(config.id)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Horário: {config.horario}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRunNow(config.nome)}
                    disabled={!config.ativo}
                  >
                    <Play className="mr-1 h-3 w-3" />
                    Executar
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Configurações Adicionais */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Aviso Prévio */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-info" />
              <CardTitle className="text-base">Aviso Prévio</CardTitle>
            </div>
            <CardDescription>
              Configure quantos dias antes do vencimento enviar o aviso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Label htmlFor="dias-antes" className="whitespace-nowrap">
                Dias antes:
              </Label>
              <Select value={diasAntes} onValueChange={setDiasAntes}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 dia</SelectItem>
                  <SelectItem value="2">2 dias</SelectItem>
                  <SelectItem value="3">3 dias</SelectItem>
                  <SelectItem value="5">5 dias</SelectItem>
                  <SelectItem value="7">7 dias</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">
                antes do vencimento
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Modo Anti-SPAM */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Modo Anti-SPAM</CardTitle>
              </div>
              <Switch checked={antiSpam} onCheckedChange={setAntiSpam} />
            </div>
            <CardDescription>
              Evita o envio diário repetitivo de cobranças vencidas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Quando habilitado, o sistema não enviará mensagens de cobrança
                vencida todos os dias, respeitando o intervalo configurado.
              </p>
              <div className="flex items-center gap-4">
                <Label htmlFor="periodicidade" className="whitespace-nowrap">
                  Enviar a cada:
                </Label>
                <Select
                  value={periodicidade}
                  onValueChange={setPeriodicidade}
                  disabled={!antiSpam}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 dias</SelectItem>
                    <SelectItem value="3">3 dias</SelectItem>
                    <SelectItem value="5">5 dias</SelectItem>
                    <SelectItem value="7">7 dias</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">dias</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Histórico de Execuções */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Últimas Execuções</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { data: "05/12/2025 08:00", tipo: "Vence Hoje", enviadas: 12, sucesso: 12 },
              { data: "05/12/2025 09:00", tipo: "Vencidas", enviadas: 8, sucesso: 7 },
              { data: "04/12/2025 08:00", tipo: "Vence Hoje", enviadas: 15, sucesso: 15 },
              { data: "04/12/2025 09:00", tipo: "Vencidas", enviadas: 10, sucesso: 9 },
            ].map((exec, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
              >
                <div>
                  <p className="text-sm font-medium">{exec.tipo}</p>
                  <p className="text-xs text-muted-foreground">{exec.data}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-success">
                    {exec.sucesso}/{exec.enviadas} enviadas
                  </p>
                  {exec.sucesso < exec.enviadas && (
                    <p className="text-xs text-destructive">
                      {exec.enviadas - exec.sucesso} falha(s)
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
