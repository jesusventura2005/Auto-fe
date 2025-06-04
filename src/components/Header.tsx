import { View , Text , Image } from "react-native"
import Button from '~/components/ButtonCmp';



const Header = () => {
  return (

    <View className="flex-1 flex-row items-center justify-between ">

      <View className="flex-1 flex-row items-center gap-2">
      <Image className='w-12 h-12' source={require('../assets/carIcon.png')}></Image>;
      <Text className="color-white font-bold text-3xl">Auto</Text>
      </View>

      <View>
        <Button
        title="Iniciar Sesion"
        className="bg-[#005ee2] p-2"
        ></Button>
      </View>

    </View>
    
  )
}

export default Header
