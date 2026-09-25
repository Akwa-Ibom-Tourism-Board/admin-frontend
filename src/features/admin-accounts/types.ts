/** An admin account, as returned by `GET /admin/admins`. Same underlying
 * User shape as a regular platform user, just role-fixed to admin. */
export interface AdminAccount {
  id: string;
  fullName: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
