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
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Webhook,
  Copy,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface WebhookEvent {
  id: string;
  evento: string;
  descricao: string;
  ativo: boolean;
}

const webhookEvents: WebhookEvent[] = [
  {
    id: "PAYMENT_CONFIRMED",
    evento: "Pagamento Confirmado",
    descricao: "Disparado quando um pagamento é confirmado",
    ativo: true,
  },
  {
    id: "PAYMENT_RECEIVED",
    evento: "Pagamento Recebido",
    descricao: "Disparado quando um pagamento é recebido",
    ativo: true,
  },
  {
    id: "PAYMENT_OVERDUE",
    evento: "Cobrança Vencida",
    descricao: "Disparado quando uma cobrança vence",
    ativo: true,
  },
  {
    id: "PAYMENT_UPDATED",
    evento: "Cobrança Atualizada",
    descricao: "Disparado quando uma cobrança é atualizada",
    ativo: true,
  },
  {
    id: "PAYMENT_DELETED",
    evento: "Cobrança Cancelada",
    descricao: "Disparado quando uma cobrança é cancelada",
    ativo: false,
  },
  {
    id: "PAYMENT_CREATED",
    evento: "Cobrança Criada",
    descricao: "Disparado quando uma nova cobrança é criada",
    ativo: true,
  },
];

const recentWebhooks = [
  { evento: "PAYMENT_CONFIRMED", status: "sucesso", data: "05/12/2025 14:30:00" },
  { evento: "PAYMENT_OVERDUE", status: "sucesso", data: "05/12/2025 09:00:00" },
  { evento: "PAYMENT_RECEIVED", status: "sucesso", data: "05/12/2025 08:45:22" },
  { evento: "PAYMENT_UPDATED", status: "erro", data: "04/12/2025 16:20:00" },
  { evento: "PAYMENT_CREATED", status: "sucesso", data: "04/12/2025 15:10:00" },
];

export default function Webhooks() {
  const [events, setEvents] = useState(webhookEvents);
  const webhookUrl = "https://api.seudominio.com/webhooks/asaas";

  const toggleEvent = (id: string) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, ativo: !event.ativo } : event
      )
    );
    toast.success("Configuração atualizada!");
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(webhookUrl);
    toast.success("URL copiada!");
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Webhooks"
        description="Configure o recebimento de eventos do Asaas"
      />

      {/* Webhook URL */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Webhook className="h-5 w-5 text-primary" />
            URL do Webhook
          </CardTitle>
          <CardDescription>
            Configure esta URL no painel do Asaas para receber os eventos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Input
              value={webhookUrl}
              readOnly
              className="font-mono text-sm"
            />
            <Button variant="outline" onClick={copyUrl}>
              <Copy className="mr-2 h-4 w-4" />
              Copiar
            </Button>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerar
            </Button>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-success" />
            <span className="text-success">Webhook ativo e funcionando</span>
            <span className="text-muted-foreground">
              • Último evento recebido há 2 minutos
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Events Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Eventos Monitorados</CardTitle>
            <CardDescription>
              Selecione quais eventos do Asaas devem ser processados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between rounded-lg border bg-muted/30 p-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{event.evento}</p>
                    <code className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {event.id}
                    </code>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {event.descricao}
                  </p>
                </div>
                <Switch
                  checked={event.ativo}
                  onCheckedChange={() => toggleEvent(event.id)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Webhooks */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Eventos Recentes</CardTitle>
            <CardDescription>
              Últimos webhooks recebidos do Asaas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentWebhooks.map((webhook, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg bg-muted/30 p-3"
                >
                  <div className="flex items-center gap-3">
                    {webhook.status === "sucesso" ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                    <div>
                      <code className="text-xs font-medium">{webhook.evento}</code>
                      <p className="text-[10px] text-muted-foreground">
                        {webhook.data}
                      </p>
                    </div>
                  </div>
                  <StatusBadge
                    variant={webhook.status === "sucesso" ? "success" : "destructive"}
                    dot={false}
                  >
                    {webhook.status}
                  </StatusBadge>
                </div>
              ))}
            </div>

            <Button variant="ghost" size="sm" className="mt-4 w-full">
              Ver todos os logs
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Status do Webhook</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="flex items-center gap-3 rounded-lg bg-success/10 p-4">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">98</p>
                <p className="text-xs text-muted-foreground">Processados (24h)</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-destructive/10 p-4">
              <XCircle className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">Erros (24h)</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-warning/10 p-4">
              <Clock className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">120ms</p>
                <p className="text-xs text-muted-foreground">Tempo médio</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-info/10 p-4">
              <AlertCircle className="h-8 w-8 text-info" />
              <div>
                <p className="text-2xl font-bold">98%</p>
                <p className="text-xs text-muted-foreground">Taxa de sucesso</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
