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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MoreHorizontal,
  Eye,
  Send,
  ExternalLink,
  CreditCard,
  QrCode,
  FileText,
  Calendar,
  Filter,
} from "lucide-react";

interface Cobranca {
  id: string;
  cliente: string;
  valor: number;
  vencimento: string;
  status: "pago" | "vencido" | "aberto" | "cancelado";
  tipo: "pix" | "boleto" | "cartao";
  linkCobranca: string;
  dataPagamento?: string;
}

const mockCobrancas: Cobranca[] = [
  {
    id: "COB001",
    cliente: "João Silva",
    valor: 250.0,
    vencimento: "05/12/2025",
    status: "pago",
    tipo: "pix",
    linkCobranca: "https://asaas.com/c/abc123",
    dataPagamento: "04/12/2025",
  },
  {
    id: "COB002",
    cliente: "Maria Santos",
    valor: 180.5,
    vencimento: "01/12/2025",
    status: "vencido",
    tipo: "boleto",
    linkCobranca: "https://asaas.com/c/def456",
  },
  {
    id: "COB003",
    cliente: "Pedro Costa Ltda",
    valor: 1420.0,
    vencimento: "10/12/2025",
    status: "aberto",
    tipo: "boleto",
    linkCobranca: "https://asaas.com/c/ghi789",
  },
  {
    id: "COB004",
    cliente: "Ana Oliveira",
    valor: 95.0,
    vencimento: "05/12/2025",
    status: "pago",
    tipo: "cartao",
    linkCobranca: "https://asaas.com/c/jkl012",
    dataPagamento: "05/12/2025",
  },
  {
    id: "COB005",
    cliente: "Carlos Lima ME",
    valor: 320.0,
    vencimento: "08/12/2025",
    status: "aberto",
    tipo: "pix",
    linkCobranca: "https://asaas.com/c/mno345",
  },
  {
    id: "COB006",
    cliente: "Fernanda Alves",
    valor: 450.0,
    vencimento: "28/11/2025",
    status: "vencido",
    tipo: "boleto",
    linkCobranca: "https://asaas.com/c/pqr678",
  },
  {
    id: "COB007",
    cliente: "Roberto Mendes",
    valor: 890.0,
    vencimento: "25/11/2025",
    status: "cancelado",
    tipo: "boleto",
    linkCobranca: "https://asaas.com/c/stu901",
  },
];

const statusConfig = {
  pago: { variant: "success" as const, label: "Pago" },
  vencido: { variant: "destructive" as const, label: "Vencido" },
  aberto: { variant: "warning" as const, label: "Em aberto" },
  cancelado: { variant: "default" as const, label: "Cancelado" },
};

const tipoIcons = {
  pix: QrCode,
  boleto: FileText,
  cartao: CreditCard,
};

const tipoLabels = {
  pix: "PIX",
  boleto: "Boleto",
  cartao: "Cartão",
};

export default function Cobrancas() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [cobrancas] = useState<Cobranca[]>(mockCobrancas);

  const filteredCobrancas = cobrancas.filter((cobranca) => {
    const matchesSearch =
      cobranca.cliente.toLowerCase().includes(search.toLowerCase()) ||
      cobranca.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || cobranca.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Cobranças"
        description="Gerencie todas as cobranças e envie mensagens"
      />

      {/* Stats Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total em Aberto</p>
          <p className="text-xl font-bold text-warning">R$ 1.740,00</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Vencidas</p>
          <p className="text-xl font-bold text-destructive">R$ 630,50</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Pagas (mês)</p>
          <p className="text-xl font-bold text-success">R$ 345,00</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Geral</p>
          <p className="text-xl font-bold text-foreground">R$ 3.605,50</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente ou ID da cobrança..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="aberto">Em aberto</SelectItem>
              <SelectItem value="pago">Pago</SelectItem>
              <SelectItem value="vencido">Vencido</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Período
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card shadow-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>ID</TableHead>
              <TableHead className="w-[200px]">Cliente</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Pagamento</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCobrancas.map((cobranca) => {
              const TipoIcon = tipoIcons[cobranca.tipo];
              return (
                <TableRow key={cobranca.id} className="group">
                  <TableCell className="font-mono text-sm font-medium">
                    {cobranca.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    {cobranca.cliente}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <TipoIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{tipoLabels[cobranca.tipo]}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(cobranca.valor)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {cobranca.vencimento}
                  </TableCell>
                  <TableCell>
                    <StatusBadge variant={statusConfig[cobranca.status].variant}>
                      {statusConfig[cobranca.status].label}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {cobranca.dataPagamento || "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="opacity-0 group-hover:opacity-100"
                        title="Enviar mensagem"
                      >
                        <Send className="h-4 w-4 text-info" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="opacity-0 group-hover:opacity-100"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="mr-2 h-4 w-4" />
                            Enviar cobrança
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Abrir no Asaas
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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
          Mostrando {filteredCobrancas.length} de {cobrancas.length} cobranças
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
