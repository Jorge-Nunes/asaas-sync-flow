import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Plus,
  Send,
  Clock,
  AlertCircle,
  CheckCircle,
  Calendar,
  Copy,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

interface Template {
  id: string;
  nome: string;
  tipo: "vence_hoje" | "aviso_previo" | "vencido" | "agradecimento" | "personalizado";
  conteudo: string;
  ativo: boolean;
}

const templateTypes = {
  vence_hoje: { label: "Vence Hoje", icon: Clock, color: "bg-warning/15 text-warning" },
  aviso_previo: { label: "Aviso Prévio", icon: Calendar, color: "bg-info/15 text-info" },
  vencido: { label: "Vencido", icon: AlertCircle, color: "bg-destructive/15 text-destructive" },
  agradecimento: { label: "Agradecimento", icon: CheckCircle, color: "bg-success/15 text-success" },
  personalizado: { label: "Personalizado", icon: Edit, color: "bg-primary/15 text-primary" },
};

const availableVariables = [
  { name: "{{nome}}", description: "Nome do cliente" },
  { name: "{{valor}}", description: "Valor da cobrança" },
  { name: "{{vencimento}}", description: "Data de vencimento" },
  { name: "{{link}}", description: "Link de pagamento" },
  { name: "{{numero_cobranca}}", description: "Número da cobrança" },
  { name: "{{dias_atraso}}", description: "Dias em atraso" },
  { name: "{{empresa}}", description: "Nome da empresa" },
];

const mockTemplates: Template[] = [
  {
    id: "1",
    nome: "Cobrança - Vencimento Hoje",
    tipo: "vence_hoje",
    conteudo: `Olá {{nome}}! 👋

Sua fatura no valor de *R$ {{valor}}* vence *hoje* ({{vencimento}}).

📱 Pague agora pelo link:
{{link}}

Evite juros e multas pagando em dia!

{{empresa}}`,
    ativo: true,
  },
  {
    id: "2",
    nome: "Aviso Antecipado",
    tipo: "aviso_previo",
    conteudo: `Olá {{nome}}! 😊

Lembramos que sua fatura no valor de *R$ {{valor}}* vence em *{{vencimento}}*.

💳 Acesse o link para pagar:
{{link}}

Agradecemos a preferência!

{{empresa}}`,
    ativo: true,
  },
  {
    id: "3",
    nome: "Cobrança Vencida",
    tipo: "vencido",
    conteudo: `Olá {{nome}},

Identificamos que sua fatura *#{{numero_cobranca}}* no valor de *R$ {{valor}}* está em atraso há *{{dias_atraso}} dias*.

⚠️ Regularize agora:
{{link}}

Evite restrições no seu nome.

{{empresa}}`,
    ativo: true,
  },
  {
    id: "4",
    nome: "Agradecimento - Pagamento Recebido",
    tipo: "agradecimento",
    conteudo: `Olá {{nome}}! 🎉

Recebemos seu pagamento de *R$ {{valor}}* referente à fatura *#{{numero_cobranca}}*.

✅ Pagamento confirmado com sucesso!

Obrigado pela confiança.

{{empresa}}`,
    ativo: true,
  },
];

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");

  const handleEdit = (template: Template) => {
    setSelectedTemplate(template);
    setEditContent(template.conteudo);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedTemplate) {
      setTemplates(
        templates.map((t) =>
          t.id === selectedTemplate.id ? { ...t, conteudo: editContent } : t
        )
      );
      toast.success("Template atualizado com sucesso!");
      setIsEditing(false);
      setSelectedTemplate(null);
    }
  };

  const handleCopyVariable = (variable: string) => {
    navigator.clipboard.writeText(variable);
    toast.success(`Variável ${variable} copiada!`);
  };

  const handleTestMessage = (template: Template) => {
    toast.info("Enviando mensagem de teste...");
    setTimeout(() => {
      toast.success("Mensagem de teste enviada!");
    }, 1500);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Templates de Mensagens"
        description="Personalize as mensagens enviadas automaticamente"
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Template
        </Button>
      </PageHeader>

      {/* Variables Reference */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Variáveis Disponíveis</CardTitle>
          <CardDescription className="text-xs">
            Clique para copiar e usar nos templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {availableVariables.map((variable) => (
              <button
                key={variable.name}
                onClick={() => handleCopyVariable(variable.name)}
                className="group flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1.5 text-sm transition-colors hover:bg-muted"
              >
                <code className="font-mono text-xs text-primary">
                  {variable.name}
                </code>
                <span className="text-xs text-muted-foreground">
                  {variable.description}
                </span>
                <Copy className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => {
          const typeConfig = templateTypes[template.tipo];
          const TypeIcon = typeConfig.icon;

          return (
            <Card key={template.id} className="group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg p-2 ${typeConfig.color}`}>
                      <TypeIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{template.nome}</CardTitle>
                      <Badge
                        variant="outline"
                        className={`mt-1 text-[10px] ${typeConfig.color} border-0`}
                      >
                        {typeConfig.label}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon-sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{template.nome}</DialogTitle>
                          <DialogDescription>
                            Pré-visualização do template
                          </DialogDescription>
                        </DialogHeader>
                        <div className="rounded-lg bg-muted p-4">
                          <pre className="whitespace-pre-wrap font-sans text-sm">
                            {template.conteudo}
                          </pre>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleEdit(template)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="line-clamp-4 whitespace-pre-wrap text-sm text-muted-foreground">
                    {template.conteudo}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`text-xs ${
                      template.ativo ? "text-success" : "text-muted-foreground"
                    }`}
                  >
                    {template.ativo ? "● Ativo" : "○ Inativo"}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTestMessage(template)}
                  >
                    <Send className="mr-2 h-3 w-3" />
                    Testar
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Template</DialogTitle>
            <DialogDescription>
              Personalize a mensagem usando as variáveis disponíveis
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome do Template</Label>
              <Input
                id="nome"
                value={selectedTemplate?.nome || ""}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="conteudo">Conteúdo da Mensagem</Label>
              <Textarea
                id="conteudo"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="mt-1.5 min-h-[200px] font-mono text-sm"
              />
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Variáveis:
              </p>
              <div className="flex flex-wrap gap-1">
                {availableVariables.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => {
                      setEditContent(editContent + v.name);
                    }}
                    className="rounded bg-background px-2 py-0.5 font-mono text-xs hover:bg-accent"
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
