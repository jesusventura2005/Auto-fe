import { View, Text } from "react-native"
import Shield from '../assets/shield.svg'

export const Card = () => {
  return (
    <View className=" mt-16 p-8 flex flex-col border border-[#ffff] justify-center items-center bg-[#0000001b]">

      <View className="rounded-full bg-[#15367c] flex justify-center items-center p-4">
      <Shield width={30} height={30} stroke={"#005ee1"}></Shield>

      </View>

      <Text className="font-bold text-white text-xl">
          Seguimiento Completo
      </Text>
      <Text className="text-center text-white font-light">
      Registra todos los mantenimientos, reparaciones y revisiones de tus vehículos en un solo lugar.
      </Text>
      

    </View>
  )
}
