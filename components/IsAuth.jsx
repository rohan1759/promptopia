"use client"

import { useEffect } from "react"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"


const IsAuth = (Component) => {
    
    return function IsAuth (props) {   
        const {data: session} = useSession()
        useEffect(() => {
            if(!session){
                return redirect('/')
            }
        })
            
        if(!session){
                return null
        }

        return <Component {...props} />
    }
}

export default IsAuth