import { faker } from "@faker-js/faker";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

export async function Seeder() {
    console.log("User seeding started");

    await prisma.user.create({
        data: {
            name: "Alice",
            email: 'alice@gmail.com',
            phone: '0910025089',
            password: await bcrypt.hash("password", 10)
        }
    })

    for(let i = 0; i < 5; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const fullName = firstName + lastName;

        await prisma.user.create({
            data: {
                name: `${fullName}`,
                email: `${firstName.toLowerCase()}@gmail.com`,
                password: await bcrypt.hash("password", 10),
                phone: faker.phone.number()
            }
        })
    }

    console.log("User seeding finished");
    
    const tagsList = ['personal', 'work', 'study', 'travel', 'shopping', 'finance', 'ideas'];

    tagsList.forEach(async (tag) => {
        await prisma.tag.create({
            data: {name: tag}
        })
    });

    for(let i = 0; i < 20; i++) {
        await prisma.note.create({
            data: {
                titles: faker.lorem.sentence({min: 3, max: 5}),
                contents: faker.lorem.paragraph(),
                userId: faker.number.int({min: 1, max: 6}),
                tagId: faker.number.int({min: 1, max: 7})
            }
        })
    }
}

Seeder();