import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/server";
export const POST = async(req : Request) => {
    try {
        const {account, email, signedToken } = await req.json();

        const user = await prisma.user.upsert({
            where : {account},
            update: {
                signedToken,
            },
            create : {
                account,
                email,
                signedToken,
            },
            select : {
                account : true,
                email : true,
                nickname : true,
                signedToken : true,
            },
        })
        
       
        return NextResponse.json({
            ok : true,
            user,
        });   
    } catch (error) {
        console.error(error);
    }
};

