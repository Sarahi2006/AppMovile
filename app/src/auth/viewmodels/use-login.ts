import {useState} from "react";
import {AuthService} from "@/app/src/Auth/services/auth.service";
import {useRouter} from "expo-router";

export function useLogin(){
    const router = useRouter();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorsMessage] = useState<string|null>(null)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev)=> !prev)
    }

    const handleLogin=async ()=>{
        if(!email || !password){
            setErrorsMessage("Please, complete all fields")
            return
        }

        setErrorsMessage(null)
        setIsLoading(true)

        try {
            const data = await AuthService.login(email, password)
            console.log("TOKEN", data.token)
            router.replace("/(protected)/dashboard")
        } catch (error:any) {
            setErrorsMessage(error.message)
        }finally {
            setIsLoading(false)
        }
    }

    return {
        email,
        password,
        setEmail,
        setPassword,
        isLoading,
        errorMessage,
        isPasswordVisible,
        togglePasswordVisibility,
        handleLogin,
    }
}