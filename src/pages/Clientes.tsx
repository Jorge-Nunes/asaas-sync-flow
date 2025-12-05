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
  Search,
  RefreshCw,
  MoreHorizontal,
  Eye,
  Edit,
  Send,
  Phone,
  Mail,
  User,
} from "lucide-react";

interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpfCnpj: string;
  status: "ativo" | "inadimplente" | "inativo";
  totalCobracas: number;
  ultimaCobranca?: string;
}

const mockClientes: Cliente[] = [
  {
    id: "1",
    nome: "João Silva",
    email: "joao@email.com",
    telefone: "(11) 99999-1234",
    cpfCnpj: "123.456.789-00",
    status: "ativo",
    totalCobracas: 12,
    ultimaCobranca: "05/12/2025",
  },
  {
    id: "2",
    nome: "Maria Santos",
    email: "maria@email.com",
    telefone: "(11) 98888-5678",
    cpfCnpj: "987.654.321-00",
    status: "inadimplente",
    totalCobracas: 8,
    ultimaCobranca: "01/12/2025",
  },
  {
    id: "3",
    nome: "Pedro Costa Ltda",
    email: "contato@pedrocosta.com",
    telefone: "(21) 97777-9012",
    cpfCnpj: "12.345.678/0001-99",
    status: "ativo",
    totalCobracas: 24,
    ultimaCobranca: "03/12/2025",
  },
  {
    id: "4",
    nome: "Ana Oliveira",
    email: "ana@email.com",
    telefone: "(31) 96666-3456",
    cpfCnpj: "456.789.123-00",
    status: "inativo",
    totalCobracas: 3,
    ultimaCobranca: "15/10/2025",
  },
  {
    id: "5",
    nome: "Carlos Lima ME",
    email: "carlos@lima.com",
    telefone: "(41) 95555-7890",
    cpfCnpj: "98.765.432/0001-11",
    status: "ativo",
    totalCobracas: 18,
    ultimaCobranca: "04/12/2025",
  },
  {
    id: "6",
    nome: "Fernanda Alves",
    email: "fernanda@email.com",
    telefone: "(51) 94444-1234",
    cpfCnpj: "789.123.456-00",
    status: "inadimplente",
    totalCobracas: 5,
    ultimaCobranca: "28/11/2025",
  },
];

const statusConfig = {
  ativo: { variant: "success" as const, label: "Ativo" },
  inadimplente: { variant: "destructive" as const, label: "Inadimplente" },
  inativo: { variant: "default" as const, label: "Inativo" },
};

export default function Clientes() {
  const [search, setSearch] = useState("");
  const [clientes] = useState<Cliente[]>(mockClientes);

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(search.toLowerCase()) ||
      cliente.email.toLowerCase().includes(search.toLowerCase()) ||
      cliente.cpfCnpj.includes(search) ||
      cliente.telefone.includes(search)
  );

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Clientes"
        description="Gerencie os clientes sincronizados do Asaas"
      >
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Sincronizar
        </Button>
      </PageHeader>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, e-mail, CPF/CNPJ ou telefone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Todos
          </Button>
          <Button variant="ghost" size="sm">
            Ativos
          </Button>
          <Button variant="ghost" size="sm">
            Inadimplentes
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card shadow-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[250px]">Cliente</TableHead>
              <TableHead>CPF/CNPJ</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead className="text-center">Cobranças</TableHead>
              <TableHead>Última Cobrança</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClientes.map((cliente) => (
              <TableRow key={cliente.id} className="group">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {cliente.nome}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ID: {cliente.id}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {cliente.cpfCnpj}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{cliente.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Phone className="h-3.5 w-3.5" />
                      <span>{cliente.telefone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className="font-semibold">{cliente.totalCobracas}</span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {cliente.ultimaCobranca || "-"}
                </TableCell>
                <TableCell>
                  <StatusBadge variant={statusConfig[cliente.status].variant}>
                    {statusConfig[cliente.status].label}
                  </StatusBadge>
                </TableCell>
                <TableCell>
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
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar mensagem
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando {filteredClientes.length} de {clientes.length} clientes
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
