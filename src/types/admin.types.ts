export const UserRoleType = {
    ADMIN: 'admin'
}

export type UserRole = typeof UserRoleType[keyof typeof UserRoleType];

export interface User {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

}