import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@epicstudio.in";
  const adminPassword = process.env.ADMIN_PASSWORD || "Epic@2025Admin!";
  const adminName = process.env.ADMIN_NAME || "Epic Studio Admin";

  const existing = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  });

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  if (existing) {
    await prisma.adminUser.update({
      where: { email: adminEmail },
      data: {
        passwordHash,
        name: adminName,
      },
    });
    console.log(`Updated existing admin user: ${adminEmail}`);
  } else {
    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: adminName,
        role: "superadmin",
      },
    });
    console.log(`Created default admin user: ${adminEmail}`);
  }
}

main()
  .catch((e) => {
    console.error("Error seeding admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
