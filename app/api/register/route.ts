import bcrypt from 'bcrypt';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import Prisma   from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try{
  const body = await req.json();
  const { name, email, password } = body;
 
   if (!name || !email || !password) {
     return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
   }

   const hashedPassword = await bcrypt.hash(password, 12);

   const newUser = await Prisma.user.create({
     data: {
       name,
       email,
       hashedPassword,
     },
   });

   return NextResponse.json(newUser);  
}catch (error : any) {
    console.log(error, ' -Registration Error');
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}