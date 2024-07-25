import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
  
function Login() {
  return (
    <Card className="w-[350px]">
        <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>this is a basic login page</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid w-full gap-4">
                <div className="flex flex-col items-start space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id='email' type="email" placeholder="m@example.com"/>
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Password"/>
                </div>
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full"> create account</Button>
        </CardFooter>
    </Card>
  )
}

export default Login