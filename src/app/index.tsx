import { View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

/// aqui ven como se enrutan las screens recuerden hacer componentes para  reutilizarlos no hagan
///todo en una solo tsx , y traten de usar tailwind
/// no instalen librerias sin informar a los demas o expliquen en el pull request pq estan instalando
/// esa libreria y no mergen sin antes ver si no hay conflictos
const Index = () => {
  const { authState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authState?.authenticated) {
      router.replace('/home/maintenance/maintenanceLog');
    }
  }, [authState?.authenticated, router]);

  if (authState?.authenticated) {
    return null;
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Link href="/home/maintenance/maintenanceLog">Historial de Mantenimiento</Link>
      <Link href="/auth/register">Registrarse</Link>
    </View>
  );
};

export default Index;
