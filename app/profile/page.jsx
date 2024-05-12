"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import Profile from '@components/Profile'
import IsAuth from "@components/IsAuth";

const MyProfile = () => {

    const searchParams = useSearchParams()
    const {data: session} = useSession()
    const [posts, setPosts] = useState("")
    const router = useRouter();

    const userId = searchParams.get('id')
    
    const handleEdit = (post) => {
        router.push(`/update-prompt/?id=${post._id}`)
    }
    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt ?")

        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${post._id}`, {
                    method: 'DELETE'
                })
                const filteredPosts = posts.filter((p) => (p._id !== post._id))
                setPosts(filteredPosts)
            } catch (error) {
                console.log(error)
            }
        }
    }
    
    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`api/users/${userId || session?.user.id}/posts`)
          const data = await response.json()
          setPosts(data)
        }
        if(session?.user.id)
            fetchPosts();
      }, [userId, session?.user.id])

      if (!posts) {
        return <div>Loading...</div>; // Show loading state while data is being fetched
    }   

    return (

            <Profile
                name={userId ? `` : "My"}
                desc={userId ? `Welcome to user profile`: `Welcome to your personalized profile page`}
                data={posts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                />
    )
}

const ProfilePage = () => (
    <Suspense fallback={<div>Loading...</div>}> {/* Wrap MyProfile component with Suspense */}
        <MyProfile />
    </Suspense>
);

export default IsAuth(ProfilePage)