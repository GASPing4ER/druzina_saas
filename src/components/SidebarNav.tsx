import Link from "next/link";

const SidebarNav = ({
  title,
  navigation,
  department,
  role,
}: SidebarNavProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="sidebar-h3">{title}</h3>
      <div className="ml-4 flex flex-col gap-1">
        {navigation.map((item) => {
          const canAccess =
            title !== "Procesi" ||
            role === "superadmin" ||
            role === "admin" ||
            item.title.toLowerCase() === department;

          const completeUrl =
            title === "Procesi" ? `/phase/${item.url}` : item.url;
          return (
            <ul key={item.title}>
              <li>
                <Link
                  href={canAccess ? completeUrl : "/unauthorized"}
                  className={`flex gap-2 ${
                    canAccess ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {/* <Image src={item.imgUrl} alt={item.title} /> */}
                  <p> {item.title}</p>
                </Link>
              </li>
              {item.children && (
                <ul className="ml-6 flex flex-col gap-1">
                  {item.children.map((child) => (
                    <li key={child} className="text-sm">
                      {child}
                    </li>
                  ))}
                </ul>
              )}
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarNav;
