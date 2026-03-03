export const AdminRoleType = {
    ADMIN: 'admin'
}

export type AdminRole = typeof AdminRoleType[keyof typeof AdminRoleType];

export interface Admin {
    id: string;
    email: string;
    fullName: string;
    role: AdminRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}