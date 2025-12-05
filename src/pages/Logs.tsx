import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  Download,
  Eye,
  Send,
  Webhook,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react";

interface LogEntry {
  id: string;
  tipo: "mensagem" | "webhook" | "sincronizacao" | "erro" | "auditoria";
  acao: string;
  descricao: string;
  status: "sucesso" | "erro" | "info" | "warning";
  usuario?: string;
  data: string;
  detalhes?: string;
}

const mockLogs: LogEntry[] = [
  {
    id: "1",
    tipo: "mensagem",
    acao: "Mensagem Enviada",
    descricao: "Cobrança COB001 enviada para João Silva",
    status: "sucesso",
    usuario: "Sistema",
    data: "05/12/2025 14:32:15",
    detalhes: '{"phone": "+5511999991234", "status": "delivered", "messageId": "abc123"}',
  },
  {
    id: "2",
    tipo: "webhook",
    acao: "Webhook Recebido",
    descricao: "Pagamento confirmado - COB002",
    status: "sucesso",
    data: "05/12/2025 14:30:00",
    detalhes: '{"event": "PAYMENT_CONFIRMED", "chargeId": "COB002", "value": 180.50}',
  },
  {
    id: "3",
    tipo: "erro",
    acao: "Falha no Envio",
    descricao: "Número inválido: +5511888887777",
    status: "erro",
    usuario: "Sistema",
    data: "05/12/2025 14:28:45",
    detalhes: '{"error": "INVALID_PHONE_NUMBER", "phone": "+5511888887777"}',
  },
  {
    id: "4",
    tipo: "sincronizacao",
    acao: "Sincronização Asaas",
    descricao: "45 clientes sincronizados",
    status: "sucesso",
    usuario: "Sistema",
    data: "05/12/2025 08:00:00",
    detalhes: '{"total": 45, "new": 3, "updated": 42}',
  },
  {
    id: "5",
    tipo: "auditoria",
    acao: "Template Alterado",
    descricao: "Template 'Vence Hoje' editado",
    status: "info",
    usuario: "admin@empresa.com",
    data: "05/12/2025 11:15:30",
  },
  {
    id: "6",
    tipo: "mensagem",
    acao: "Mensagem Enviada",
    descricao: "Lembrete enviado para Maria Santos",
    status: "sucesso",
    usuario: "Sistema",
    data: "05/12/2025 09:00:12",
  },
  {
    id: "7",
    tipo: "webhook",
    acao: "Webhook Recebido",
    descricao: "Boleto gerado - COB005",
    status: "info",
    data: "05/12/2025 08:45:00",
  },
  {
    id: "8",
    tipo: "erro",
    acao: "Erro de Conexão",
    descricao: "Timeout na API Evolution",
    status: "erro",
    usuario: "Sistema",
    data: "04/12/2025 16:20:00",
    detalhes: '{"error": "TIMEOUT", "endpoint": "/message/send", "duration": 30000}',
  },
];

const tipoConfig = {
  mensagem: { icon: Send, color: "text-info" },
  webhook: { icon: Webhook, color: "text-success" },
  sincronizacao: { icon: RefreshCw, color: "text-primary" },
  erro: { icon: AlertTriangle, color: "text-destructive" },
  auditoria: { icon: Info, color: "text-warning" },
};

const statusConfig = {
  sucesso: { variant: "success" as const, icon: CheckCircle },
  erro: { variant: "destructive" as const, icon: XCircle },
  info: { variant: "info" as const, icon: Info },
  warning: { variant: "warning" as const, icon: AlertTriangle },
};

export default function Logs() {
  const [search, setSearch] = useState("");
  const [tipoFilter, setTipoFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [logs] = useState<LogEntry[]>(mockLogs);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.acao.toLowerCase().includes(search.toLowerCase()) ||
      log.descricao.toLowerCase().includes(search.toLowerCase());
    const matchesTipo = tipoFilter === "all" || log.tipo === tipoFilter;
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    return matchesSearch && matchesTipo && matchesStatus;
  });

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Logs e Auditoria"
        description="Acompanhe todas as atividades do sistema"
      >
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Hoje</p>
          <p className="text-2xl font-bold">284</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Mensagens</p>
          <p className="text-2xl font-bold text-info">156</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Webhooks</p>
          <p className="text-2xl font-bold text-success">98</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Erros</p>
          <p className="text-2xl font-bold text-destructive">12</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar nos logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={tipoFilter} onValueChange={setTipoFilter}>
            <SelectTrigger className="w-[150px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="mensagem">Mensagens</SelectItem>
              <SelectItem value="webhook">Webhooks</SelectItem>
              <SelectItem value="sincronizacao">Sincronização</SelectItem>
              <SelectItem value="erro">Erros</SelectItem>
              <SelectItem value="auditoria">Auditoria</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="sucesso">Sucesso</SelectItem>
              <SelectItem value="erro">Erro</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="rounded-xl border bg-card shadow-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[120px]">Tipo</TableHead>
              <TableHead>Ação</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Usuário</TableHead>
              <TableHead>Data/Hora</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => {
              const tipo = tipoConfig[log.tipo];
              const status = statusConfig[log.status];
              const TipoIcon = tipo.icon;

              return (
                <TableRow key={log.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <TipoIcon className={`h-4 w-4 ${tipo.color}`} />
                      <span className="text-xs capitalize">{log.tipo}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{log.acao}</TableCell>
                  <TableCell className="max-w-[250px] truncate text-sm text-muted-foreground">
                    {log.descricao}
                  </TableCell>
                  <TableCell>
                    <StatusBadge variant={status.variant}>
                      {log.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {log.usuario || "-"}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {log.data}
                  </TableCell>
                  <TableCell>
                    {log.detalhes && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="opacity-0 group-hover:opacity-100"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Detalhes do Log</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium">Ação</p>
                              <p className="text-sm text-muted-foreground">
                                {log.acao}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Descrição</p>
                              <p className="text-sm text-muted-foreground">
                                {log.descricao}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Detalhes Técnicos</p>
                              <pre className="mt-1 overflow-x-auto rounded-lg bg-muted p-3 text-xs">
                                {JSON.stringify(JSON.parse(log.detalhes), null, 2)}
                              </pre>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando {filteredLogs.length} registros
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outline" size="sm">
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
