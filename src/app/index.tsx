import { View, Text } from "react-native";
import { Link } from "expo-router";



/// aqui ven como se enrutan las screens recuerden hacer componentes para  reutilizarlos no hagan 
///todo en una solo tsx , y traten de usar tailwind 
/// no instalen librerias sin informar a los demas o expliquen en el pull request pq estan instalando 
/// esa libreria y no mergen sin antes ver si no hay conflictos 
const Index = () => {
    return(
            <View className="flex-1 items-center justify-center">
                <Text>tsadsad</Text>
                <Link href='/screens/MaintenanceLog'>Historial de Mantenimiento</Link>
                <Link href='/screens/Register'>Registrarse</Link>
            </View>
    )
};

export default Index;