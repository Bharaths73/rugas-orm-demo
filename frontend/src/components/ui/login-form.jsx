import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NavLink, useNavigate } from "react-router-dom"
import React from "react"
import { useForm } from "react-hook-form"
import { login, signup } from "@/Services/operations/Auth"
import { useDispatch, useSelector } from "react-redux"

export function LoginForm({
  className, mode,
  ...props
}) {
  const {register,reset,handleSubmit,setValue,getValues,formState:{errors,isSubmitSuccessful,isSubmitting}}=useForm()
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const submitHandler=async(data)=>{
     if(mode==="signup"){
        await signup(dispatch,data,navigate)     
     }else{
        await login(dispatch,data,navigate)
     }
     reset()
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{mode}</CardTitle>
          <CardDescription>
            Enter your email below to {mode} to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col gap-6">
              {
                 mode==="signup" && <div className="grid gap-2">
                 <Label htmlFor="name">Email</Label>
                 <Input
                   id="name"
                   type="text"
                   placeholder="Enter your full name"
                   required {...register("name",{required:true})}
                 />
               </div>
              }
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  required {...register("email",{required:true})}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input id="password" type="password" placeholder="Enter password" required {...register("password",{required:true,minLength:6})}/>
              </div>
              <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
              {mode === "login" ? "Login" : "Sign Up"}
              </Button>
            </div>
            <div className="mt-4 text-sm">
              {mode === "login" ? (
                <div className='flex justify-center'>
                  <p>Don&apos;t have an account?</p>
                  <NavLink to="/signup">SignUp</NavLink>
                </div>
              ) : (
                <div className='flex justify-center'>
                  <p>Already have an account?</p>
                  <NavLink to="/login">Login</NavLink>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
