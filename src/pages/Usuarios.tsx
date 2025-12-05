import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
  Plus,
  MoreHorizontal,
  Edit,
  Key,
  UserX,
  UserCheck,
  Shield,
  User,
} from "lucide-react";
import { toast } from "sonner";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: "admin" | "operador";
  status: "ativo" | "inativo";
  ultimoAcesso?: string;
  criadoEm: string;
}

const mockUsuarios: Usuario[] = [
  {
    id: "1",
    nome: "Administrador",
    email: "admin@empresa.com",
    role: "admin",
    status: "ativo",
    ultimoAcesso: "05/12/2025 14:32",
    criadoEm: "01/01/2025",
  },
  {
    id: "2",
    nome: "João Operador",
    email: "joao@empresa.com",
    role: "operador",
    status: "ativo",
    ultimoAcesso: "05/12/2025 09:15",
    criadoEm: "15/03/2025",
  },
  {
    id: "3",
    nome: "Maria Silva",
    email: "maria@empresa.com",
    role: "operador",
    status: "inativo",
    ultimoAcesso: "20/11/2025 11:00",
    criadoEm: "10/06/2025",
  },
];

const roleConfig = {
  admin: {
    label: "Administrador",
    icon: Shield,
    color: "bg-primary/15 text-primary",
  },
  operador: {
    label: "Operador",
    icon: User,
    color: "bg-info/15 text-info",
  },
};

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(mockUsuarios);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    nome: "",
    email: "",
    role: "operador" as "admin" | "operador",
  });

  const handleCreateUser = () => {
    if (!newUser.nome || !newUser.email) {
      toast.error("Preencha todos os campos");
      return;
    }

    const user: Usuario = {
      id: String(usuarios.length + 1),
      nome: newUser.nome,
      email: newUser.email,
      role: newUser.role,
      status: "ativo",
      criadoEm: new Date().toLocaleDateString("pt-BR"),
    };

    setUsuarios([...usuarios, user]);
    setNewUser({ nome: "", email: "", role: "operador" });
    setIsCreateOpen(false);
    toast.success("Usuário criado com sucesso!");
  };

  const toggleUserStatus = (id: string) => {
    setUsuarios(
      usuarios.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "ativo" ? "inativo" : "ativo" }
          : user
      )
    );
    toast.success("Status atualizado!");
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Usuários"
        description="Gerencie os usuários do sistema"
      >
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Usuário</DialogTitle>
              <DialogDescription>
                Preencha os dados para criar um novo usuário
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={newUser.nome}
                  onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
                  placeholder="Nome do usuário"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="email@empresa.com"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="role">Perfil</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value: "admin" | "operador") =>
                    setNewUser({ ...newUser, role: value })
                  }
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="operador">Operador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateUser}>Criar Usuário</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* Role Permissions Info */}
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
          <Shield className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">Administrador</p>
            <p className="text-sm text-muted-foreground">
              Acesso total: cadastros, configurações, templates e APIs
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
          <User className="h-5 w-5 text-info" />
          <div>
            <p className="font-medium">Operador</p>
            <p className="text-sm text-muted-foreground">
              Acesso limitado: visualização e envio de mensagens
            </p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-xl border bg-card shadow-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[250px]">Usuário</TableHead>
              <TableHead>Perfil</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Último Acesso</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.map((usuario) => {
              const role = roleConfig[usuario.role];
              const RoleIcon = role.icon;

              return (
                <TableRow key={usuario.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-sm font-medium text-primary">
                          {usuario.nome.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {usuario.nome}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {usuario.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${role.color}`}>
                      <RoleIcon className="h-3 w-3" />
                      {role.label}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      variant={usuario.status === "ativo" ? "success" : "default"}
                    >
                      {usuario.status === "ativo" ? "Ativo" : "Inativo"}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {usuario.ultimoAcesso || "-"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {usuario.criadoEm}
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
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Key className="mr-2 h-4 w-4" />
                          Redefinir Senha
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleUserStatus(usuario.id)}>
                          {usuario.status === "ativo" ? (
                            <>
                              <UserX className="mr-2 h-4 w-4" />
                              Desativar
                            </>
                          ) : (
                            <>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Ativar
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
