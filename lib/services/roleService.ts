let cachedPermissions: Record<string, string[]> | null = null;
let cacheExpiry: number | null = null;

const CACHE_TTL = parseInt(process.env.ROLE_CACHE_TTL ?? "300000"); // 5 min default

async function fetchRolePermissionsFromAPI(): Promise<Record<string, string[]>> {
  const res = await fetch(`${process.env.BASE_URL}/api/rolePermission`);
  if (!res.ok) throw new Error("Failed to fetch role permissions");
  return res.json();
}

export async function getRolePermissions(): Promise<Record<string, string[]>> {
  const now = Date.now();

  if (!cachedPermissions || !cacheExpiry || now > cacheExpiry) {
    try {
      cachedPermissions = await fetchRolePermissionsFromAPI();
      cacheExpiry = now + CACHE_TTL;
      console.log("Role permissions cache updated");
    } catch (error) {
      console.error("Error fetching role permissions:", error);
      //Fail-safe 
      cachedPermissions = cachedPermissions || {};
    }
  } else {
    console.log("Using cached role permissions");
  }

  return cachedPermissions;
}
