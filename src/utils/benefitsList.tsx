import {
  Bitcoin,
  Brain,
  Briefcase,
  Building,
  Calendar,
  Clock,
  Coins,
  Dumbbell,
  Eye,
  GraduationCap,
  Heart,
  Home,
  MonitorOff,
  PieChart,
  Shield,
  SmileIcon as Tooth,
  Umbrella,
  UserCircle,
  UserPlus,
  Users,
  Zap,
} from 'lucide-react';

interface Benefit {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const benefits: Benefit[] = [
  { id: '401k', label: '401(k)', icon: <Briefcase className='h-3 w-3' /> },
  {
    id: 'distributed',
    label: 'Distributed team',
    icon: <Users className='h-3 w-3' />,
  },
  { id: 'async', label: 'Async', icon: <Zap className='h-3 w-3' /> },
  {
    id: 'vision',
    label: 'Vision insurance',
    icon: <Eye className='h-3 w-3' />,
  },
  {
    id: 'dental',
    label: 'Dental insurance',
    icon: <Tooth className='h-3 w-3' />,
  },
  {
    id: 'medical',
    label: 'Medical insurance',
    icon: <Heart className='h-3 w-3' />,
  },
  {
    id: 'unlimited_vacation',
    label: 'Unlimited vacation',
    icon: <Umbrella className='h-3 w-3' />,
  },
  { id: 'pto', label: 'Paid time off', icon: <Clock className='h-3 w-3' /> },
  {
    id: 'four_day',
    label: '4 day workweek',
    icon: <Calendar className='h-3 w-3' />,
  },
  {
    id: '401k_matching',
    label: '401k matching',
    icon: <Coins className='h-3 w-3' />,
  },
  {
    id: 'company_retreats',
    label: 'Company retreats',
    icon: <Building className='h-3 w-3' />,
  },
  {
    id: 'coworking_budget',
    label: 'Coworking budget',
    icon: <Building className='h-3 w-3' />,
  },
  {
    id: 'learning_budget',
    label: 'Learning budget',
    icon: <GraduationCap className='h-3 w-3' />,
  },
  {
    id: 'gym',
    label: 'Free gym membership',
    icon: <Dumbbell className='h-3 w-3' />,
  },
  {
    id: 'mental_wellness',
    label: 'Mental wellness budget',
    icon: <Brain className='h-3 w-3' />,
  },
  {
    id: 'home_office',
    label: 'Home office budget',
    icon: <Home className='h-3 w-3' />,
  },
  {
    id: 'crypto',
    label: 'Pay in crypto',
    icon: <Bitcoin className='h-3 w-3' />,
  },
  {
    id: 'pseudonymous',
    label: 'Pseudonymous',
    icon: <UserCircle className='h-3 w-3' />,
  },
  {
    id: 'profit_sharing',
    label: 'Profit sharing',
    icon: <PieChart className='h-3 w-3' />,
  },
  {
    id: 'equity',
    label: 'Equity compensation',
    icon: <Coins className='h-3 w-3' />,
  },
  {
    id: 'no_whiteboard',
    label: 'No whiteboard interview',
    icon: <MonitorOff className='h-3 w-3' />,
  },
  {
    id: 'no_monitoring',
    label: 'No monitoring system',
    icon: <Shield className='h-3 w-3' />,
  },
  {
    id: 'hire_old_young',
    label: 'We hire old (and young)',
    icon: <UserPlus className='h-3 w-3' />,
  },
];
