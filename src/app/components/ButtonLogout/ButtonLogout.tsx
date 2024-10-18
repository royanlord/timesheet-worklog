'use client'

import { signOut } from 'next-auth/react';
import React from 'react'

const ButtonLogout = () => {
    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: '/' });
    }

    return (
        <button 
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={handleLogout}
        >
            Logout
        </button>
    )
}

export default ButtonLogout