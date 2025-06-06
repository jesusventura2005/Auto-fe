import { router } from "expo-router";
import { View , Text , Image } from "react-native"
import Button from '~/components/ButtonCmp';



const Header = () => {
  return (

    <View className="flex-1 flex-row items-center justify-between ">

      <View className="flex-1 flex-row items-center gap-2">
      <Image className='w-12 h-12' source={require('../assets/carIcon.png')}></Image>;
      <Text className="color-white font-bold text-3xl">Auto</Text>
      </View>

      <View className="flex flex-row gap-4">
      <Button
      onPress={() => router.push("/(auth)/login") }
        title="Iniciar Sesion"
        className="bg-white py-3 px-2 rounded-md "
        classNameText="bg-transparent font-normal color-[#005ee2]"
        ></Button>
        <Button
              onPress={() => router.push("/(auth)/register") }
        title="Registrearse"
        className="bg-[#005ee2] py-3 px-2 rounded-md"
        classNameText=" bg-transparent font-normal "
        ></Button>
      </View>

    </View>
    
  )
}

export default Header
