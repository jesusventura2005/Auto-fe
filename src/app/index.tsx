import { View, Text } from "react-native";
import { Link } from "expo-router";

const Index = () => {
    return(
            <View className="flex-1 items-center justify-center">
                <Text>tsadsad</Text>
                <Link href='/screens/MaintenanceLog'>hola</Link>
            </View>
    )
};

export default Index;