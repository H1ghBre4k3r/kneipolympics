const Permissions = {
  getUsers: ["admin"],
} as const;

export function can<T extends keyof typeof Permissions>(
  permission: T,
  roles: string[] = [],
): boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return roles.some((role) => Permissions[permission].includes(role as any));
}
