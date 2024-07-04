'use client'
import React, { useState } from 'react';
import { supabase } from '../lib/configure';
import { useRouter } from 'next/navigation';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        fullName: fullName
                    }
                }
            });
            if (data.user != null) {
                router.push('/login');
            }
            if (error) throw error;

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="fullName">Full Name</label>
                <input
                    type="text" value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default SignUp;
