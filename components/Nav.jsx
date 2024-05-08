"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import { getServerSession } from "next-auth";


const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
      (async () => {
        const res = await getProviders();
        setProviders(res);
      })();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"}
        className="flex flex-center gap-2"
      >
        <Image 
          src="assets/images/logo.svg"
          width={30}
          height={30}
          alt="Promptopia Logo"
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex-center gap-3">
            <Link 
              href={"/create-prompt"} 
              className="black_btn" 
            >
              Create Post
            </Link>
            
            <button 
              onClick={signOut}
              type="button" 
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href={"/profile"}>
              <Image 
                src={session?.user?.image || "/assets/images/profile.png"}
                alt="profile"
                width={35}
                height={35}
                className="object-fit rounded-full" 
              />
            </Link>
          </div>)
          :
          <>
            {
            providers && Object.values(providers).map((provider) => (
              <button
                type="button"
                onClick={() => signIn(provider.id)}
                key={provider.id}
                className="black_btn"
              >
                Sign In
              </button>
            ))}
          </>
          }
      </div>
      

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={ session?.user?.image || "assets/images/logo.svg"}
              alt="profile"
              width={33}
              height={33}
              className="object-fit rounded-full"
              onClick={() => {setToggleDropdown((prev) => !prev)} }
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => {setToggleDropdown((prev) => !prev)}}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => {setToggleDropdown((prev) => !prev)}}
                >
                  Create-Prompt
                </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown((prev) => !prev)
                      signOut()
                    }}
                    className="mt-3 black_btn w-full"
                  >
                    Sign Out
                  </button>
              </div>)}
          </div>
        ) : (
          <div>
            {providers && Object.values(providers).map((provider) => (
              <button
                type="button"
                onClick={() => signIn(provider.id)}
                key={provider.id}
                className="black_btn"
              >
                Sign In
              </button>
            ))}
          </div>
        ) 
      }
      </div>
    </nav>
  )
}

export default Nav