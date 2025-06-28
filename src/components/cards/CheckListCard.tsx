import { View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons , FontAwesome5 } from '@expo/vector-icons';
import ButtonCmp from '../ui/ButtonCmp';

type Props = {
  type: string;
  iconName: string;
  iconType: string;
  lastDone?: string | null;
  interval: number;
  date: string;
  onPress?: () => void;
};

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return 'Nunca realizado';

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return 'Fecha inválida';
  }
};

const getMaintenanceStatus = (lastDone: string | null | undefined, intervalMonths: number) => {
  if (!lastDone) {
    return { status: 'Nunca hecho', color: '#dc2626' };
  }

  try {
    const lastDoneDate = new Date(lastDone);
    const currentDate = new Date();

    // Calcular la fecha cuando debería haberse hecho el próximo mantenimiento
    const nextMaintenanceDate = new Date(lastDoneDate);
    nextMaintenanceDate.setMonth(nextMaintenanceDate.getMonth() + intervalMonths);

    // Calcular el intervalo total en días
    const totalIntervalDays = Math.floor(
      (nextMaintenanceDate.getTime() - lastDoneDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Verificar si ya pasó la fecha del próximo mantenimiento
    const isOverdue = currentDate > nextMaintenanceDate;

    if (isOverdue) {
      // Si está vencido, calcular cuántos días de retraso
      const daysOverdue = Math.floor(
        (currentDate.getTime() - nextMaintenanceDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      const overduePercentage = (daysOverdue / totalIntervalDays) * 100;

      if (overduePercentage >= 33) {
        return { status: 'Muy vencido', color: '#dc2626' };
      } else {
        return { status: 'Vencido', color: '#facc15' };
      }
    }

    // Si no está vencido, calcular qué tan cerca está
    const daysUntilNext = Math.floor(
      (nextMaintenanceDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const remainingPercentage = (daysUntilNext / totalIntervalDays) * 100;

    if (remainingPercentage <= 33) {
      return { status: 'Próximo', color: '#facc15' };
    } else {
      return { status: 'Al día', color: '#22c55e' };
    }
  } catch {
    return { status: 'Error', color: '#6b7280' };
  }
};

const getIconComponent = (iconType: Props['iconType'], iconName: string, color: string) => {
  switch (iconType) {
    case 'material-community':
      return <MaterialCommunityIcons name={iconName as any} size={24} color={color} />;
    case 'font-awesome-5':
      return <FontAwesome5 name={iconName as any} size={20} color={color} />;
    case 'ionicons':
      return <Ionicons name={iconName as any} size={24} color={color} />;
    default:
      return null;
  }
};

export default function CheckListCard({
  type,
  iconName,
  iconType,
  lastDone,
  interval,
  date,
  onPress,
}: Props) {
  const { status, color } = getMaintenanceStatus(lastDone, interval);

  return (
    <ButtonCmp onPress={onPress} animated>
      <View
        className="border-color-border mb-4 w-full flex-row items-center rounded-xl border bg-white p-4 dark:border-color-border-dark dark:bg-color-bg-dark"
        style={{ borderLeftWidth: 5, borderLeftColor: color }}>
        <View className="mr-4">{getIconComponent(iconType, iconName, color)}</View>

        <View className="flex-1">
          <Text className="text-lg font-semibold text-color-title dark:text-color-title-dark">
            {type}
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            Última vez: {formatDate(lastDone)}
          </Text>
          <Text className="text-xs text-gray-400 dark:text-gray-500">
            Recomendado: cada {interval} meses
          </Text>
        </View>

        <View className="min-w-[80px] items-center rounded-full bg-gray-800 px-3 py-1">
          <Text className="text-center text-xs text-white">{status}</Text>
        </View>
      </View>
    </ButtonCmp>
  );
}
