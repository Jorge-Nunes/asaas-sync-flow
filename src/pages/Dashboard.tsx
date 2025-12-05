import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import {
  Users,
  Receipt,
  CheckCircle,
  AlertCircle,
  Send,
  TrendingUp,
  Clock,
  DollarSign,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const areaChartData = [
  { name: "Jan", enviadas: 400, pagas: 350 },
  { name: "Fev", enviadas: 520, pagas: 470 },
  { name: "Mar", enviadas: 480, pagas: 420 },
  { name: "Abr", enviadas: 620, pagas: 550 },
  { name: "Mai", enviadas: 580, pagas: 510 },
  { name: "Jun", enviadas: 720, pagas: 680 },
];

const barChartData = [
  { name: "Seg", mensagens: 45 },
  { name: "Ter", mensagens: 52 },
  { name: "Qua", mensagens: 38 },
  { name: "Qui", mensagens: 61 },
  { name: "Sex", mensagens: 55 },
  { name: "Sáb", mensagens: 22 },
  { name: "Dom", mensagens: 12 },
];

const pieChartData = [
  { name: "Pagas", value: 68, color: "hsl(160, 84%, 39%)" },
  { name: "Vencidas", value: 18, color: "hsl(0, 84%, 60%)" },
  { name: "Em aberto", value: 14, color: "hsl(38, 92%, 50%)" },
];

const recentCharges = [
  { id: 1, cliente: "João Silva", valor: 250.00, status: "pago", data: "05/12/2025" },
  { id: 2, cliente: "Maria Santos", valor: 180.50, status: "vencido", data: "04/12/2025" },
  { id: 3, cliente: "Pedro Costa", valor: 420.00, status: "aberto", data: "06/12/2025" },
  { id: 4, cliente: "Ana Oliveira", valor: 95.00, status: "pago", data: "05/12/2025" },
  { id: 5, cliente: "Carlos Lima", valor: 320.00, status: "enviado", data: "05/12/2025" },
];

const statusColors: Record<string, string> = {
  pago: "bg-success/15 text-success",
  vencido: "bg-destructive/15 text-destructive",
  aberto: "bg-warning/15 text-warning",
  enviado: "bg-info/15 text-info",
};

const statusLabels: Record<string, string> = {
  pago: "Pago",
  vencido: "Vencido",
  aberto: "Em aberto",
  enviado: "Enviado",
};

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Dashboard"
        description="Visão geral das cobranças e mensagens enviadas"
      />

      {/* Stats Grid */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Clientes"
          value="1.284"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          variant="info"
        />
        <StatCard
          title="Cobranças do Mês"
          value="847"
          description="R$ 125.430,00"
          icon={Receipt}
          variant="default"
        />
        <StatCard
          title="Pagamentos Recebidos"
          value="R$ 98.250"
          icon={CheckCircle}
          trend={{ value: 8.5, isPositive: true }}
          variant="success"
        />
        <StatCard
          title="Cobranças Vencidas"
          value="42"
          description="R$ 8.420,00"
          icon={AlertCircle}
          variant="destructive"
        />
      </div>

      {/* Secondary Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Mensagens Enviadas"
          value="2.847"
          description="Este mês"
          icon={Send}
          variant="info"
        />
        <StatCard
          title="Taxa de Conversão"
          value="78.4%"
          icon={TrendingUp}
          trend={{ value: 5.2, isPositive: true }}
          variant="success"
        />
        <StatCard
          title="Tempo Médio de Pagamento"
          value="2.3 dias"
          icon={Clock}
          variant="default"
        />
        <StatCard
          title="Receita Prevista"
          value="R$ 45.680"
          description="Próximos 7 dias"
          icon={DollarSign}
          variant="warning"
        />
      </div>

      {/* Charts Row */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        {/* Area Chart */}
        <div className="rounded-xl border bg-card p-5 shadow-card lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-card-foreground">
            Cobranças vs Pagamentos
          </h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaChartData}>
                <defs>
                  <linearGradient id="colorEnviadas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(215, 50%, 23%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(215, 50%, 23%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPagas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 88%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 45%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 45%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(220, 15%, 88%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="enviadas"
                  stroke="hsl(215, 50%, 23%)"
                  fillOpacity={1}
                  fill="url(#colorEnviadas)"
                  name="Enviadas"
                />
                <Area
                  type="monotone"
                  dataKey="pagas"
                  stroke="hsl(160, 84%, 39%)"
                  fillOpacity={1}
                  fill="url(#colorPagas)"
                  name="Pagas"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="mb-4 text-sm font-semibold text-card-foreground">
            Status das Cobranças
          </h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(220, 15%, 88%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`${value}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {pieChartData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-muted-foreground">
                  {item.name}: {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bar Chart */}
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="mb-4 text-sm font-semibold text-card-foreground">
            Mensagens por Dia da Semana
          </h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 88%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 45%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 45%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(220, 15%, 88%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="mensagens"
                  fill="hsl(199, 89%, 48%)"
                  radius={[4, 4, 0, 0]}
                  name="Mensagens"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Charges */}
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="mb-4 text-sm font-semibold text-card-foreground">
            Cobranças Recentes
          </h3>
          <div className="space-y-3">
            {recentCharges.map((charge) => (
              <div
                key={charge.id}
                className="flex items-center justify-between rounded-lg bg-muted/30 p-3"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">
                    {charge.cliente}
                  </p>
                  <p className="text-xs text-muted-foreground">{charge.data}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-card-foreground">
                    R$ {charge.valor.toFixed(2)}
                  </p>
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      statusColors[charge.status]
                    }`}
                  >
                    {statusLabels[charge.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
