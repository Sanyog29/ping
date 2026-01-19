import prisma from "@/app/libs/prismadb";
import getSession from "@/app/actions/getSession";

const getUsers = async () => {
    const session = await getSession();
    if (!session?.user?.email) {
        return [];
    }
    try {
        const users = await prisma.user.findMany({
            where: {
                email: {
                    not: session.user.email
                }
            }
        });
        return users;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default getUsers;